import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./AddDomanda.module.css";
import GameContext from "../../context/game-context";
import Card from "../UI/Card";
import ElencoDomande from "./ElencoDomande";
import ElencoDomandeModificabili from "./ElencoDomandeModificabili";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import axios from "axios";

var counter_CORRETTE = 1;
var counter_SBAGLIATE = 1;
var image;
var file;

function AddDomanda(props){
    const game_ctx = useContext(GameContext)
    const auth_ctx = useContext(AuthContext);

    const [totalAnswers_CORRECT, setTotalAnswers_CORRECT] = useState(counter_CORRETTE);
    const [totalAnswers_WRONG, setTotalAnswers_WRONG] = useState(counter_SBAGLIATE);

    const [gameType, setGameType] = useState("QUIZ");
    const [categoryQuestion, setCategoryQuestion] = useState("");
    const [validCategory, setValidCategory] = useState(true)
    const [domanda, setDomanda] = useState("");
    const [validDomanda, setValidDomanda] = useState(true);
    const [suggerimento, setSuggerimento] = useState("");

    const [aggiungiPaziente, setAggiungiPaziente] = useState(false);
    const [pazienti, setPazienti] = useState([]);
    const [pazienteSelezionato, setPazienteSelezionato] = useState("");
    const [validPaziente, setValidPaziente] = useState(true);

    const [rispCorretta_1, setRispCorretta_1] = useState("");
    const [rispCorretta_2, setRispCorretta_2] = useState("");
    const [rispCorretta_3, setRispCorretta_3] = useState("");
    const [rispCorretta_4, setRispCorretta_4] = useState("");
    const [validCorrette, setValidCorrette] = useState(true);

    const [rispSbagliata_1, setRispSbagliata_1] = useState("");
    const [rispSbagliata_2, setRispSbagliata_2] = useState("");
    const [rispSbagliata_3, setRispSbagliata_3] = useState("");
    const [rispSbagliata_4, setRispSbagliata_4] = useState("");
    const [validSbagliate, setValidSbagliate] = useState(true);

    const [showQuestionsList, setShowQuestionsList] = useState(true);
    const [aggiungiCategoria, setAggiungiCategoria] = useState(false);

    var categorie = game_ctx.recuperaCategorieDomande(gameType);
    
    const [imageFile, setImageFile] = useState(null);
    const [myFile, setMyFile] = useState(null);
    const [msg, setMsg] = useState("");
    const [flagUpload, setFlagUpload] = useState(1);
    const [validImage, setValidImage] = useState(true);

    // useEffect(() => {
    //     if(flagUpload != 1){
    //     uploadFile();
    //     }    
    // }, [flagUpload])


    useEffect(() => {
        const fetchPazienti = async () => {
            try {
                const result = await getServerMgr().getPatientsListArray(auth_ctx.utenteLoggatoUID); 
                if (Array.isArray(result)) {
                    setPazienti(result);
                } else {
                    console.error("Errore nel recupero dei pazienti", result);
                    setPazienti([]);
                }
            } catch (error) {
                console.error("Errore nel recupero dei pazienti:", error);
                setPazienti([]);
            }
        };
        fetchPazienti();
    }, []);

    const handleCheckboxChange = () => {
        setAggiungiPaziente((prev) => !prev);
    };

    
    const handlePazienteChange = (event) => {
        setPazienteSelezionato(event.target.value);
        setValidPaziente(!!event.target.value);
    };

    function selectFile() {
        image = document.getElementById("mfile").click();
        // setImageFile(image.files[0]);
        // console.log(image);
    }
    function setFile(e) {
        setMyFile(e.target.files[0]);
        console.log(e.target.files[0].name);
        if(e.target.files.length > 0){
            setImageFile(URL.createObjectURL(e.target.files[0]));
            setValidImage(true)
        }
        // setImageFile(URL.createObjectURL(e.target.files[0]));
        setFlagUpload((prevState) => (prevState + 1))
    }
    function uploadFile(){
        const url="https://cognicare.altervista.org/provaScript.php"
        const data = new FormData();
        data.append("file", myFile);
        axios.post(url, data).then(response => setMsg(response.data)).catch(error => setMsg(error))
    }

    function uploadImage(){
        if(flagUpload !== 1){
            uploadFile();
        }
        else{
            alert("Si è verificato un errore! Riprova tra qualche minuto");
        }
    }

    function imageFileChangeHandler(event){
        file = event.target.files[0];
        setImageFile(URL.createObjectURL(file));
        console.log(file.name);
        
    }

    function gameTypeChangeHandler(event){
        setGameType(event.target.value);
        setAggiungiCategoria(false);
    }

    function categoryQuestionChangeHandler(event){
        setCategoryQuestion(event.target.value);
        setValidCategory(true)
    }

    function domandaChangeHandler(event){
        setDomanda(event.target.value);
        setValidDomanda(true)
    }

    function suggerimentoChangeHandler(event){
        setSuggerimento(event.target.value);
    }

    function rispostaCorretta_1_ChangeHandler(event){
        setRispCorretta_1(event.target.value)
        setValidCorrette(true)
    }
    function rispostaCorretta_2_ChangeHandler(event){
        setRispCorretta_2(event.target.value)
        setValidCorrette(true)
    }
    function rispostaCorretta_3_ChangeHandler(event){
        setRispCorretta_3(event.target.value)
        setValidCorrette(true)
    }
    function rispostaCorretta_4_ChangeHandler(event){
        setRispCorretta_4(event.target.value)
        setValidCorrette(true)
    }

    function rispostaSbagliata_1_ChangeHandler(event){
        setRispSbagliata_1(event.target.value)
        setValidSbagliate(true)
    }
    function rispostaSbagliata_2_ChangeHandler(event){
        setRispSbagliata_2(event.target.value)
        setValidSbagliate(true)
    } 
    function rispostaSbagliata_3_ChangeHandler(event){
        setRispSbagliata_3(event.target.value)
        setValidSbagliate(true)
    }
    function rispostaSbagliata_4_ChangeHandler(event){
        setRispSbagliata_4(event.target.value)
        setValidSbagliate(true)
    }

    function categoriaCheckbox(event){
        if(event.target.checked){
            setAggiungiCategoria(true);
        }
        else{
            setAggiungiCategoria(false);
        }
        setCategoryQuestion("")
    }

    function mappaCategorie(categoria){
        return (
            <option>
                {categoria}
            </option>
        );
    }

    function verificaInput(){
        let valore_DOMANDA = true;
        let valore_CATEGORIA = true;
        let valore_CORRETTE = true;
        let valore_SBAGLIATE = true;
        let valore_FILE = true;

        if(domanda.trim().length === 0){
            setValidDomanda(false);
            valore_DOMANDA = false;
        }
        else{
            setValidDomanda(true)
            valore_DOMANDA = true
        }

        if(categoryQuestion.trim().length === 0){
            setValidCategory(false);
            valore_CATEGORIA = false;
        }
        else{
            setValidCategory(true);
            valore_CATEGORIA = true;
        }

        if(gameType === "QUIZ" || gameType === "QUIZ CON IMMAGINI"){
            if(rispCorretta_1.trim().length === 0 && rispCorretta_2.trim().length === 0 && rispCorretta_3.trim().length === 0 && rispCorretta_4.trim().length === 0){
                setValidCorrette(false);
                valore_CORRETTE = false;
            }
            else{
                setValidCorrette(true);
                valore_CORRETTE = true
            }
            if(rispSbagliata_1.trim().length === 0 && rispSbagliata_2.trim().length === 0 && rispSbagliata_3.trim().length === 0 && rispSbagliata_4.trim().length === 0){
                setValidSbagliate(false);
                valore_SBAGLIATE = false;
            }
            else{
                setValidSbagliate(true)
                valore_SBAGLIATE = true;
            }
        }

        if(gameType === "QUIZ CON IMMAGINI"){
            if(myFile){
                setValidImage(true)
                valore_FILE = true
            }
            else{
                setValidImage(false)
                valore_FILE = false
            }
        }

        if(gameType === "COMPLETA LA PAROLA"){
            valore_CORRETTE = true;
            valore_SBAGLIATE = true;
            valore_FILE = true;
        }

        if(!valore_DOMANDA || !valore_CATEGORIA || !valore_CORRETTE || !valore_SBAGLIATE || !valore_FILE){
            console.log("DOMANDA = " + valore_DOMANDA)
            console.log("CATEGORIA = " + valore_CATEGORIA)
            console.log("CORRETTE = " + valore_CORRETTE)
            console.log("SBAGLIATE = " + valore_SBAGLIATE)
            console.log("FILE = " + valore_FILE)
            return false
        }
        else{
            return true
        }
    }
    
    function creaNuovaDomanda(){
        let risultato = verificaInput();

        if(risultato){
            var new_question;
            var correct_answers = {};
            var wrong_answers = {};
    
            if(rispCorretta_1.trim().length > 0){
                correct_answers["correct_answer_n1"] = rispCorretta_1;
            }
            else{
                correct_answers["correct_answer_n1"] = "";
            }
            if(rispSbagliata_1.trim().length > 0){
                wrong_answers["wrong_answer_n1"] = rispSbagliata_1;
            }
            else{
                wrong_answers["wrong_answer_n1"] = "";
            }
    
            if(rispCorretta_2.trim().length > 0){
                correct_answers["correct_answer_n2"] = rispCorretta_2;
            }
            else{
                correct_answers["correct_answer_n2"] = "";
            }
            if(rispCorretta_3.trim().length > 0){
                correct_answers["correct_answer_n3"] = rispCorretta_3;
            }
            else{
                correct_answers["correct_answer_n3"] = "";
            }
            if(rispCorretta_4.trim().length > 0){
                correct_answers["correct_answer_n4"] = rispCorretta_4;
            }
            else{
                correct_answers["correct_answer_n4"] = "";
            }
    
            if(rispSbagliata_2.trim().length > 0){
                wrong_answers["wrong_answer_n2"] = rispSbagliata_2;
            }
            else{
                wrong_answers["wrong_answer_n2"] = "";
            }
            if(rispSbagliata_3.trim().length > 0){
                wrong_answers["wrong_answer_n3"] = rispSbagliata_3;
            }
            else{
                wrong_answers["wrong_answer_n3"] = "";
            }
            if(rispSbagliata_4.trim().length > 0){
                wrong_answers["wrong_answer_n4"] = rispSbagliata_4;
            }
            else{
                wrong_answers["wrong_answer_n4"] = "";
            }
    
            // console.log(all_answers);
    
            if(gameType === "QUIZ"){
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers
                }
            }
    
            if(gameType === "QUIZ CON IMMAGINI"){
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    immagine: myFile.name
                }
                
                uploadImage();
    
            }
    
            if(gameType === "COMPLETA LA PAROLA"){
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda.toUpperCase(),
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    suggerimento: suggerimento
                }
            }
    
            props.aggiungiDomanda(new_question);
            resetValuesQuestions();
            setShowQuestionsList(true);
        }
        else{
            console.log("ERRORE")
            // console.log(risultato)
        }
    }

    function resetValuesQuestions(){
        setDomanda("");
        setCategoryQuestion("")
        setRispCorretta_1("")
        setRispCorretta_2("")
        setRispCorretta_3("")
        setRispCorretta_4("")
        setRispSbagliata_1("")
        setRispSbagliata_2("")
        setRispSbagliata_3("")
        setRispSbagliata_4("")
    }

    function mostraFormModificaDomanda(tipoGioco, singleQuestion, ID){
        props.mostraModificaDomanda(tipoGioco, singleQuestion, ID);
    }

    function aggiungiAlternativaCorretta(){
        if(totalAnswers_CORRECT < 4){
            counter_CORRETTE += 1;
            setTotalAnswers_CORRECT(counter_CORRETTE);
        }
        console.log(counter_CORRETTE);
    }

    function rimuoviAlternativaCorretta(){
        if(totalAnswers_CORRECT > 1){
            counter_CORRETTE -= 1;
            setTotalAnswers_CORRECT(counter_CORRETTE);
        }
        console.log(counter_CORRETTE);
    }

    function aggiungiAlternativaSbagliata(){
        if(totalAnswers_WRONG < 4){
            counter_SBAGLIATE += 1;
            setTotalAnswers_WRONG(counter_SBAGLIATE);
        }
        console.log(counter_SBAGLIATE);
    }

    function rimuoviAlternativaSbagliata(){
        if(totalAnswers_WRONG > 1){
            counter_SBAGLIATE -= 1;
            setTotalAnswers_WRONG(counter_SBAGLIATE);
        }
        console.log(counter_SBAGLIATE);
    }

    return(
        <>
            {showQuestionsList && <h1 className={styles.page_title}>Lista domande</h1>}
            {!showQuestionsList && <h1 className={styles.page_title}>Nuova domanda</h1>}
            {showQuestionsList &&
                <>
                    <div className={styles.wrapper_generico}>
                        <GenericButton
                            onClick={() => {
                                setShowQuestionsList(false);
                            }}
                            generic_button={true}
                            buttonText={"Aggiungi domanda"}
                        >
                        </GenericButton>
                        <GenericButton
                            onClick={props.chiudiFormNuovaDomanda}
                            generic_button={true}
                            red_styling
                            buttonText={"Torna ai giochi"}
                        >
                        </GenericButton>
                    </div>

                    <ElencoDomandeModificabili
                        modificaSingolaDomanda={mostraFormModificaDomanda}
                    >
                    </ElencoDomandeModificabili>
                </>
            }
            {!showQuestionsList &&
                <>
                    <div className={styles.wrapper_impostazioni_gioco}>
                      
                        <label className={styles.label_style}>Tipo gioco</label>
                        <select className={styles.select_style} onChange={gameTypeChangeHandler}>
                            <option>QUIZ</option>
                            <option>QUIZ CON IMMAGINI</option>
                            <option>COMPLETA LA PAROLA</option>
                        
                        </select>

                        
                                
                        <div>
         
            {aggiungiPaziente && (
                <>
                    <select
                        className={`${styles.textbox_style} ${!validPaziente ? styles.invalid : ""}`}
                        onChange={handlePazienteChange}
                        value={pazienteSelezionato}
                    >
                        <option value="">Seleziona un paziente</option>
                        {pazienti.map((paziente) => (
                            <option key={paziente.id} value={paziente.id}>
                                {paziente.nome} {paziente.cognome}
                            </option>
                        ))}
                    </select>
                </>
            )}

          
            {!validPaziente && (
                <div style={{ width: "100%", color: "red", textAlign: "center" }}>
                    Seleziona
                </div>
            )}

           
            <div className={styles.horizontal_flex}>
                <input
                    className={styles.horizontal_flex_content}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                />
                <label className={styles.horizontal_flex_content}>Aggiungi nuovo paziente</label>
            </div>
        </div>
    

                        {gameType === "QUIZ CON IMMAGINI" &&
                            <>
                                <input type="file" name="mfile" id="mfile" onChange={setFile} style={{display: 'none'}}></input>
                                <button onClick={selectFile}>{"Select file"}</button>
                                <img className={`${styles.preview_image} ${!validImage ? styles.invalid : ""}`} src={imageFile}></img>
                                {!validImage && <div style={{width: "100%", color: "red", textAlign: "center"}}>Immagine obbligatoria per questo gioco</div>}
                                <label className={styles.label_style}>Inserisci domanda: </label>
                                <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" onChange={domandaChangeHandler}></input>
                            </>
                        }

                        {gameType === "COMPLETA LA PAROLA" &&
                            <>
                                <label className={styles.label_style}>Inserisci parola da indovinare: </label>
                                <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" onChange={domandaChangeHandler}></input>
                                <label className={styles.label_style}>Inserisci suggerimento: </label>
                                <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" onChange={suggerimentoChangeHandler}></input>
                            </>
                        }
                        {!validDomanda && <div style={{width: "100%", color: "red", textAlign: "center"}}>La domanda non può essere vuota</div>}
                        
                        {(gameType === "QUIZ" || gameType === "QUIZ CON IMMAGINI") &&
                            <div className={styles.wrapper_flexible}>
                                <div className={styles.wrapper_items}>
                                    <label className={styles.label_style}>Risposta Corretta 1: </label>
                                    <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" onChange={rispostaCorretta_1_ChangeHandler}></input>

                                    {totalAnswers_CORRECT > 1 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Corretta 2: </label>
                                            <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" onChange={rispostaCorretta_2_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_CORRECT > 2 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Corretta 3: </label>
                                            <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" onChange={rispostaCorretta_3_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_CORRECT > 3 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Corretta 4: </label>
                                            <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" onChange={rispostaCorretta_4_ChangeHandler}></input>
                                        </>
                                    }
                                    {!validCorrette && <div style={{width: "100%", color: "red", textAlign: "center"}}>Devi inserire almeno una risposta corretta</div>}

                                    <div className={styles.wrapper_generico}>
                                        {totalAnswers_CORRECT < 4 &&
                                            <GenericAlternativeButton
                                                onClick={aggiungiAlternativaCorretta}
                                                buttonText={"Aggiungi corretta"}
                                            >
                                            </GenericAlternativeButton>
                                        }
                                        {totalAnswers_CORRECT > 1 &&
                                            <GenericAlternativeButton
                                                onClick={rimuoviAlternativaCorretta}
                                                colore_rosso={true}
                                                buttonText={"Rimuovi corretta"}
                                            >
                                            </GenericAlternativeButton>
                                        }
                                    </div>
                                    
                                </div>

                                <div className={styles.wrapper_items}>
                                    <label className={styles.label_style}>Risposta Sbagliata 1: </label>
                                    <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" onChange={rispostaSbagliata_1_ChangeHandler}></input>

                                    {totalAnswers_WRONG > 1 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Sbagliata 2: </label>
                                            <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" onChange={rispostaSbagliata_2_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_WRONG > 2 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Sbagliata 3: </label>
                                            <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" onChange={rispostaSbagliata_3_ChangeHandler}></input>
                                        </>
                                    }

                                    {totalAnswers_WRONG > 3 &&
                                        <>
                                            <label className={styles.label_style}>Risposta Sbagliata 4: </label>
                                            <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" onChange={rispostaSbagliata_4_ChangeHandler}></input>
                                        </>
                                    }
                                    {!validSbagliate && <div style={{width: "100%", color: "red", textAlign: "center"}}>Devi inserire almeno una risposta sbagliata</div>}

                                    <div className={styles.wrapper_generico}>
                                        {totalAnswers_WRONG < 4 &&
                                            <GenericAlternativeButton
                                                onClick={aggiungiAlternativaSbagliata}
                                                buttonText={"Aggiungi sbagliata"}
                                            >
                                            </GenericAlternativeButton>
                                        }
                                        {totalAnswers_WRONG > 1 &&
                                            <GenericAlternativeButton
                                                onClick={rimuoviAlternativaSbagliata}
                                                colore_rosso={true}
                                                buttonText={"Rimuovi sbagliata"}
                                            >
                                            </GenericAlternativeButton>
                                        }
                                    </div>
                                    
                                </div>  
                            </div>
                        }
                        <hr className={styles.horizontal_line}></hr>
                        
                        <div className={styles.wrapper_generico}>
                            <GenericButton
                                onClick={creaNuovaDomanda}
                                generic_button={true}
                                buttonText={"Salva domanda"}
                            >
                            </GenericButton>
                            <GenericButton
                                onClick={() => {
                                    setShowQuestionsList(true);
                                }}
                                generic_button={true}
                                red_styling
                                buttonText={"Torna alla lista"}
                            >
                            </GenericButton>
                            {/* <GenericButton
                                onClick={props.chiudiFormNuovaDomanda}
                                generic_button={true}
                                red_styling
                                buttonText={"Chiudi scheda"}
                            >
                            </GenericButton> */}
                        </div>
                    </div>
                </>
            }
            
            
        </>
    );
}

export default AddDomanda;