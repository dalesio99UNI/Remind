import styles from "./Giochi.module.css";
import { useContext, useState } from "react";
import GameContext from "../../context/game-context";
import GenericButton from "../UI/GenericButton";
import RisultatiGioco, { RisultatiGiocoPazAccnt } from "./RisultatiGioco";
import ListaGiochi from "./ListaGiochi";
import AddGioco from "./AddGioco";
import EditGioco from "./EditGioco";
import AddDomanda from "./AddDomanda";
import ExerciseGuessTheFace from "./ExerciseGuessTheFace";
import EditDomanda from "./EditDomanda";
import GuessTheWord from "./GuessTheWord";
import ExerciseReflexes from "./ExerciseReflexes";
import AuthContext from "../../context/auth-context";
import AssignGameToPatient from "./AssignGameToPatient";
import ExercisePairGame from "./ExercisePairGame";
import SearchBox from "../UI/SearchBox";

let modifica_gioco;
let modifica_domanda;
let assegnazione_gioco;
let risultati_utente_gioco;

var giocoSvoltoID;
let TIPOGIOCO;
let CODICEGIOCO;
let LIVELLOGIOCO;
let DOMANDEGIOCO = [];
let NUMEROCOPPIE;
let INDICEGIOCO = -1;

function Giochi(){
    const auth_ctx = useContext(AuthContext);
    const game_ctx = useContext(GameContext);

console.log("stampo l'utente loggato",auth_ctx);

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showElencoGiochi, setShowElencoGiochi] = useState(true);
    const [showAddNewQuestion, setShowAddNewQuestion] = useState(false);
    const [showAddNewGame, setShowAddNewGame] = useState(false);
    const [showEditGame, setShowEditGame] = useState(false);
    const [showEditQuestion, setShowEditQuestion] = useState(false);
    const [showAssignGameTo, setShowAssignGameTo] = useState(false);
    const [showGameResults, setShowGameResults] = useState(false);
    const [gameObject, setGameObject] = useState(null);

    const [tipoGiocoCercato, setTipoGiocoCercato] = useState("");

    // stringa_TIPOGIOCO, stringa_CODICEGIOCO, stringa_LIVELLOGIOCO
    // STATI PER FAR RIGIOCARE UN GIOCO
    // const [TIPOGIOCO, set_TIPOGIOCO] = useState("");
    // const [CODICEGIOCO, set_CODICEGIOCO] = useState("");
    // const [LIVELLOGIOCO, set_LIVELLOGIOCO] = useState("");
    // const [DOMANDEGIOCO, set_DOMANDEGIOCO] = useState([]);
    // const [INDICEGIOCO, set_INDICEGIOCO] = useState(-1);

    function tipoGiocoChangeHandler(event){
        setTipoGiocoCercato(event.target.value);
    }
    
    function formCreateNewQuestion(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowAddNewQuestion(true);
    }

    function closeFormCreateNewQuestion(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowAddNewQuestion(false);
    }

    function formCreateNewGame(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowAddNewGame(true);
    }

    function closeFormCreateNewGame(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowAddNewGame(false);
    }

    function formEditGame(listaa){
        // let numeroRound = JSON.parse(listaa.domande);
      

        if(listaa.tipoGioco === "GIOCO DELLE COPPIE"){
            modifica_gioco =
            <EditGioco
                nomeGioco={listaa.nomeGioco}
                tipoGioco={listaa.tipoGioco}
                difficulty={listaa.livelloGioco}
                categoria={listaa.categoriaGioco}
                numero={listaa.numero}
                gameID={listaa.gameID}
                chiudiFormModifica={closeFormEditGame}
            >
            </EditGioco>
        }
        else{
            modifica_gioco =
            <EditGioco
                nomeGioco={listaa.nomeGioco}
                tipoGioco={listaa.tipoGioco}
                categoria={listaa.categoriaGioco}
                difficulty={listaa.livelloGioco}
                gameID={listaa.gameID}
                chiudiFormModifica={closeFormEditGame}
                // listaDomande={listaa.domandeGioco}
            >
            </EditGioco>
        }
        
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowEditGame(true);
    }

    function closeFormEditGame(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowEditGame(false);
    }

    function avviaGiocoNascondiItems(){
        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
    }

    function startGame(stringa_TIPOGIOCO, stringa_CODICEGIOCO, stringa_LIVELLOGIOCO){
        // set_TIPOGIOCO(stringa_TIPOGIOCO);
        TIPOGIOCO = stringa_TIPOGIOCO
        // set_CODICEGIOCO(stringa_CODICEGIOCO);
        CODICEGIOCO = stringa_CODICEGIOCO
        // set_LIVELLOGIOCO(stringa_LIVELLOGIOCO);
        LIVELLOGIOCO = stringa_LIVELLOGIOCO

        let coppie;

        var indice_gioco;
        for(var i = 0; i < game_ctx.listaGiochi.length; i++){
            if(stringa_CODICEGIOCO === game_ctx.listaGiochi[i].gameID){
                indice_gioco = i;
                giocoSvoltoID = game_ctx.listaGiochi[i].gameID;
                coppie = game_ctx.listaGiochi[i].numero
                break;
            }
        }
        // set_INDICEGIOCO(indice_gioco);
        INDICEGIOCO = indice_gioco
        NUMEROCOPPIE = coppie
        console.log("CODICE DEL GIOCO SELEZIONATO----> " + stringa_CODICEGIOCO);
console.log("L'indice di gioco è :",INDICEGIOCO);
        var domandeDelGioco = [];
        var oggettoDomandeIDGioco = game_ctx.listaGiochi[indice_gioco].domandeID;
        console.log(oggettoDomandeIDGioco);
        for(var i=0; i < game_ctx.domande.length; i++){
            oggettoDomandeIDGioco.forEach((item) => {
                if(item === game_ctx.domande[i].ID){
                    // console.log(game_ctx.domande[i]);
                    domandeDelGioco.push(game_ctx.domande[i]);
                }
            })
        }
        console.log(game_ctx.listaGiochi[indice_gioco]);
        // set_DOMANDEGIOCO(domandeDelGioco);
        DOMANDEGIOCO = domandeDelGioco
        
        switch(stringa_TIPOGIOCO){
            case 'QUIZ':
            case 'QUIZ CON SUONI':
            case 'QUIZ CON IMMAGINI':
            case 'QUIZ CON VIDEO':    
                setGameObject(
                    <ExerciseGuessTheFace
                        giocoTerminato={endGame}
                        giocoAnnullato={closeGameResults}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        LIVELLOGIOCO={stringa_LIVELLOGIOCO}
                        domandeGioco={domandeDelGioco}
                    >
                    </ExerciseGuessTheFace>
                );
                break;

            case 'COMPLETA LA PAROLA':
                setGameObject(
                    <GuessTheWord
                        giocoTerminato={endGame}
                        giocoAnnullato={closeGameResults}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        LIVELLOGIOCO={stringa_LIVELLOGIOCO}
                        domandeGioco={domandeDelGioco}
                    >
                    </GuessTheWord>
                );
                break;

            case 'GIOCO DELLE COPPIE':
                setGameObject(
                    <ExercisePairGame
                        giocoTerminato={endGame}
                        giocoAnnullato={closeGameResults}
                        INDICEGIOCO={indice_gioco}
                        TIPOGIOCO={stringa_TIPOGIOCO}
                        LIVELLOGIOCO={stringa_LIVELLOGIOCO}
                        numeroCoppie={coppie}
                    ></ExercisePairGame>
                );
                break;

            default:
                setGameObject(null);
                break;
        }
        // setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
    }

    function restartGame(){
        console.log(TIPOGIOCO)
        console.log(CODICEGIOCO)
        console.log(LIVELLOGIOCO)
        console.log(INDICEGIOCO)

        switch(TIPOGIOCO){
            case 'QUIZ':
            case 'QUIZ CON SUONI':
            case 'QUIZ CON IMMAGINI':
            case 'QUIZ CON VIDEO':   
                setGameObject(
                    <ExerciseGuessTheFace
                        giocoTerminato={endGame}
                        giocoAnnullato={closeGameResults}
                        INDICEGIOCO={INDICEGIOCO}
                        TIPOGIOCO={TIPOGIOCO}
                        LIVELLOGIOCO={LIVELLOGIOCO}
                        domandeGioco={DOMANDEGIOCO}
                    >
                    </ExerciseGuessTheFace>
                );
                break;

            case 'COMPLETA LA PAROLA':
                setGameObject(
                    <GuessTheWord
                        giocoTerminato={endGame}
                        giocoAnnullato={closeGameResults}
                        INDICEGIOCO={INDICEGIOCO}
                        TIPOGIOCO={TIPOGIOCO}
                        LIVELLOGIOCO={LIVELLOGIOCO}
                        domandeGioco={DOMANDEGIOCO}
                    >
                    </GuessTheWord>
                );
                break;

            case 'GIOCO DELLE COPPIE':
                setGameObject(
                    <ExercisePairGame
                        giocoTerminato={endGame}
                        giocoAnnullato={closeGameResults}
                        INDICEGIOCO={INDICEGIOCO}
                        TIPOGIOCO={TIPOGIOCO}
                        LIVELLOGIOCO={LIVELLOGIOCO}
                        numeroCoppie={NUMEROCOPPIE}
                    ></ExercisePairGame>
                );
                break;

            default:
                setGameObject(null);
                break;
        }
        // closeGameResults();
        setShowGameResults(false);
    }

    function endGame(risposteUtente, domandeTotali){
        setGameObject(null);
        if(auth_ctx.tipoAccount !== "Paziente"){
            risultati_utente_gioco =
                <RisultatiGioco
                    numeroRisposteCorrette={risposteUtente}
                    numeroDomandeTotali={domandeTotali}
                    chiudiSchedaRisultati={closeGameResults}
                    assegnaRisultatiPaziente={(pazID) => {
                        game_ctx.salvaRisultatiGiocoPaziente(pazID, giocoSvoltoID, domandeTotali, risposteUtente, (domandeTotali-risposteUtente))
                        closeGameResults();
                    }}
                >
                </RisultatiGioco>
        }
        else{
            console.log("stampo l'id del paziente loggato",auth_ctx.utenteLoggatoUID);
            game_ctx.salvaRisultatiGiocoPaziente(auth_ctx.utenteLoggatoUID, giocoSvoltoID, domandeTotali, risposteUtente, (domandeTotali-risposteUtente))

            risultati_utente_gioco = 
                <RisultatiGiocoPazAccnt
                    rigioca={restartGame}
                    chiudiSchedaRisultati={closeGameResults}
                ></RisultatiGiocoPazAccnt>
        }
        setShowGameResults(true);
    }

    function closeGameResults(){
        risultati_utente_gioco = null;
        setGameObject(null);
        setShowGameResults(false);
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        INDICEGIOCO = -1;
    }

    function formEditQuestion(tipoGioco, singleQuestion, ID){
        if(tipoGioco === "QUIZ"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }
        if(tipoGioco === "QUIZ CON IMMAGINI"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                immagine={singleQuestion.immagine}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }

        if(tipoGioco === "QUIZ CON VIDEO"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                immagine={singleQuestion.immagine}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }

        if(tipoGioco === "COMPLETA LA PAROLA"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                suggerimento={singleQuestion.suggerimento}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }
        
        setShowAddNewQuestion(false);
        setShowEditQuestion(true);
    }

    function closeFormEditQuestion(){
        setShowEditQuestion(false);
        setShowAddNewQuestion(true);
    }

    function formAssignGameTo(game_ID){
        assegnazione_gioco = 
            <AssignGameToPatient
                chiudiSchedaAssegnazione={closeFormAssignGameTo}
                gameID={game_ID}
            ></AssignGameToPatient>
        ;

        setShowSearchBoxAndButton(false);
        setShowElencoGiochi(false);
        setShowAssignGameTo(true);

    }

    function closeFormAssignGameTo(){
        setShowSearchBoxAndButton(true);
        setShowElencoGiochi(true);
        setShowAssignGameTo(false);
    }

    function cercaGioco(event){
        game_ctx.cercaGioco(event.target.value);
    }

    return(
        <>
            {showSearchBoxAndButton && auth_ctx.tipoAccount !== "Paziente" &&
                <div className={styles.wrap_boxes}>
                    {INDICEGIOCO === -1 &&
                        <select className={styles.select_style} onChange={tipoGiocoChangeHandler}>
                            <option hidden>Tipo Gioco</option>
                            <option>TUTTI</option>
                            <option>QUIZ</option>
                            <option>QUIZ CON IMMAGINI</option>
                            <option>QUIZ CON VIDEO</option>
                            <option>QUIZ CON SUONI</option>
                            <option>COMPLETA LA PAROLA</option>
                           
                        </select>
                    }
        
                    {INDICEGIOCO === -1 &&
                        <GenericButton
                            onClick={() => {
                                formCreateNewGame();
                                //LA SEGUENTE FUNZIONE SERVE PER RESETTARE L'OGGETTO CHE SI OCCUPA DI MODIFICARE LE DOMANDE DI UN GIOCO
                                game_ctx.formCreaNuovoGioco();
                            }}
                            generic_button={true}
                            buttonText={"Crea Gioco"}
                        >
                        </GenericButton>
                    }

                    {INDICEGIOCO !== -1 &&
                        <GenericButton
                            onClick={() => {
                                closeGameResults();
                            }}
                            generic_button={true}
                            red_styling
                            buttonText={"Esci dal gioco"}
                        >
                        </GenericButton>
                    }
                  
                    {INDICEGIOCO === -1 &&
                        <SearchBox
                            onChange={cercaGioco}
                        ></SearchBox>
                    }
                </div>
            }
            {showElencoGiochi && <h1 className={styles.page_title}>Giochi</h1>}

            <div className={styles.wrapper_generico}>
                    {/* <audio controls={true} autoPlay={true}>
                        <source type="audio/mp3" src="https://cognicare.altervista.org/uploads/meow.mp3"></source>
                    </audio> */}

                {showAddNewGame && 
                    <AddGioco
                        chiudiFormNuovoGioco={closeFormCreateNewGame}
                    >
                    </AddGioco>
                }

                {showEditGame && modifica_gioco}

                {showAddNewQuestion &&
                    <AddDomanda
                        chiudiFormNuovaDomanda={closeFormCreateNewQuestion}
                        aggiungiDomanda={game_ctx.aggiungiDomandaAllaLista}
                        mostraModificaDomanda={formEditQuestion}
                    >
                    </AddDomanda>
                }

                {showEditQuestion && modifica_domanda}

                {showAssignGameTo && assegnazione_gioco}

                {showElencoGiochi && 
                    <ListaGiochi
                        iniziaGioco={startGame}
                        tipoGioco={tipoGiocoCercato}
                        mostraFormModificaGioco={formEditGame}
                        mostraSchedaAssegnazione={formAssignGameTo}
                        avvioGiocoChiudoIlResto={avviaGiocoNascondiItems}
                    >
                    </ListaGiochi>
                }

                {showGameResults && risultati_utente_gioco}

                {INDICEGIOCO !== -1 && gameObject}
                
            </div>
        </>
);
}

export default Giochi;