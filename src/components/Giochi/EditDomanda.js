import styles from "./EditDomanda.module.css";
import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import Card from "../UI/Card";
import GameContext from "../../context/game-context";
import axios from "axios";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import AuthContext from "../../context/auth-context";


var counter_CORRETTE = 1;
var counter_SBAGLIATE = 1;
var image;
var file;

function EditDomanda(props){
    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext);
    const websiteUrl = "/immagini/";

    const [totalAnswers_CORRECT, setTotalAnswers_CORRECT] = useState(1);
    const [totalAnswers_WRONG, setTotalAnswers_WRONG] = useState(1);

    const [tipoGiocoModifica, setTipoGiocoModifica] = useState(props.tipoGioco);
    
    const [domandaModifica, setDomandaModifica] = useState(props.domanda);
    console.log("questa è la domanda passata", props.domanda);
    const [validDomanda, setValidDomanda] = useState(true);
    const [suggerimentoModifica, setSuggerimentoModifica] = useState(props.suggerimento)
    const [ID, setID] = useState(props.ID);

    const [rispCorretta_1Modifica, setRispCorretta_1Modifica] = useState(props.correttaN1);
    const [rispCorretta_2Modifica, setRispCorretta_2Modifica] = useState(props.correttaN2);
    const [rispCorretta_3Modifica, setRispCorretta_3Modifica] = useState(props.correttaN3);
    const [rispCorretta_4Modifica, setRispCorretta_4Modifica] = useState(props.correttaN4);
    const [validCorrette, setValidCorrette] = useState(true);
    const [videoFile, setVideoFile] = useState(websiteUrl.concat(props.immagine)); 
    const [videoFileURL, setVideoFileURL] = useState(''); 
    const [pazienteSelezionato, setPazienteSelezionato] = useState("");
    const [rispSbagliata_1Modifica, setRispSbagliata_1Modifica] = useState(props.sbagliataN1);
    const [rispSbagliata_2Modifica, setRispSbagliata_2Modifica] = useState(props.sbagliataN2);
    const [rispSbagliata_3Modifica, setRispSbagliata_3Modifica] = useState(props.sbagliataN3);
    const [rispSbagliata_4Modifica, setRispSbagliata_4Modifica] = useState(props.sbagliataN4);
    const [validSbagliate, setValidSbagliate] = useState(true);
    const [mediaCheckbox, setMediaCheckbox] = useState(false);
    const [imageFile, setImageFile] = useState(websiteUrl.concat(props.immagine));
    const [audioFile, setAudioFile] = useState(websiteUrl.concat(props.immagine));
    const [myFile, setMyFile] = useState(null);
    const [msg, setMsg] = useState("");
    const [flagUpload, setFlagUpload] = useState(1);
    const [pazienti, setPazienti] = useState([]);
    const [validPaziente, setValidPaziente] = useState(true);
    const [aggiungiPaziente, setAggiungiPaziente] = useState(false);
    const [selezionaMediaBox, setSelezionaMediaBox] = useState(false);
    const [media, setMedia] = useState("");
    const [selectedMedia, setSelectedMedia] = useState([]);

    useEffect(() => {
        console.log(myFile);
    }, []);

    useEffect(() => {
        if (props.domanda) {
            setDomandaModifica(props.domanda);
        }
    }, [props.domanda]);
    
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

    function selectFile() {
        image = document.getElementById("mfile").click();
        // setImageFile(image.files[0]);
        // console.log(image);
    }
    const handleCheckboxChange = (event) => {
       
        setSelezionaMediaBox(event.target.checked);
        
       
      };


      const handleMediaSelection = (mediaItem) => {
        console.log("stampo il media selezionato",mediaItem);
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
          
            setMyFile(url);
            
        } else if (mediaItem.tipo_multimedia === "video") {
            setVideoFile(url);
            
            setMyFile(url);
           
        } else if (mediaItem.tipo_multimedia === "immagine") {
            setImageFile(url);
           
            setMyFile(url);
           
        }
        setFlagUpload(prevState => (prevState + 1));
    };
    


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


    function setFile(e) {
        setMyFile(e.target.files[0]);
        console.log(e.target.files[0].name);
        if(e.target.files.length > 0){
            if(tipoGiocoModifica === "QUIZ CON IMMAGINI"){
                setImageFile(URL.createObjectURL(e.target.files[0]));
            }
            if(tipoGiocoModifica === "QUIZ CON SUONI"){
                setAudioFile(URL.createObjectURL(e.target.files[0]));
            }
            if (tipoGiocoModifica === "QUIZ CON VIDEO") {
                console.log("stampo il file per vedere il formato",e.target.files[0]);
                setVideoFile(URL.createObjectURL(e.target.files[0])); 
            }
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
        // else{
        //     alert("Si è verificato un errore! Riprova tra qualche minuto");
        // }
    }

    useEffect(() => {
        counter_CORRETTE = 1;
        counter_SBAGLIATE = 1;
        if(rispCorretta_2Modifica !== null && rispCorretta_2Modifica.trim().length > 0){
            counter_CORRETTE += 1;
        }
        if(rispCorretta_3Modifica!==null && rispCorretta_3Modifica.trim().length > 0){
            counter_CORRETTE += 1;
        }
        if(rispCorretta_4Modifica!==null && rispCorretta_4Modifica.trim().length > 0 ){
            counter_CORRETTE += 1;
        }
        if(rispSbagliata_2Modifica!==null && rispSbagliata_2Modifica.trim().length > 0 ){
            counter_SBAGLIATE += 1;
        }
        if(rispSbagliata_3Modifica!==null && rispSbagliata_3Modifica.trim().length > 0 ){
            counter_SBAGLIATE += 1;
        }
        if(rispSbagliata_4Modifica!==null && rispSbagliata_4Modifica.trim().length > 0){
            counter_SBAGLIATE += 1;
        }

        setTotalAnswers_CORRECT(counter_CORRETTE);
        setTotalAnswers_WRONG(counter_SBAGLIATE);
        // counter_CORRETTE = props.count_corrette;
        // counter_SBAGLIATE = props.count_sbagliate;
    }, []);


const setVideoFileHandler = (event) => {
   
   const fileInput = document.getElementById('videoFile');
   fileInput.click(); 
    
};




    function domandaChangeHandler(event){
        setDomandaModifica(event.target.value);
    }

    function suggerimentoChangeHandler(event){
        setSuggerimentoModifica(event.target.value)
    }

    function rispostaCorretta_1_ChangeHandler(event){
        setRispCorretta_1Modifica(event.target.value)
    }
    function rispostaCorretta_2_ChangeHandler(event){
        setRispCorretta_2Modifica(event.target.value)
    }
    function rispostaCorretta_3_ChangeHandler(event){
        setRispCorretta_3Modifica(event.target.value)
    }
    function rispostaCorretta_4_ChangeHandler(event){
        setRispCorretta_4Modifica(event.target.value)
    }

    function rispostaSbagliata_1_ChangeHandler(event){
        setRispSbagliata_1Modifica(event.target.value)
    }
    function rispostaSbagliata_2_ChangeHandler(event){
        setRispSbagliata_2Modifica(event.target.value)
    }
    function rispostaSbagliata_3_ChangeHandler(event){
        setRispSbagliata_3Modifica(event.target.value)
    }
    function rispostaSbagliata_4_ChangeHandler(event){
        setRispSbagliata_4Modifica(event.target.value)
    }

    function aggiungiAlternativaCorretta(){
        if(totalAnswers_CORRECT < 4){
            counter_CORRETTE += 1;
            setTotalAnswers_CORRECT(counter_CORRETTE);
        }
        console.log(counter_CORRETTE);
    }

    function rimuoviAlternativaCorretta() {
        setTotalAnswers_CORRECT(prevState => {
            if (prevState > 1) {
               
                if (prevState === 2) setRispCorretta_2Modifica("");
                if (prevState === 3) setRispCorretta_3Modifica("");
                if (prevState === 4) setRispCorretta_4Modifica("");
                return prevState - 1;
            }
            return prevState;
        });
    }

    function aggiungiAlternativaSbagliata(){
        if(totalAnswers_WRONG < 4){
            counter_SBAGLIATE += 1;
            setTotalAnswers_WRONG(counter_SBAGLIATE);
        }
        console.log(counter_SBAGLIATE);
    }

    function rimuoviAlternativaSbagliata() {
        setTotalAnswers_WRONG(prevState => {
            if (prevState > 1) {
              
                if (prevState === 2) setRispSbagliata_2Modifica("");
                if (prevState === 3) setRispSbagliata_3Modifica("");
                if (prevState === 4) setRispSbagliata_4Modifica("");
                return prevState - 1;
            }
            return prevState;
        });
    }

    function verificaInput(){
        let valore_DOMANDA = true;
        let valore_CATEGORIA = true;
        let valore_CORRETTE = true;
        let valore_SBAGLIATE = true;
        let valore_FILE = true;

        if(domandaModifica.trim().length === 0){
            setValidDomanda(false);
            valore_DOMANDA = false;
        }
        else{
            setValidDomanda(true)
            valore_DOMANDA = true
        }

       

        if(tipoGiocoModifica === "QUIZ" || tipoGiocoModifica === "QUIZ CON IMMAGINI"){
            if(rispCorretta_1Modifica.trim().length === 0 && rispCorretta_2Modifica.trim().length === 0 && rispCorretta_3Modifica.trim().length === 0 && rispCorretta_4Modifica.trim().length === 0){
                setValidCorrette(false);
                valore_CORRETTE = false;
            }
            else{
                setValidCorrette(true);
                valore_CORRETTE = true
            }
            if(rispSbagliata_1Modifica.trim().length === 0 && rispSbagliata_2Modifica.trim().length === 0 && rispSbagliata_3Modifica.trim().length === 0 && rispSbagliata_4Modifica.trim().length === 0){
                setValidSbagliate(false);
                valore_SBAGLIATE = false;
            }
            else{
                setValidSbagliate(true)
                valore_SBAGLIATE = true;
            }
        }

        // if(tipoGiocoModifica === "QUIZ CON IMMAGINI"){
        //     if(myFile){
        //         setValidImage(true)
        //         valore_FILE = true
        //     }
        //     else{
        //         setValidImage(false)
        //         valore_FILE = false
        //     }
        // }

        if(tipoGiocoModifica === "COMPLETA LA PAROLA"){
            valore_CORRETTE = true;
            valore_SBAGLIATE = true;
            valore_FILE = true;
        }

        if(!valore_DOMANDA  || !valore_CORRETTE || !valore_SBAGLIATE){
            console.log("DOMANDA = " + valore_DOMANDA)
         
            console.log("CORRETTE = " + valore_CORRETTE)
            console.log("SBAGLIATE = " + valore_SBAGLIATE)
            console.log("FILE = " + valore_FILE)
            return false
        }
        else{
            return true
        }
    }

    function salvaDomanda(){
        console.log("vedo se entra per salvare");
        let risultato = verificaInput();
        console.log("dopo la validazione restituisce ",risultato);
        if(risultato){
            var modified_question;
            var correct_answers = {};
            var wrong_answers = {};
console.log("stampo le risposte modificate",rispCorretta_1Modifica,rispCorretta_2Modifica,rispCorretta_3Modifica,rispCorretta_4Modifica)
            if(rispCorretta_1Modifica!==null && rispCorretta_1Modifica.trim().length > 0){
                correct_answers["correct_answer_n1"] = rispCorretta_1Modifica;
            }
            else{
                correct_answers["correct_answer_n1"] = "";
            }
            if(rispCorretta_2Modifica!==null &&   rispCorretta_2Modifica.trim().length > 0){
                correct_answers["correct_answer_n2"] = rispCorretta_2Modifica;
            }
            else{
                correct_answers["correct_answer_n2"] = "";
            }
            if(rispCorretta_3Modifica!==null && rispCorretta_3Modifica.trim().length > 0){
                correct_answers["correct_answer_n3"] = rispCorretta_3Modifica;
            }
            else{
                correct_answers["correct_answer_n3"] = "";
            }
            if(rispCorretta_4Modifica!==null && rispCorretta_4Modifica.trim().length > 0){
                correct_answers["correct_answer_n4"] = rispCorretta_4Modifica;
            }
            else{
                correct_answers["correct_answer_n4"] = "";
            }
    
            if(rispSbagliata_1Modifica!==null && rispSbagliata_1Modifica.trim().length > 0){
                wrong_answers["wrong_answer_n1"] = rispSbagliata_1Modifica;
            }
            else{
                wrong_answers["wrong_answer_n1"] = "";
            }
            if(rispSbagliata_2Modifica!==null && rispSbagliata_2Modifica.trim().length > 0){
                wrong_answers["wrong_answer_n2"] = rispSbagliata_2Modifica;
            }
            else{
                wrong_answers["wrong_answer_n2"] = "";
            }
            if(rispSbagliata_3Modifica!==null && rispSbagliata_3Modifica.trim().length > 0){
                wrong_answers["wrong_answer_n3"] = rispSbagliata_3Modifica;
            }
            else{
                wrong_answers["wrong_answer_n3"] = "";
            }
            if(rispSbagliata_4Modifica!==null && rispSbagliata_4Modifica.trim().length > 0){
                wrong_answers["wrong_answer_n4"] = rispSbagliata_4Modifica;
            }
            else{
                wrong_answers["wrong_answer_n4"] = "";
            }
console.log("risposte corrette",correct_answers);    
console.log("risposte sbagliate",wrong_answers);    
            if(tipoGiocoModifica === "QUIZ"){
                modified_question = {
                    domanda: domandaModifica,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    ID: ID
                }
            }
    
            if(tipoGiocoModifica === "QUIZ CON IMMAGINI" || tipoGiocoModifica === "QUIZ CON SUONI" || tipoGiocoModifica === "QUIZ CON VIDEO"){
                var qualeImg;
    
                if(!myFile){
                    qualeImg = props.immagine;
                }
                else if(!selezionaMediaBox){
                    qualeImg = myFile.name;
                }else{
                    qualeImg=myFile;
                }
                modified_question = {
                    domanda: domandaModifica,
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    immagine: qualeImg,
                    ID: ID
                }
               console.log("quale immagine", modified_question.immagine);
    
                uploadImage();
    
            }
    
            if(tipoGiocoModifica === "COMPLETA LA PAROLA"){
                modified_question = {
                    domanda: domandaModifica.toUpperCase(),
                    rispCorrette: correct_answers,
                    rispSbagliate: wrong_answers,
                    suggerimento: suggerimentoModifica,
                    ID: ID
                }
            }
    
            game_ctx.salvaDomandaModificata(modified_question, ID);
            alert('Domanda modificata con successo!')
            props.chiudiFormModificaDomanda();
        }
        else{
            console.log("ERRORE")
        }        
    }

    return(
        <>
            <h1 className={styles.title_scheda}>Modifica domanda</h1>
    
            <div className={styles.wrapper_impostazioni_gioco}>
               
                <label className={styles.label_style}>Tipo di gioco</label>
                <input className={styles.textbox_style_NOT_ALLOWED} type="text" value={tipoGiocoModifica} readOnly></input>
    
                {tipoGiocoModifica !== "QUIZ" && tipoGiocoModifica !== "COMPLETA LA PAROLA" && (
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

{tipoGiocoModifica !== "QUIZ" && tipoGiocoModifica !== "COMPLETA LA PAROLA" && selezionaMediaBox && (
    <div>
        <label className={styles.label_style}>Seleziona un Paziente</label>
        <div>    
            
            {pazienti.length > 0 && (
                <>
                    <select
                    id="dropbox"
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


                {tipoGiocoModifica === "QUIZ" && 
                    <>
                        <label className={styles.label_style}>Domanda: </label>
                        <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" value={domandaModifica} onChange={domandaChangeHandler}></input>
                    </>
                }
    
    {tipoGiocoModifica === "QUIZ CON IMMAGINI" && (
    <>
       
        {!selezionaMediaBox && (
            <>
                <input 
                    type="file" 
                    name="mfile" 
                    id="mfile" 
                    onChange={setFile} 
                    style={{ display: 'none' }} 
                />
                <button onClick={selectFile}>{"Select file"}</button>
            </>
        )}

        
        <img className={styles.preview_image} src={imageFile} alt="Preview" />

     
        <label className={styles.label_style}>Domanda: </label>
        <input 
            className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} 
            type="text" 
            value={domandaModifica} 
            onChange={domandaChangeHandler} 
        />
    </>
)}

{tipoGiocoModifica === "QUIZ CON SUONI" && (
    <>
        
        {!selezionaMediaBox && (
            <>
                <input 
                    type="file" 
                    name="mfile" 
                    id="mfile" 
                    onChange={setFile} 
                    style={{ display: 'none' }} 
                />
                <button onClick={selectFile}>{"Select file"}</button>
            </>
        )}
        
       
        <audio controls={true} src={audioFile}></audio>
        
      
        <label className={styles.label_style}>Inserisci domanda: </label>
        <input 
            className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} 
            type="text" 
            value={domandaModifica} 
            onChange={domandaChangeHandler} 
        />
    </>
)}

                {tipoGiocoModifica === "COMPLETA LA PAROLA" && 
                    <>
                        <label className={styles.label_style}>Parola da indovinare: </label>
                        <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" value={domandaModifica} onChange={domandaChangeHandler}></input>
                        <label className={styles.label_style}>Inserisci suggerimento: </label>
                        <input className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} type="text" value={suggerimentoModifica} onChange={suggerimentoChangeHandler}></input>
                    </>
                }
    
                
                {tipoGiocoModifica === "QUIZ CON VIDEO" && (
    <>
      
        {!selezionaMediaBox && (
            <>
                <input 
                    type="file" 
                    name="videoFile" 
                    id="videoFile" 
                    onChange={setFile} 
                    style={{ display: 'none' }} 
                />
                <button onClick={setVideoFileHandler}>{"Seleziona video"}</button>
            </>
        )}
        
        
        {videoFile && (
            <video controls width="320" height="240">
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video element.
            </video>
        )}
        
        
        <label className={styles.label_style}>Inserisci domanda: </label>
        <input 
            className={`${styles.textbox_style} ${!validDomanda ? styles.invalid : ""}`} 
            type="text" 
            value={domandaModifica} 
            onChange={domandaChangeHandler} 
        />
    </>
)}


    
                {!validDomanda && <div style={{width: "100%", color: "red", textAlign: "center"}}>La domanda non può essere vuota</div>}
    
                {(tipoGiocoModifica === "QUIZ" || tipoGiocoModifica === "QUIZ CON IMMAGINI" || tipoGiocoModifica === "QUIZ CON SUONI" || tipoGiocoModifica === "QUIZ CON VIDEO" ) &&
                    <>
                        <div className={styles.wrapper_generico}>
                            <div className={styles.wrapper_items}>
                                <label className={styles.label_style}>Risposta Corretta: </label>
                                <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" value={rispCorretta_1Modifica} onChange={rispostaCorretta_1_ChangeHandler}></input>
    
                                {totalAnswers_CORRECT > 1 &&
                                    <>
                                        <label className={styles.label_style}>Risposta Corretta: </label>
                                        <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" value={rispCorretta_2Modifica} onChange={rispostaCorretta_2_ChangeHandler}></input>
                                    </>
                                }
    
                                {totalAnswers_CORRECT > 2 &&
                                    <>
                                        <label className={styles.label_style}>Risposta Corretta: </label>
                                        <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" value={rispCorretta_3Modifica} onChange={rispostaCorretta_3_ChangeHandler}></input>
                                    </>
                                }
    
                                {totalAnswers_CORRECT > 3 &&
                                    <>
                                        <label className={styles.label_style}>Risposta Corretta: </label>
                                        <input className={`${styles.textbox_style_RISPOSTE} ${!validCorrette ? styles.invalid : ""}`} type="text" value={rispCorretta_4Modifica} onChange={rispostaCorretta_4_ChangeHandler}></input>
                                    </>
                                }
                                {!validCorrette && <div style={{width: "100%", color: "red", textAlign: "center"}}>Devi inserire almeno una risposta corretta</div>}

                                <div className={styles.wrapper_flexible}>
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
                                <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" value={rispSbagliata_1Modifica} onChange={rispostaSbagliata_1_ChangeHandler}></input>

                                {totalAnswers_WRONG > 1 &&
                                    <>
                                        <label className={styles.label_style}>Risposta Sbagliata 2: </label>
                                        <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" value={rispSbagliata_2Modifica} onChange={rispostaSbagliata_2_ChangeHandler}></input>
                                    </>
                                }

                                {totalAnswers_WRONG > 2 &&
                                    <>
                                        <label className={styles.label_style}>Risposta Sbagliata 3: </label>
                                        <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" value={rispSbagliata_3Modifica} onChange={rispostaSbagliata_3_ChangeHandler}></input>
                                    </>
                                }

                                {totalAnswers_WRONG > 3 &&
                                    <>
                                        <label className={styles.label_style}>Risposta Sbagliata 4: </label>
                                        <input className={`${styles.textbox_style_RISPOSTE} ${!validSbagliate ? styles.invalid : ""}`} type="text" value={rispSbagliata_4Modifica} onChange={rispostaSbagliata_4_ChangeHandler}></input>
                                    </>
                                }
                                {!validSbagliate && <div style={{width: "100%", color: "red", textAlign: "center"}}>Devi inserire almeno una risposta sbagliata</div>}

                                <div className={styles.wrapper_flexible}>
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
                        <hr className={styles.horizontal_line}></hr>
                        
                    </>
                }



              
<div className={styles.mediaContainer}>
    <hr className={styles.horizontal_line} />

    {tipoGiocoModifica === "QUIZ" || tipoGiocoModifica === "COMPLETA LA PAROLA" || !selezionaMediaBox ? null : (() => {
      
        const mediaArray = Array.isArray(media) ? media : [];

        
        const gameTypeMapping = {
            "QUIZ CON SUONI": "audio",
            "QUIZ CON AUDIO": "audio",
            "QUIZ CON IMMAGINI": "immagine",
            "QUIZ CON VIDEO": "video",
        };

        
        const requiredMediaType = gameTypeMapping[tipoGiocoModifica] || tipoGiocoModifica.toLowerCase();

        
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



                <div className={styles.wrapper_flexible}>
                    <GenericButton
                        onClick={salvaDomanda}
                        generic_button={true}
                        buttonText={"Salva modifiche"}
                    >
                    </GenericButton>

                    <GenericButton
                        onClick={props.chiudiFormModificaDomanda}
                        generic_button={true}
                        red_styling
                        buttonText={"Torna alla lista"}
                    >
                    </GenericButton>
                </div>
            </div>
        </>
        
    );
}

export default EditDomanda;