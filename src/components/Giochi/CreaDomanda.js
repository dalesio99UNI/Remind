import { useEffect, useContext, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./CreaDomanda.module.css";
import GameContext from "../../context/game-context";
import AuthContext from "../../context/auth-context";
import GenericButton from "../UI/GenericButton";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getServerMgr } from "../../backend_conn/ServerMgr";


var counter_CORRETTE = 1;
var counter_SBAGLIATE = 1;
var image;
var file;

function CreaDomanda(props) {
    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext);

    const params = useParams();
    const navigate = useNavigate();

    const [totalAnswers_CORRECT, setTotalAnswers_CORRECT] = useState(counter_CORRETTE);
    const [totalAnswers_WRONG, setTotalAnswers_WRONG] = useState(counter_SBAGLIATE);

    const [media, setMedia] = useState(""); 

    const [gameType, setGameType] = useState("QUIZ");
    const [categoryQuestion, setCategoryQuestion] = useState("");
    const [validCategory, setValidCategory] = useState(true);
    const [domanda, setDomanda] = useState("");
    const [validDomanda, setValidDomanda] = useState(true);
    const [suggerimento, setSuggerimento] = useState("");

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

    const [aggiungiCategoria, setAggiungiCategoria] = useState(false);

    var categorie = game_ctx.recuperaCategorieDomande(gameType);

    const [aggiungiPaziente, setAggiungiPaziente] = useState(false);
    const [pazienti, setPazienti] = useState([]);
    const [pazienteSelezionato, setPazienteSelezionato] = useState("");
    const [validPaziente, setValidPaziente] = useState(true);

    const [imageFile, setImageFile] = useState(null);
    const [validImage, setValidImage] = useState(true);
    const [audioFile, setAudioFile] = useState(null);
    const [validAudio, setValidAudio] = useState(true);
    const [myFile, setMyFile] = useState(null);
    const [msg, setMsg] = useState("");
    const [flagUpload, setFlagUpload] = useState(1);
    const [videoFile, setVideoFile] = useState(null);
    const [validVideo, setValidVideo] = useState(true);
    const [mediaCheckbox, setMediaCheckbox] = useState(false);
    const [selezionaMediaBox, setSelezionaMediaBox] = useState(false);
const[atLeast1CorrectAnswer,setAtLeast1CorrectAnswer]=useState(true);
const[atLeast1WrongAnswer,setAtLeast1WrongAnswer]=useState(true);
    const [selectedMedia, setSelectedMedia] = useState([]); 

    const handleMediaSelection = (mediaItem) => {
        if (!mediaItem || !mediaItem.url_multimedia || !mediaItem.tipo_multimedia) {
            console.error("mediaItem non valido:", mediaItem);
            return; 
        }
    
       
        let url = mediaItem.url_multimedia;
    if (url.startsWith("immagini/" )) {
        url = url.replace("immagini/", "");
    }else if(url.startsWith("/immagini/")){
        url = url.replace("/immagini/", "");
    }
    console.log("stampo solo il file senza immagini",url);
        setSelectedMedia((prevSelected) => {
            
            if (prevSelected.includes(mediaItem)) {
             
                return prevSelected.filter((item) => item !== mediaItem);
            } else {
              
                return [...prevSelected, mediaItem];
            }
        });
    
       
        if (mediaItem.tipo_multimedia === "audio") {
            setAudioFile(url);
            setValidAudio(true);
            setMyFile(url);
            setMediaCheckbox(true);
        } else if (mediaItem.tipo_multimedia === "video") {
            setVideoFile(url);
            setValidVideo(true);
            setMyFile(url);
            setMediaCheckbox(true);
        } else if (mediaItem.tipo_multimedia === "immagine") {
            setImageFile(url);
            setValidImage(true);
            setMyFile(url);
            setMediaCheckbox(true);
        }
        console.log("stampo il mediatype",mediaItem.tipo_multimedia);
        setFlagUpload(prevState => (prevState + 1));
    };
    
    



    

    const handleCheckboxChange = (event) => {
        setSelezionaMediaBox(event.target.checked);
        
       
      };
      

    
    useEffect(() => {
        const fetchPazienti = async () => {
            try {
                const result = await getServerMgr().getPatientsListArray(auth_ctx.utenteLoggatoUID);
                if (Array.isArray(result)) {
                    setPazienti(result);
                } else {
                    setPazienti([]);
                }
            } catch (error) {
                console.error("Errore nel recupero dei pazienti:", error);
                setPazienti([]);
            }
        };
        if (auth_ctx.utenteLoggatoUID) {
            fetchPazienti();
        }
    }, [auth_ctx.utenteLoggatoUID]);


    
        const handlePazienteChange = async (event) => {
            const pazienteId = event.target.value;  
            setPazienteSelezionato(pazienteId);  
            console.log("Paziente selezionato:", pazienteId);
            setValidPaziente(!!pazienteId);  
        
            if (pazienteId) {
                try {
                   
                    const multimedia = await getServerMgr().getPatientMedia(pazienteId);
        
                    console.log("Multimedia del paziente:", multimedia);
                    setMedia(multimedia);  
                } catch (error) {
                    console.error("Errore nel recuperare i multimedia:", error);
                    setMedia([]); 
                }
            } else {
               
                setMedia([]);  
            }
        };
        
    

    function selectFile() {
        image = document.getElementById("mfile").click();
    }

    function setFile(e) {
        console.log("sta salvando il file!");
        setMyFile(e.target.files[0]);
        console.log("file salvato",e.target.files[0]);
        if (e.target.files.length > 0) {
            if (gameType === "QUIZ CON VIDEO") {
                setVideoFile(URL.createObjectURL(e.target.files[0]));
                setValidVideo(true); 
            } else if (gameType === "QUIZ CON IMMAGINI") {
                setImageFile(URL.createObjectURL(e.target.files[0]));
                setValidImage(true); 
            } else if (gameType === "QUIZ CON SUONI") {
                setAudioFile(URL.createObjectURL(e.target.files[0]));
                setValidAudio(true); 
            }
        }
        console.log("salvo l'immaigne",myFile);
        setFlagUpload(prevState => (prevState + 1)); 
    }
    
    function verificaVideo() {
        if (!videoFile) {
            setValidVideo(false);
        } else {
            setValidVideo(true); 
        }
    }
    
    function uploadVideo() {
        if (flagUpload !== 1) {
            if (!videoFile) {
                alert("Devi selezionare un video!");
                return;  
            }
            uploadFile(videoFile);  
        } else {
            alert("Si è verificato un errore! Riprova tra qualche minuto");
        }
    }
    

    function uploadFile() {
        const url = "http://localhost:3000/connection.php";
        const data = new FormData();
        data.append("file", myFile);
        axios.post(url, data).then(response => setMsg(response.data)).catch(error => setMsg(error));
    }

    function uploadImage() {
        console.log("Funzione salva domanda attivata!");
        if (flagUpload !== 1) {
            uploadFile();
        } else {
            alert("Si è verificato un errore! Riprova tra qualche minuto");
        }
    }

    function gameTypeChangeHandler(event) {
        setGameType(event.target.value);
        setAggiungiCategoria(false);
    }

    function domandaChangeHandler(event) {
        setDomanda(event.target.value);
        setValidDomanda(true);
    }

    function suggerimentoChangeHandler(event) {
        setSuggerimento(event.target.value);
    }

  
    function rispostaCorretta_1_ChangeHandler(event) {
        setRispCorretta_1(event.target.value);
        setValidCorrette(true);
    }
    function rispostaCorretta_2_ChangeHandler(event) {
        setRispCorretta_2(event.target.value);
        setValidCorrette(true);
    }
    function rispostaCorretta_3_ChangeHandler(event) {
        setRispCorretta_3(event.target.value);
        setValidCorrette(true);
    }
    function rispostaCorretta_4_ChangeHandler(event) {
        setRispCorretta_4(event.target.value);
        setValidCorrette(true);
    }

   
    function rispostaSbagliata_1_ChangeHandler(event) {
        setRispSbagliata_1(event.target.value);
        setValidSbagliate(true);
    }
    function rispostaSbagliata_2_ChangeHandler(event) {
        setRispSbagliata_2(event.target.value);
        setValidSbagliate(true);
    }
    function rispostaSbagliata_3_ChangeHandler(event) {
        setRispSbagliata_3(event.target.value);
        setValidSbagliate(true);
    }
    function rispostaSbagliata_4_ChangeHandler(event) {
        setRispSbagliata_4(event.target.value);
        setValidSbagliate(true);
    }

    function verificaInput() {
        let valore_DOMANDA = true;
        let valore_CORRETTE = true;
        let valore_SBAGLIATE = true;
        let valore_FILE = true;
        let valore_VIDEO = true;
    
       
        if (domanda && domanda.trim().length === 0) {
            setValidDomanda(false);
            valore_DOMANDA = false;
        } else {
            setValidDomanda(true);
            valore_DOMANDA = true;
        }
    
       
        if (gameType === "QUIZ" || gameType === "QUIZ CON IMMAGINI") {
            if ((rispCorretta_1 && rispCorretta_1.trim().length === 0) && 
                (rispCorretta_2 && rispCorretta_2.trim().length === 0) && 
                (rispCorretta_3 && rispCorretta_3.trim().length === 0) && 
                (rispCorretta_4 && rispCorretta_4.trim().length === 0)) {
                setValidCorrette(false);
                valore_CORRETTE = false;
            } else {
                setValidCorrette(true);
                valore_CORRETTE = true;
            }


            if ((rispSbagliata_1 && rispSbagliata_1.trim().length === 0) && 
                (rispSbagliata_2 && rispSbagliata_2.trim().length === 0) && 
                (rispSbagliata_3 && rispSbagliata_3.trim().length === 0) && 
                (rispSbagliata_4 && rispSbagliata_4.trim().length === 0)) {
                setValidSbagliate(false);
                valore_SBAGLIATE = false;
            } else {
                setValidSbagliate(true);
                valore_SBAGLIATE = true;
            }
        }
    console.log("vedo cosa c è in mio file",myFile);
        
        console.log("stampo gametype",gameType);
        if (gameType === "QUIZ CON IMMAGINI" || mediaCheckbox) {
            if (myFile) {
                setValidImage(true);
                valore_FILE = true;
            } else {
                setValidImage(false);
                valore_FILE = false;
            }
        }
    
        
        if (gameType === "QUIZ CON VIDEO" || mediaCheckbox) {
            if (myFile) {
                setValidVideo(true); 
                valore_VIDEO = true; 
            } else {
                setValidVideo(false); 
                valore_VIDEO = false;
            }
        }
    
        
        if (gameType === "COMPLETA LA PAROLA") {
            valore_CORRETTE = true;
            valore_SBAGLIATE = true;
            valore_FILE = true;
        }
    
        
        console.log("DOMANDA = " + valore_DOMANDA);
        console.log("CORRETTE = " + valore_CORRETTE);
        console.log("SBAGLIATE = " + valore_SBAGLIATE);
        console.log("FILE = " + valore_FILE);
        console.log("VIDEO = " + valore_VIDEO);
    
        if (!valore_DOMANDA || !valore_CORRETTE || !valore_SBAGLIATE || !valore_FILE || !valore_VIDEO ) {
            return false; 
        } else {
            return true; 
        }
    }
    
    
    
    function creaNuovaDomanda() {
        let risultato = verificaInput();
        console.log("Funzione salva domanda attivata!");
        console.log("verifico il risultato",risultato);
        if (risultato) {
            var new_question;
            var correct_answers = {};
            var wrong_answers = {};

            if (rispCorretta_1.trim().length > 0) {
                correct_answers["correct_answer_n1"] = rispCorretta_1;
            }
            if (rispSbagliata_1.trim().length > 0) {
                wrong_answers["wrong_answer_n1"] = rispSbagliata_1;
            }
            
            if (rispCorretta_2.trim().length > 0) {
                correct_answers["correct_answer_n2"] = rispCorretta_2;
            }
            if (rispCorretta_3.trim().length > 0) {
                correct_answers["correct_answer_n3"] = rispCorretta_3;
            }
            if (rispCorretta_4.trim().length > 0) {
                correct_answers["correct_answer_n4"] = rispCorretta_4;
            }

            if (rispSbagliata_2.trim().length > 0) {
                wrong_answers["wrong_answer_n2"] = rispSbagliata_2;
            }
            if (rispSbagliata_3.trim().length > 0) {
                wrong_answers["wrong_answer_n3"] = rispSbagliata_3;
            }
            if (rispSbagliata_4.trim().length > 0) {
                wrong_answers["wrong_answer_n4"] = rispSbagliata_4;
            }

            if (gameType === "QUIZ") {
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers
                };
            }

            console.log("stampo myfile per vedere perchè è null",myFile);
            if (gameType === "QUIZ CON IMMAGINI" || gameType === "QUIZ CON SUONI" ) {
                if(mediaCheckbox){
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    immagine:myFile
                };
            }else{
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    immagine: myFile.name 
            }
                console.log("stampo l'immagine prima di caricarla",new_question.immagine);
                
                uploadImage();
            }
        }

            if (gameType === "QUIZ CON VIDEO") {
                if(mediaCheckbox){
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    immagine: myFile  
                };
            }else{
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    immagine: myFile.name
            }
    
            
                uploadVideo();
            }
        }

            if (gameType === "COMPLETA LA PAROLA") {
                new_question = {
                    doctor_UID: auth_ctx.utenteLoggatoUID,
                    tipoGioco: gameType,
                    categoria: categoryQuestion,
                    domanda: domanda.toUpperCase(),
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    suggerimento: suggerimento
                };
            }
            console.log("Prima di aggiungere la domanda,vedo il suggerimento!",new_question.suggerimento);
        
           
            game_ctx.aggiungiDomandaAllaLista(new_question);
            resetValuesQuestions();
            navigate(`/domande/${params.UID}`);
        }
    }

    function resetValuesQuestions() {
        setDomanda("");
        setCategoryQuestion("");
        setRispCorretta_1("");
        setRispCorretta_2("");
        setRispCorretta_3("");
        setRispCorretta_4("");
        setRispSbagliata_1("");
        setRispSbagliata_2("");
        setRispSbagliata_3("");
        setRispSbagliata_4("");
    }

    
    function aggiungiAlternativaCorretta() {
        if (totalAnswers_CORRECT < 4) {
            counter_CORRETTE += 1;
            setTotalAnswers_CORRECT(counter_CORRETTE);
        }
    }

    function rimuoviAlternativaCorretta() {
        if (totalAnswers_CORRECT > 1) {
            counter_CORRETTE -= 1;
            setTotalAnswers_CORRECT(counter_CORRETTE);
        }
    }

    function aggiungiAlternativaSbagliata() {
        if (totalAnswers_WRONG < 4) {
            counter_SBAGLIATE += 1;
            setTotalAnswers_WRONG(counter_SBAGLIATE);
        }
    }

    function rimuoviAlternativaSbagliata() {
        if (totalAnswers_WRONG > 1) {
            counter_SBAGLIATE -= 1;
            setTotalAnswers_WRONG(counter_SBAGLIATE);
        }
    }

   


    return(
        <>
            <h1 className={styles.page_title}>Nuova domanda</h1>

            <div className={styles.wrapper_impostazioni_gioco}>
              
                <label className={styles.label_style}>Tipo gioco</label>
                <select className={styles.select_style} onChange={gameTypeChangeHandler}>
                   
                    <option>QUIZ</option>
                    <option>QUIZ CON IMMAGINI</option>
                    <option>QUIZ CON SUONI</option>
                    <option>QUIZ CON VIDEO</option>
                    <option>COMPLETA LA PAROLA</option>
                </select>


                {gameType !== "QUIZ" && gameType !== "COMPLETA LA PAROLA" && (
    <div style={{ marginTop: "10px" }}>
    <label>
        <input
            type="checkbox"
            checked={selezionaMediaBox} 
            onChange={handleCheckboxChange} 
        />
        SELEZIONA MEDIA DALLA BOX DEL PAZIENTE
        <span className={styles.tooltip}>
            <i className="fa fa-info-circle"></i> 
            <span className={styles.tooltipText}>
              I media(se presenti) compariranno al di sopra del pulsante "Salva domanda"
           </span>
        </span>
    </label>
</div>

)}



                {gameType !== "QUIZ" && gameType !== "COMPLETA LA PAROLA" && selezionaMediaBox && (
    <div>
        <label className={styles.label_style}>Seleziona un Paziente</label>
        <div>    
        
            {pazienti.length > 0 && (
                <>
                    <select
                        className={`${styles.textbox_style} ${!validPaziente ? styles.invalid : ""}`}
                        onChange={handlePazienteChange}
                        value={pazienteSelezionato}
                    >
                        <option value="">Seleziona</option>
                        {pazienti.map((paziente) => (
                            <option key={paziente.ID} value={paziente.ID}>
                                {paziente.nome} {paziente.cognome}
                            </option>
                        ))}
                    </select>
                </>
            )}

            
            {!validPaziente && aggiungiPaziente && (
                <div style={{ width: "100%", color: "red", textAlign: "center" }}>
                    Seleziona
                </div>
            )}
        </div>

      
    </div>
)}




{gameType === "QUIZ" &&
    <>
        <label className={styles.label_style}>Inserisci domanda: </label>
        <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" onChange={domandaChangeHandler}></input>
    </>
}

{gameType === "QUIZ CON IMMAGINI" && !selezionaMediaBox &&
    <>
        <input type="file" name="mfile" id="mfile" onChange={setFile} style={{display: 'none'}}></input>
        <button onClick={selectFile}>{"Select file"}</button>
        <img className={`${styles.preview_image} ${!validImage ? styles.invalid : ""}`} src={imageFile}></img>
        {!validImage && <div style={{width: "100%", color: "red", textAlign: "center"}}>Immagine obbligatoria per questo gioco</div>}
        </>
}

{gameType === "QUIZ CON SUONI" && !selezionaMediaBox &&
    <>
        <input type="file" name="mfile" id="mfile" onChange={setFile} style={{display: 'none'}}></input>
        <button onClick={selectFile}>{"Select file"}</button>
        <audio controls={true} className={`${!validAudio ? styles.invalid : ""}`} src={audioFile}></audio>
        {!validAudio && <div style={{width: "100%", color: "red", textAlign: "center"}}>Audio obbligatorio per questo gioco</div>}
       </>
}

{gameType === "QUIZ CON VIDEO" && !selezionaMediaBox &&
    <>
        <input type="file" name="mfile" id="mfile" onChange={setFile} style={{display: 'none'}}></input>
        <button onClick={selectFile}>{"Select file"}</button>
        <video controls={true} className={`${!validVideo ? styles.invalid : ""}`} src={videoFile} width="120" height="140"></video>
        {!validVideo && <div style={{width: "100%", color: "red", textAlign: "center"}}>Video obbligatorio per questo gioco</div>}
 </>
}


{(gameType !== "QUIZ" && gameType !== "COMPLETA LA PAROLA") && (
    <>
        <label className={styles.label_style}>Inserisci domanda: </label>
        <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" onChange={domandaChangeHandler} />
    </>
)}

{gameType === "COMPLETA LA PAROLA" &&
    <>
        <label className={styles.label_style}>Inserisci parola da indovinare: </label>
        <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" onChange={domandaChangeHandler}></input>
        <label className={styles.label_style}>Inserisci suggerimento: </label>
        <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" onChange={suggerimentoChangeHandler}></input>
    </>
}

{!validDomanda && <div style={{width: "100%", color: "red", textAlign: "center"}}>La domanda non può essere vuota</div>}

{(gameType === "QUIZ" || gameType === "QUIZ CON IMMAGINI" || gameType === "QUIZ CON SUONI" || gameType === "QUIZ CON VIDEO" || gameType === "QUIZ CON MAPPE") &&
    <div className={styles.wrapper_flexible}>
         <div className={styles.wrapper_items}>
    <label className={styles.label_style}>Risposta Corretta 1: </label>
    <input 
      className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} 
      type="text" 
      onChange={rispostaCorretta_1_ChangeHandler}
      required 
    />
    <div style={{color: "red", display: !validCorrette ? "block" : "none", textAlign: "center"}}>
      Inserisci almeno una risposta
    </div>
   
   
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
                    />
                }
                {totalAnswers_CORRECT > 1 &&
                    <GenericAlternativeButton
                        onClick={rimuoviAlternativaCorretta}
                        colore_rosso={true}
                        buttonText={"Rimuovi corretta"}
                    />
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
                    />
                }
                {totalAnswers_WRONG > 1 &&
                    <GenericAlternativeButton
                        onClick={rimuoviAlternativaSbagliata}
                        colore_rosso={true}
                        buttonText={"Rimuovi sbagliata"}
                    />
                }
            </div>
            
        </div>  
    </div>
}

                
<div className={styles.mediaContainer}>
    <hr className={styles.horizontal_line} />

    {gameType === "QUIZ" || gameType === "COMPLETA LA PAROLA" || !selezionaMediaBox ? null : (() => {
        
        const mediaArray = Array.isArray(media) ? media : [];

       
        const gameTypeMapping = {
            "QUIZ CON SUONI": "audio",
            "QUIZ CON AUDIO": "audio",
            "QUIZ CON IMMAGINI": "immagine",
            "QUIZ CON VIDEO": "video",
        };

       
        const requiredMediaType = gameTypeMapping[gameType] || gameType.toLowerCase();

       
        const filteredMedia = mediaArray.filter((item) =>
            item.tipo_multimedia?.toLowerCase() === requiredMediaType
        );

        return filteredMedia.length > 0 ? (
            filteredMedia.map((item, index) => (
                <div key={item.id_multimedia} className={styles.mediaItem}>
                    <input
                        type="checkbox"
                        checked={selectedMedia.some(selected => selected.id_multimedia === item.id_multimedia)}
                        onChange={() => handleMediaSelection(item)}
                    />
                    
                    {item.tipo_multimedia === "audio" && (
                        <audio controls>
                            <source src={`/${item.url_multimedia}`} type="audio/mp3" />
                            Il tuo browser non supporta l'elemento audio.
                        </audio>
                    )}
                    {item.tipo_multimedia === "video" && (
                        <video controls width="320" height="240">
                            <source src={`/${item.url_multimedia}`} type="video/mp4" />
                            Il tuo browser non supporta il video.
                        </video>
                    )}
                    {item.tipo_multimedia === "immagine" && (
                        <img
                            src={`/${item.url_multimedia}`}
                            alt={`Immagine ${index}`}
                            className={styles.mediaImage}
                        />
                    )}
                </div>
            ))
        ) : (
            <p>Nessun media disponibile nella box</p>
        );
    })()}

    <hr className={styles.horizontal_line} />
</div>






      

                
                <div className={styles.wrapper_generico}>
                    <GenericButton
                        onClick={creaNuovaDomanda}
                        generic_button={true}
                        buttonText={"Salva domanda"}
                    >
                    </GenericButton>
                    <Link to={`/domande/${params.UID}`} style={{textDecoration: "none"}}>
                        <GenericButton
                            onClick={() => {
                                // setShowQuestionsList(true);
                            }}
                            generic_button={true}
                            red_styling
                            buttonText={"Torna alla lista"}
                        >
                        </GenericButton>
                    </Link>
                    
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
    );
}

export default CreaDomanda;