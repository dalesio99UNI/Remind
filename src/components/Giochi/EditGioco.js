import styles from "./EditGioco.module.css";
import Card from "../UI/Card";
import RadioButton from "../UI/RadioButton";
import GenericButton from "../UI/GenericButton";
import ElencoDomande from "./ElencoDomande";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";

var domande_gioco_da_modificare = [];
var categoriaGioco;

function EditGioco(props){
    const game_ctx = useContext(GameContext);

    const [nomeGiocoModifica, setNomeGiocoModifica] = useState(props.nomeGioco);
    const [validTitolo, setValidTitolo] = useState(true)
    const [tipoGiocoModifica, setTipoGiocoModifica] = useState(props.tipoGioco);
    const [livelloGiocoModifica, setLivelloGiocoModifica] = useState(props.difficulty);
    // const [numeroRoundModifica, setNumeroRoundModifica] =  useState(props.numeroRound);
    const [numeroCoppie, setNumeroCoppie] = useState(props.numero);
    const [domandeSelected, setDomandeSelected] = useState(game_ctx.domandeDaModificare);
    const [validNumeroDomande, setValidNumeroDomande] = useState(true);

    const [selectedEasy, setSelectedEasy] = useState(false);
    const [selectedNormal, setSelectedNormal] = useState(false);
    const [selectedHard, setSelectedHard] = useState(false);

    var giocoID = props.gameID;
    // var categoriaFiltro = props.categoria;

    useEffect(() => {
        domandeSelected.length === 0 ? setValidNumeroDomande(false) : setValidNumeroDomande(true)
    }, [domandeSelected])

    function highlightDifficulty(livelloGiocoModifica){
        if(livelloGiocoModifica === "FACILE"){
            setSelectedEasy(true);
        }
        if(livelloGiocoModifica === "MEDIA"){
            setSelectedNormal(true);
        }
        if(livelloGiocoModifica === "DIFFICILE"){
            setSelectedHard(true);
        }
    }
    useEffect(() => {
        categoriaGioco = props.categoria;
        console.log(game_ctx.domandeDaModificare)
    }, [])

    useEffect(() => {
        highlightDifficulty(livelloGiocoModifica);
        // domande_gioco_da_modificare = Array.from(props.listaDomande);
    });

    function nomeGiocoChangeHandler(event){
        setNomeGiocoModifica(event.target.value);
    }
    function livelloGiocoChangeHandler(stringa){
        setLivelloGiocoModifica(stringa);
        // console.log(livelloGioco);
    }

    function selezioneDifficoltà(stringaDifficoltà){
        switch (stringaDifficoltà){
            case "FACILE":
                if(!selectedEasy){
                    setSelectedEasy(true);
                    setSelectedNormal(false);
                    setSelectedHard(false);
                }
                break;

            case "MEDIA":
                if(!selectedNormal){
                    setSelectedEasy(false);
                    setSelectedNormal(true);
                    setSelectedHard(false);
                }
                break;

            case "DIFFICILE":
                if(!selectedHard){
                    setSelectedEasy(false);
                    setSelectedNormal(false);
                    setSelectedHard(true);
                }
                break;

            default:
                break;
        }
    }

    function numeroCoppieChangeHandler(event){
        console.log(Number(event.target.value));
        if(event.target.value > 5){
            setNumeroCoppie(5)
            // console.log(Number(event.target.value) > 5);
        }
        else if(event.target.value < 2){
            setNumeroCoppie(2);
        }
        else{
            setNumeroCoppie(Number(event.target.value));
        }
    }

    function modificaOggettoDomande(domandeSelezionate, categoriaGame){
        // domande_gioco_da_modificare = JSON.stringify(domandeSelezionate);
        domandeSelected.length === 0 ? setValidNumeroDomande(false) : setValidNumeroDomande(true);
        setDomandeSelected(domandeSelezionate);
        categoriaGioco = categoriaGame;

        console.log("DOMANDE IN EditGioco.js DA SALVARE");
        console.log(domandeSelezionate);
    }

    async function salvaGiocoAggiornato(){
        let valore_TITOLO = true;
        let valore_DOMANDE = true;

        if(nomeGiocoModifica.length === 0){
            setValidTitolo(false);
            valore_TITOLO = false
        }
        else{
            setValidTitolo(true)
            valore_TITOLO = true
        }
        if(domandeSelected.length === 0 && tipoGiocoModifica !== "GIOCO DELLE COPPIE"){
            setValidNumeroDomande(false)
            valore_DOMANDE = false;
        }
        else{
            setValidNumeroDomande(true);
            valore_DOMANDE = true
        }

        if(valore_TITOLO && valore_DOMANDE){
            await getServerMgr().updateGame(nomeGiocoModifica, livelloGiocoModifica, domandeSelected, numeroCoppie, giocoID)
            .catch((err) => {
                console.error(err)
            });

            alert("Gioco modificato con successo!")
            props.chiudiFormModifica();
            game_ctx.prendiTuttiGiochiDomande();
        }
    }

    return(
        <div className={styles.wrapper_impostazioni_gioco}>
            <h2 className={styles.title_scheda}>Modifica il gioco</h2>

          
                <label className={styles.label_style}>Tipologia Gioco:</label>
                <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={tipoGiocoModifica} readOnly></input>
              

                <div className={styles.wrapper_items}>
                    <label className={styles.label_style}>Difficoltà Gioco:</label>
                        <div className={styles.group_bottoni}>
                            <RadioButton
                            onClick={() => {
                                selezioneDifficoltà("FACILE");
                                livelloGiocoChangeHandler("FACILE");
                            }}
                            isSelected={selectedEasy}
                            buttonText={"FACILE"}>
                            </RadioButton>

                            <RadioButton
                            onClick={() => {
                                selezioneDifficoltà("MEDIA");
                                livelloGiocoChangeHandler("MEDIA");
                            }}
                            isSelected={selectedNormal}
                            buttonText={"MEDIA"}>
                            </RadioButton>

                            <RadioButton
                            onClick={() => {
                                selezioneDifficoltà("DIFFICILE");
                                livelloGiocoChangeHandler("DIFFICILE")
                            }}
                            isSelected={selectedHard}
                            buttonText={"DIFFICILE"}>
                            </RadioButton>
                    </div>
                </div>
            {/* </div> */}

            <label className={`${styles.label_style} ${!validTitolo ? styles.invalid : ""}`}>Nome Gioco:</label>
            <input className={`${styles.textbox_style} ${!validTitolo ? styles.invalid : ""}`} type="text" value={nomeGiocoModifica} onChange={nomeGiocoChangeHandler}></input>
            {!validTitolo && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un nome per il gioco</div>}

            {!validNumeroDomande && tipoGiocoModifica !== "GIOCO DELLE COPPIE" && <div style={{width: "100%", color: "red", textAlign: "center"}}>Devi selezionare almeno una domanda</div>}

            {tipoGiocoModifica === "GIOCO DELLE COPPIE" && 
                    <>
                        <label className={`${styles.label_style} ${!validTitolo ? styles.invalid : ""}`}>Numero di coppie:</label>
                        <input className={`${styles.textbox_style} ${!validTitolo ? styles.invalid : ""}`} value={numeroCoppie} type="number" min={2} max={5} onChange={numeroCoppieChangeHandler}></input>
                    </>
                }

            {tipoGiocoModifica !== "GIOCO DELLE COPPIE" && 
                <ElencoDomande
                    booleanForNotReset={true}
                    domandeNuovoGioco={modificaOggettoDomande}
                    tipoGioco={tipoGiocoModifica}
                    categoria={props.categoria}
                >
                </ElencoDomande>
            }

            <div className={styles.wrapper_generico}>
                <GenericButton
                    onClick={salvaGiocoAggiornato}
                    generic_button={true}
                    buttonText={"Salva modifiche"}
                >
                </GenericButton>

                <GenericButton
                    onClick={props.chiudiFormModifica}
                    generic_button={true}
                    red_styling
                    buttonText={"Chiudi scheda"}
                >
                </GenericButton>
            </div>
        </div>
    );
}

export default EditGioco;