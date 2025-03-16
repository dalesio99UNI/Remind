import React, {useState, useContext, useEffect} from "react";
import PatientContext from "./patients-context";
import Modal from "../components/UI/Modal";

import AuthContext from "./auth-context";
import { getServerMgr } from "../backend_conn/ServerMgr";

// let counter_CODICE_GIOCO = 0;
let modal_eliminazione;

const GameContext = React.createContext({
    listaGiochi: null,
    aggiungiGiocoAllaLista: ()=>{},
    formCreaNuovoGioco: ()=>{},
    domandeDaModificare: null,
    modificaGioco: ()=>{},
    salvaGiocoModificato: ()=>{},
    eliminaGioco: ()=>{},
    domande: null,
    aggiungiDomandaAllaLista: ()=>{},
    recuperaCategorieDomande: ()=>{},
    showModale: null,
    modale: null,
    salvaRisultatiGiocoPaziente: ()=>{},
    eliminaDomanda: ()=>{},
    salvaDomandaModificata: ()=>{},
    prendiTuttiGiochiDomande:()=>{},
    listaPazientiPerGioco: null,
    prendiPazientiPerUnSingoloGioco: ()=>{},
    stringSearched: null,
    cercaGioco:()=>{}
});

export function GameContextProvider(props){
    const patients_ctx = useContext(PatientContext);

    const [stringaCercata, setStringaCercata] = useState("");

    const [elencoGiochi, setElencoGiochi] = useState([])
    const [elencoDomande, setElencoDomande] = useState([]);
    const [domandeModifica, setDomandeModifica] = useState([]);
    const [patientsListForSingleGame, setPatientsListForSingleGame] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const auth_ctx = useContext(AuthContext);

    //RECUPERA TUTTI I GIOCHI E TUTTE LE DOMANDE NEL DB
    async function getAllGamesQuestions(){
        let resultQuestions;
        let resultGames;
        let bridge;

        const parseResult = (resultsArray) => {
            let markersList = {}
            resultsArray.forEach((item) => {
                let currentMarker = (({categoriaGioco, creatorID, gameID, livelloGioco, nomeGioco, tipoGioco, numero}) => ({categoriaGioco, creatorID, gameID, livelloGioco, nomeGioco, tipoGioco,numero, domandeID: []}))(item);
                markersList[item.gameID] ??= currentMarker
                if(item.IDquestion !== null) {
                    markersList[item.gameID].domandeID.push(item.IDquestion)
                }
            })

            let arrayGiochi = []
            Object.keys(markersList).forEach((item) => {
                arrayGiochi.push(markersList[item])
            })

            return arrayGiochi;
        }

        if(auth_ctx.tipoAccount !== "Paziente"){
            // console.log("CIAOOOO")
       

            resultQuestions = await getServerMgr().getQuestionsList(auth_ctx.utenteLoggatoUID)
            .catch((err) => {
                console.error(err)
            });

            if(resultQuestions !== null){
                setElencoDomande(resultQuestions);
                console.log(resultQuestions);
            }
            else{
                setElencoDomande([]);
            }

            resultGames = await getServerMgr().getGamesList(auth_ctx.utenteLoggatoUID)
            .catch((err) => {
                console.error(err)
            });

            if(resultGames){
                let rispostaParsata = parseResult(resultGames);
                setElencoGiochi(rispostaParsata);
                console.log(rispostaParsata);
            }
            else{
                setElencoGiochi([]);
            }
        }
        else{
            let creatoreDomandaID = -1;

            const userId = sessionStorage.getItem('UID');
            console.log(userId); 

            console.log("Devo caricare lista giochi del paziente")
            console.log(userId)
            resultGames = await getServerMgr().listaGiochiPaziente(userId)
            .catch((err) => {
                console.error(err)
            });
console.log("stampa giochi ",resultGames);
if (resultGames && resultGames.length > 0 && resultGames[0] !== null && resultGames[0] !== undefined) {
                console.log(resultGames[0].creatorID)
                creatoreDomandaID = resultGames[0].creatorID;
            }
            else{
                console.log("DIOOOOOOOOOOOOOOOOOOOOOOOO")
            }

            resultQuestions = await getServerMgr().getQuestionsList(creatoreDomandaID)
            .catch((err) => {
                console.error(err)
            });
            console.log(resultQuestions);

            if(resultQuestions !== null){
                setElencoDomande(resultQuestions);
                console.log(resultQuestions);
            }
            else{
                setElencoDomande([]);
            }

            if(resultGames){
                let rispostaParsata = parseResult(resultGames);
                setElencoGiochi(rispostaParsata);
                console.log(rispostaParsata);
            }
            else{
                setElencoGiochi([]);
            }
        }
    }

    useEffect(() => {
        if(auth_ctx.utenteLoggato !== null){
            console.log("CARICO LISTA GIOCHI..");
            getAllGamesQuestions();
        }
    }, [auth_ctx.utenteLoggato])

    //RECUPERA L'ELENCO DEI PAZIENTI CUI E' STATO ASSEGNATO UN DETERMINATO GIOCO
    async function getPatientsListForSingleGame(gameID){
        let result = await getServerMgr().patientsListForSingleGame(gameID)
        console.log(result);
        if(result){
            setPatientsListForSingleGame(result);
        }
        else{
            setPatientsListForSingleGame([]);
        }
    }

    async function salvaRisultati(pazienteID, giocoID, risposteTotali, risposteCorrette, risposteSbagliate){
        console.log("NUMERO DI DOMANDE ---->" + risposteTotali);
        console.log("RISPOSTE CORRETTE ---->" + risposteCorrette);
        console.log("RISPOSTE SBAGLIATE ---->" + risposteSbagliate);

        var today = new Date();
        var day = today.toLocaleString('it-IT', {day: '2-digit'})
        var month = today.toLocaleString('it-IT', {month: '2-digit'})
        var year = today.getFullYear();

        console.log(today);
        console.log(day);
        console.log(month);
        console.log(year);

        let dateString = `${year}-${month}-${day}`;

        console.log(dateString);

        await getServerMgr().saveGameResults(pazienteID, giocoID, risposteTotali, risposteCorrette, risposteSbagliate, dateString);
    }

    function formCreateNewGame(){
        setDomandeModifica([]);
    }

    async function addNewGameToList(name, type, level, category, questionsList){
        let result;

        result = await getServerMgr().addGame(auth_ctx.utenteLoggatoUID, name, type, level, category, questionsList)
        .catch((err) => {
            console.error(err)
        });

        getAllGamesQuestions();
    }

    async function addNewQuestionToList(nuova_domanda){
        
        let result;

        result = await getServerMgr().addQuestion(
            nuova_domanda.doctor_UID, nuova_domanda.tipoGioco, nuova_domanda.categoria, nuova_domanda.domanda,
            nuova_domanda.rispCorrette.correct_answer_n1, nuova_domanda.rispCorrette.correct_answer_n2, nuova_domanda.rispCorrette.correct_answer_n3, nuova_domanda.rispCorrette.correct_answer_n4,
            nuova_domanda.rispSbagliate.wrong_answer_n1, nuova_domanda.rispSbagliate.wrong_answer_n2, nuova_domanda.rispSbagliate.wrong_answer_n3, nuova_domanda.rispSbagliate.wrong_answer_n4,
            nuova_domanda.immagine, nuova_domanda.suggerimento
        )

        alert("Nuova domanda salvata!")
        
        getAllGamesQuestions();
    }

    function uniqueCategories(categoria, indice, arrayCategorie){
        return arrayCategorie.indexOf(categoria) === indice;
    }

    function getAllCategories(tipoGioco){

        var ULTIMA_CATEGORIA_AGGIUNTA;
        var elenco_temporaneo = [];
        var elenco_categorie;

        for(var i=0; i < elencoDomande.length; i++){
            if(tipoGioco === elencoDomande[i].tipoGioco){
                // console.log(elencoDomande[i].categoria);
                ULTIMA_CATEGORIA_AGGIUNTA = elencoDomande[i].categoria;
                elenco_temporaneo.unshift(ULTIMA_CATEGORIA_AGGIUNTA);
            }
        }
        // console.log(elenco_temporaneo);

        elenco_categorie = elenco_temporaneo.filter(uniqueCategories);

        return elenco_categorie;
    }

    function editGame(listaa){
        let domandeParsate = listaa.domandeID;
        console.log(domandeParsate);
        setDomandeModifica(domandeParsate);

        // if(listaa.tipoGioco !== "RIFLESSI"){
        //     setDomandeModifica(domandeParsate);
        // }
        // else{
        //     setDomandeModifica([listaa.numeroRound]);
        // }
    }

    async function addModifiedGameToList(name, level, category, questionsList, gameID){
        console.log("POCO PRIMA DI SALVARE");
        console.log(questionsList);

        let result;

        result = await getServerMgr().updateGame(name, level, category, questionsList, gameID)
        .catch((err) => {
            console.error(err)
        });

        getAllGamesQuestions();
        // console.log("CODICE DEL GIOCO MODIFICATO---> " + gameID);
    }

    function modalDeleteGame(gameID){
        modal_eliminazione =
            <Modal
                testoModale={"Sei sicuro di voler eliminare il gioco?"}
                CONFERMA={() =>{
                    deleteGame(gameID);
                    setShowModal(false);
                }}
                ANNULLA={() => {
                    setShowModal(false);
                }}>
            </Modal>;
            
        setShowModal(true);
    }

    async function deleteGame(gameID){
        let result;

        result = await getServerMgr().deleteGame(gameID)
        .catch((err) => {
            console.error(err)
        });

        alert("Gioco eliminato dalla lista.")
        getAllGamesQuestions();
    }

    function modalDeleteQuestion(tipoGioco, ID){
        modal_eliminazione =
            <Modal
                testoModale={"Sei sicuro di voler eliminare questa domanda?"}
                CONFERMA={() =>{
                    deleteQuestion(tipoGioco, ID);
                    setShowModal(false);
                }}
                ANNULLA={() => {
                    setShowModal(false);
                }}>
            </Modal>;
            
        setShowModal(true);
    }

    async function deleteQuestion(ID){
        let result;

        result = await getServerMgr().deleteQuestion(ID)
        .catch((err) => {
            console.error(err)
        });

        alert("Domanda eliminata.")

        getAllGamesQuestions();
    }

    async function addModifiedQuestionToList(domandaModificata, ID){
        let result;

        result = await getServerMgr().updateQuestion(
            domandaModificata.domanda, domandaModificata.rispCorrette.correct_answer_n1, domandaModificata.rispCorrette.correct_answer_n2, domandaModificata.rispCorrette.correct_answer_n3,
            domandaModificata.rispCorrette.correct_answer_n4, domandaModificata.rispSbagliate.wrong_answer_n1, domandaModificata.rispSbagliate.wrong_answer_n2, domandaModificata.rispSbagliate.wrong_answer_n3,
            domandaModificata.rispSbagliate.wrong_answer_n4, domandaModificata.immagine, domandaModificata.suggerimento, ID
        )
        getAllGamesQuestions();
    }

    function searchGame(stringaDaCercare){
        setStringaCercata(stringaDaCercare);
    }

    return(
        <GameContext.Provider
        value={{
            listaGiochi: elencoGiochi,
            aggiungiGiocoAllaLista: addNewGameToList,
            formCreaNuovoGioco: formCreateNewGame,
            domandeDaModificare: domandeModifica,
            modificaGioco: editGame,
            salvaGiocoModificato: addModifiedGameToList,
            eliminaGioco: modalDeleteGame,
            domande: elencoDomande,
            aggiungiDomandaAllaLista: addNewQuestionToList,
            recuperaCategorieDomande: getAllCategories,
            showModale: showModal,
            modale: modal_eliminazione,
            salvaRisultatiGiocoPaziente: salvaRisultati,
            eliminaDomanda: modalDeleteQuestion,
            salvaDomandaModificata: addModifiedQuestionToList,
            prendiTuttiGiochiDomande: getAllGamesQuestions,
            listaPazientiPerGioco: patientsListForSingleGame,
            prendiPazientiPerUnSingoloGioco: getPatientsListForSingleGame,
            stringSearched: stringaCercata,
            cercaGioco: searchGame
        }}
        >
            {props.children}
        </GameContext.Provider>
    );
}

export default GameContext;