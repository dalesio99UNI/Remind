import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from './AddPaziente.module.css';
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import PatientContext from "../../context/patients-context";
import CardSmall from "../UI/CardSmall";

import DeleteButton from "../UI/DeleteButton";
import { Accordion, Collapse, Modal } from "react-bootstrap";
import EditButton from "../UI/EditButton";

function AddPaziente(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);
    

    var emailEsistente = null;

    const [stepAggiuntaPaziente, setStepAggiuntaPaziente] = useState(1);

    const [validNome, setValidNome] = useState(true);
    const [enteredNome, setEnteredNome] = useState('');

    const [validCognome, setValidCognome] = useState(true);
    const [enteredCognome, setEnteredCognome] = useState('');

    const [validCittà, setValidCittà] = useState(true);
    const [enteredCittà, setEnteredCittà] = useState('');

    const [validData, setValidData] = useState(true);
    const [enteredData, setEnteredData] = useState('');
    const [errorMinData, setErrorMinData] = useState(false)

    const [validCF, setValidCF] = useState(true);
    const [enteredCF, setEnteredCF] = useState('');

    const [validContattoEmail, setValidContattoEmail] = useState(true);
    const [contattoEmail, setContattoEmail] = useState('');

    const [validContattoCellulare, setValidContattoCellulare] = useState(true);
    const [contattoCellulare, setContattoCellulare] = useState('');

    const [patologiaSelezionata, setPatologiaSelezionata] = useState("");
    const [patologiaSelezionataOggetto, setPatologiaSelezionataOggetto] = useState({});

    const [terapiaSelezionata, setTerapiaSelezionata] = useState();
    const [showFormAddTherapy, setShowFormAddTherapy] = useState(false);

    const [countTerapie, setCountTerapie] = useState(1);
    const [terapiaDaModificare, setTerapiaDaModificare] = useState("");
    const [validTerapia, setValidTerapia] = useState(true);
    const [noteDaModificare, setNoteDaModificare] = useState("")

    const [dataInizioTerapia, setDataInizioTerapia] = useState("");
    const [dataFineTerapia, setDataFineTerapia] = useState("");

    const [stringaPrescrittaDa, setStringaPrescrittaDa] = useState("");
    const [validStringaPrescrittaDa, setValidStringaPrescrittaDa] = useState(true);

    const [informazioniMediche, setInformazioniMediche] = useState([]);
    const [ID_modificaTerapia, setID_modificaTerapia] = useState();
    const [modaleAggiungiTerapia, setModaleAggiungiTerapia] = useState(false);
    const [modaleModificaTerapia, setModaleModificaTerapia] = useState(false);

    const [modaleCreazioneAccount, setModaleCreazioneAccount] = useState(false);
    const [credenzialiInserite, setCredenzialiInserite] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [errorEmailMsg, setErrorEmailMsg] = useState("");
    const [enteredPsw, setEnteredPsw] = useState('');
    const [validPsw, setValidPsw] = useState(true);

    useEffect(() => {
        setPatologiaSelezionata("");
      
        setDataInizioTerapia("");
        setDataFineTerapia("");
    }, [informazioniMediche])

    const stepSuccessivo = () => {
        var dateee = new Date(enteredData);

        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();

        let dateString = `${year}-${month}-${day}`;

        switch(stepAggiuntaPaziente){
            case 1:
                
                if(stepAggiuntaPaziente === 1){
                    if(enteredNome.trim().length < 1 
                    || enteredCognome.trim().length < 1 
                    || enteredCittà.trim().length < 1 
                    || isNaN(dateee) || dateString < "1870-01-01"
                    || enteredCF.trim().length < 16 || enteredCF.trim().length > 16
                    // || contattoCellulare.trim().length < 8
                    // || !contattoEmail.includes('@')
                    ){
                        if(enteredNome.trim().length < 1){
                            setValidNome(false);
                            // console.log(validNome);
                        }
                        else{
                            setValidNome(true);
                        }
                        if(enteredCognome.trim().length < 1){
                            setValidCognome(false);
                        }
                        else{
                            setValidCognome(true);
                        }
                        if(enteredCittà.trim().length < 1){
                            setValidCittà(false);
                        }
                        else{
                            setValidCittà(true);
                        }
                        if(isNaN(dateee)){
                            setValidData(false);
                        }
                        else if(dateString < "1870-01-01"){
                            setValidData(false);
                            setErrorMinData(true);
                        }
                        else{
                            setValidData(true);
                        }
                        if(enteredCF.trim().length < 16 || enteredCF.trim().length > 16){
                            setValidCF(false);
                        }
                        else{
                            setValidCF(true);
                        }
                        // if(contattoCellulare.trim().length < 8){
                        //     setValidContattoCellulare(false);
                        // }
                        // else{
                        //     setValidContattoCellulare(true);
                        // }
                        // if(!contattoEmail.includes('@')){
                        //     setValidContattoEmail(false);
                        // }
                        // else{
                        //     setValidContattoEmail(true);
                        // }
                }
                else{
                    var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
                    var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
                    var year = dateee.getFullYear();
            
                    let dateString = `${year}-${month}-${day}`;
                    setEnteredData(dateString);
                    setStepAggiuntaPaziente((nextStep) => (nextStep + 1))
                }
            }
            break;
        case 2:
            setStepAggiuntaPaziente((nextStep) => (nextStep + 1));
            break;
        }
        
    }

    const stepPrecedente = () => {
        setStepAggiuntaPaziente((prevStep) => (prevStep - 1))
    }

    const nomeChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredNome(event.target.value);
        setValidNome(true);
    }

    const cognomeChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredCognome(event.target.value);
        setValidCognome(true);
    }

    const cittàChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredCittà(event.target.value);
        setValidCittà(true);
    }

    const dataNascitaChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredData(event.target.value);
        setValidData(true);
        setErrorMinData(false);
    }
    
    const CFChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredCF(event.target.value);
        setValidCF(true);
    }
    const contattoEmailChangeHandler = (event) => {
        console.log(event.target.value);
        setContattoEmail(event.target.value);
        setValidContattoEmail(true);
    }
    const contattoCellulareChangeHandler = (event) => {
        console.log(event.target.value);
        setContattoCellulare(event.target.value);
        setValidContattoCellulare(true);
    }

   

    

    
    function stringaPrescrittaDaChangeHandler(event){
        setStringaPrescrittaDa(event.target.value);
        setValidStringaPrescrittaDa(true);
    }
    
  

   

    const eliminaOggettoMedico = (id) => {
        let arrayTemporaneo = [];

        informazioniMediche.map((oggettoMedico) => {
            if(oggettoMedico.terapiaID !== id){
                arrayTemporaneo.push(oggettoMedico)
            }
        })
        setInformazioniMediche(arrayTemporaneo);
    }

    const emailChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredEmail(event.target.value);
        setValidEmail(true);
        setContattoEmail(event.target.value);
    }

    const pswChangeHandler = (event) => {
        console.log(event.target.value);
        setEnteredPsw(event.target.value);
        setValidPsw(true);
    }

    async function formSubmitHandler(){
        const datiPaziente = {
            doct_UID: auth_ctx.utenteLoggatoUID,
            nome: enteredNome,
            cognome: enteredCognome,
            city: enteredCittà,
            codiceFiscale: enteredCF.toUpperCase(),
            dataNascita: enteredData,
            contattoEmail: contattoEmail,
            contattoCellulare: contattoCellulare,
            informazioniMediche: informazioniMediche
        };

        
        let pazienteSalvatoID;
        pazienteSalvatoID = await getServerMgr().addPaziente(
            datiPaziente.doct_UID, datiPaziente.nome, datiPaziente.cognome, datiPaziente.city, datiPaziente.codiceFiscale, datiPaziente.dataNascita, datiPaziente.contattoEmail, datiPaziente.contattoCellulare, datiPaziente.informazioniMediche
        );
        console.log("pazienteID--> " + pazienteSalvatoID.pazienteID);

        if(validEmail && validPsw && pazienteSalvatoID && modaleCreazioneAccount){
            // setModaleCREAZIONEUTENTE(true);
            creaAccountPaziente(pazienteSalvatoID.pazienteID);

        }
        
        if(!modaleCreazioneAccount){
            patients_ctx.nuovoPazienteHandler();
        }
        
    }

    async function creaAccountPaziente(pazienteID){
        let result;
        result = await getServerMgr().getAccount()
        .then(console.log(result))
        .catch((err) => {
            console.error(err);
        });

        if(result !== undefined && result!=null){
            for(var i=0; i < result.length; i++){
                if(result[i].email === enteredEmail){
                    emailEsistente = true;
                    setValidEmail(false)
                    setErrorEmailMsg("Email già associata ad un account!");
                    alert("Email già associata ad un account!");
                    break;
                }
                else{
                    emailEsistente = false;
                }
            }
            if(!emailEsistente){
                let result2;
                result2 = await getServerMgr().addAccount(enteredNome, enteredCognome, 2, enteredEmail, enteredPsw, pazienteID)
                .then(alert("ACCOUNT CREATO!"))
                .catch((err) => {
                    console.error(err);
                });

                console.log(result2)
               /* await getServerMgr().updatePatientWithProfileID(result2, pazienteID,enteredEmail)
                .catch((err) => {
                    console.error(err);
                });
*/
                patients_ctx.nuovoPazienteHandler();
            }
        }
        else{
            let result2;
            result2 = await getServerMgr().addAccount(enteredNome, enteredCognome, 2, enteredEmail, enteredPsw, pazienteID)
            .then(alert("ACCOUNT CREATO!"))
            .catch((err) => {
                console.error(err);
            })

            console.log(result2)
            /*
            await getServerMgr().updatePatientWithProfileID(result2, pazienteID,enteredEmail)
            .catch((err) => {
                console.error(err);
            });
*/
            patients_ctx.nuovoPazienteHandler();
        }  

        return
    }

    function hideForm(event){
        event.preventDefault();
        props.hideFormNewPaziente();
    }

    function validateForm(bool_crea_account){
        let validate_email = true;
        let validate_password = true;

        if(!bool_crea_account){
            formSubmitHandler();
        }
        else{
            if(!enteredEmail.includes('@')){
                setValidEmail(false);
                setErrorEmailMsg("Inserisci una email valida")
                validate_email = false;
            }
            if(enteredPsw.trim().length <= 5){
                setValidPsw(false);
                validate_password = false;
            }
            if(validate_email && validate_password){
                formSubmitHandler();
            }
        }
    }

    return(
        <div className={styles.center_form}>
            {stepAggiuntaPaziente === 1 && 
            <div className={styles.wrapper_step1}>
                <h1 className={styles.title_form}>Anagrafica</h1>
                <div className={styles.wrapper_vertical}>
                    
                    <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Nome:</label>
                    <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={enteredNome} onChange={nomeChangeHandler}></input>
                    {!validNome && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un nome valido</div>}

                    <label className={`${styles.label_style} ${!validCognome ? styles.invalid : ""}`}>Cognome:</label>
                    <input className={`${styles.input_style} ${!validCognome ? styles.invalid : ""}`} type="text" value={enteredCognome} onChange={cognomeChangeHandler}></input>
                    {!validCognome && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un cognome valido</div>}

                    <label className={`${styles.label_style} ${!validCittà ? styles.invalid : ""}`}>Città di nascita:</label>
                    <input className={`${styles.input_style} ${!validCittà ? styles.invalid : ""}`} type="text" value={enteredCittà} onChange={cittàChangeHandler}></input>
                    {!validCittà && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una città esistente</div>}

                    <label className={`${styles.label_style} ${!validData ? styles.invalid : ""}`}>Data di nascita:</label>
                    <input className={`${styles.input_style} ${!validData ? styles.invalid : ""}`} type="date" min={"1870-01-01"} max="31-31-2400" value={enteredData} onChange={dataNascitaChangeHandler}></input>
                    {!validData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una data valida</div>}
                    {errorMinData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Non puoi inserire una data antecedente al 01-01-1870</div>}

                    <label className={`${styles.label_style} ${!validCF ? styles.invalid : ""}`}>Codice Fiscale:</label>
                    <input className={`${styles.input_style} ${!validCF ? styles.invalid : ""}`} type="text" value={enteredCF} onChange={CFChangeHandler}></input>
                    {!validCF && <div style={{width: "100%", color: "red", textAlign: "center"}}>Il codice fiscale deve contenere 16 caratteri</div>}

                </div>

                

              
                <div className={styles.horizontal}>
                    <GenericButton
                        onClick={hideForm}
                        generic_button={true}
                        red_styling
                        buttonText='Indietro'>
                    </GenericButton>
                    <GenericButton 
                        onClick={(event) => {
                            event.preventDefault();
                            stepSuccessivo();
                        }}
                        generic_button={true}
                        buttonText='Avanti'>
                    </GenericButton>

                </div>
                
            </div>
            }

           

            {stepAggiuntaPaziente === 2 &&
            <div className={styles.wrapper_step1}>
                <div className={styles.wrapper_vertical}>
                    {/* <section className={styles.section_style_FORM}> */}
                        <h3 className={styles.title_form}>Account per il paziente</h3>
                        <h5 className="intestazione">Se vuoi creare subito un account per il paziente, clicca sul pulsante 'Crea account' ed inserisci i dati richiesti.</h5>
                        <div style={{width: "100%"}} className={styles.horizontal}>
                            <GenericButton 
                                onClick={() => {setModaleCreazioneAccount(true)}}
                                generic_button={true}
                                buttonText='Crea account'>
                            </GenericButton>
                        </div>
                        
                        <h5 className="intestazione">Altrimenti puoi salvare subito il paziente e creare un account successivamente andando sulla scheda del paziente</h5>

                        <Modal centered show={modaleCreazioneAccount}>
                            <Modal.Header style={{fontWeight: "bold"}}>Creazione account paziente</Modal.Header>
                            <Modal.Body>
                                <label className={`${styles.label_style} ${!validEmail ? styles.invalid : ""}`}>Email:</label>
                                <input className={`${styles.input_style} ${!validEmail ? styles.invalid : ""}`} type="email" value={enteredEmail} onChange={emailChangeHandler}></input>
                                {!validEmail && <div style={{width: "100%", color: "red", textAlign: "center"}}>{errorEmailMsg}</div>}

                                <label className={`${styles.label_style} ${!validPsw ? styles.invalid : ""}`}>Password:</label>
                                <input className={`${styles.input_style} ${!validPsw ? styles.invalid : ""}`} type="text" value={enteredPsw} onChange={pswChangeHandler}></input>
                                {!validPsw && <div style={{width: "100%", color: "red", textAlign: "center"}}>La password deve contenere minimo 6 caratteri</div>}
                                <p className={styles.paragraph_style}><b>Attenzione! </b>
                                    Queste credenziali serviranno al paziente per potersi collegare alla piattaforma e svolgere attività. Se inserite, verrà creato un profilo per il paziente
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <GenericButton
                                    onClick={() => {setModaleCreazioneAccount(false)}}
                                    generic_button={true}
                                    red_styling
                                    buttonText='Annulla'>
                                </GenericButton>
                                <GenericButton 
                                    onClick={() => {validateForm(true)}} 
                                    generic_button={true}
                                    buttonText='Salva paziente'>
                                </GenericButton>
                            </Modal.Footer>
                        </Modal>
                        
                        <p className={styles.paragraph_style}></p>

                    {/* </section> */}
                </div>
                <div className={styles.horizontal}>
                    <GenericButton
                        onClick={stepPrecedente}
                        generic_button={true}
                        red_styling
                        buttonText='Indietro'>
                    </GenericButton>
                    <GenericButton 
                        onClick={() => {validateForm(false)}} 
                        generic_button={true}
                        buttonText='Salva senza account'>
                    </GenericButton>
                    {/* <GenericButton 
                        onClick={formSubmitHandler} 
                        generic_button={true}
                        buttonText='Salva paziente'>
                    </GenericButton> */}
                </div>
                
            </div>
            }
            

            {/* <hr className={styles.horizontal_line}></hr> */}

            
        </div>
    );
}
export default AddPaziente;