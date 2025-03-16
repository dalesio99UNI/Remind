import { useContext, useEffect, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./EditPaziente.module.css";
import PatientContext from "../../context/patients-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";

import CardSmall from "../UI/CardSmall";
import DeleteButton from "../UI/DeleteButton";
import { Accordion, Collapse, Modal, Row, Tab, Tabs } from "react-bootstrap";
import GameContext from "../../context/game-context";
import EditButton from "../UI/EditButton";

function EditPaziente(props){
    const patients_ctx = useContext(PatientContext);
   
    const game_ctx = useContext(GameContext);

    const [listaGiochi, setListaGiochi] = useState(game_ctx.listaGiochi);

    const [visualizzaSchermata, setVisualizzaSchermata] = useState("DATI_PERSONALI");

    const [validNome, setValidNome] = useState(true);
    const [nomeModifica, setNomeModifica] = useState(props.nomeee);

    const [validCognome, setValidCognome] = useState(true);
    const [cognomeModifica, setCognomeModifica] = useState(props.cognomeee);

    const [validCittà, setValidCittà] = useState(true);
    const [cittàModifica, setCittàModifica] = useState(props.cittààà);

    const [validData, setValidData] = useState(true);
    const [dataModifica, setDataModifica] = useState(props.dataaa);
    const [errorMinData, setErrorMinData] = useState(false)

    const [validCF, setValidCF] = useState(true);
    const [CFModifica, setCFModifica] = useState(props.cfff);

    const [validContattoEmail, setValidContattoEmail] = useState(true);
    const [contattoEmail, setContattoEmail] = useState(props.contattoEmail);

    const [validContattoCellulare, setValidContattoCellulare] = useState(true);
    const [contattoCellulare, setContattoCellulare] = useState(props.contattoCellulare);

    const [countTerapie, setCountTerapie] = useState(1);
    const [terapiaDaModificare, setTerapiaDaModificare] = useState("");
    const [validTerapia, setValidTerapia] = useState(true);
    const [noteDaModificare, setNoteDaModificare] = useState("")

    const [patologiaSelezionata, setPatologiaSelezionata] = useState("");
    const [patologiaSelezionataOggetto, setPatologiaSelezionataOggetto] = useState({});

    const [terapiaSelezionata, setTerapiaSelezionata] = useState();
    const [showFormAddTherapy, setShowFormAddTherapy] = useState(false);

    const [dataInizioTerapia, setDataInizioTerapia] = useState("");
    const [dataFineTerapia, setDataFineTerapia] = useState("");

    const [stringaPrescrittaDa, setStringaPrescrittaDa] = useState("");
    const [validStringaPrescrittaDa, setValidStringaPrescrittaDa] = useState(true);

    const [informazioniMediche, setInformazioniMediche] = useState([]);
    const [ID_modificaTerapia, setID_modificaTerapia] = useState();
    const [modaleAggiungiTerapia, setModaleAggiungiTerapia] = useState(false);
    const [modaleModificaTerapia, setModaleModificaTerapia] = useState(false);
    const [modaleEliminaTerapia, setModaleEliminaTerapia] = useState(false);
    const [giochiDelPaziente, setGiochiDelPaziente] = useState([]);
    const [modaleListaGiochi, setModaleListaGiochi] = useState(false);
    const [checkboxAllGamesAssigned, setCheckboxAllGamesAssigned] = useState(true);

    useEffect(() => {
        let arrayTemporaneo = [];
        let assegnatoBool = false;

        listaGiochi.map((gioco) => {
            for(var i=0; i < props.giochiii?.length; i++){
                if(gioco.gameID === props.giochiii[i].gameID){
                    assegnatoBool = true;
                    setCheckboxAllGamesAssigned(true);
                    break;
                }
                else{
                    assegnatoBool = false;
                    setCheckboxAllGamesAssigned(false);
                }
            }
            arrayTemporaneo.push({...gioco, assegnato: assegnatoBool})
        })
        console.log(arrayTemporaneo)
        setListaGiochi(arrayTemporaneo);
    }, [])
    
    useEffect(() => {
        for(var i=0; i < listaGiochi.length; i++){
            if(listaGiochi[i].assegnato){
                setCheckboxAllGamesAssigned(true)
                // console.log("SI")
                // console.log(listaGiochi[i].assegnato)
            }
            else{
                setCheckboxAllGamesAssigned(false);
                // console.log("no")
                // console.log(listaGiochi[i].assegnato)
                break;
            }
        }
        // console.log(checkboxAllGamesAssigned);
    }, [listaGiochi])

    useEffect(() => {
        let arrayTemporaneo = [];
        console.log("TEST")
        listaGiochi.map((gioco) => {
            if(gioco.assegnato){
                arrayTemporaneo.push(gioco)
            }
        })
        setGiochiDelPaziente(arrayTemporaneo)
    }, [listaGiochi])

    useEffect(() => {
        console.log(props.patologiaaa_1)
        if(props.patologiaaa_1?.length > 0){
            setInformazioniMediche(props.patologiaaa_1) 
            for(var i=0; i < props.patologiaaa_1.length; i++){
                setCountTerapie(props.patologiaaa_1[i].terapiaID + 1);
            }
        }
        else{
            setInformazioniMediche([]) 
        }
    }, [])
    useEffect(() => {
        // console.log(props.giochiii)
        if(props.giochiii?.length > 0){
            setGiochiDelPaziente(props.giochiii) 
        }
        else{
            setGiochiDelPaziente([]) 
        }   
    }, [])

  

    const selezionaSchermataVisualizzata = (stringa) => {
        // event.preventDefault();
        switch(stringa){
            case "DATI_PERSONALI":
                setVisualizzaSchermata("DATI_PERSONALI");
                break;
            case "SCHEDA_MEDICA":
                setVisualizzaSchermata("SCHEDA_MEDICA");
                break;
            case "GIOCHI":
                setVisualizzaSchermata("GIOCHI");
                break;
            default:
                break;
        }
      
    }

    const nomeChangeHandler = (event) => {
        console.log(event.target.value);
        setNomeModifica(event.target.value);
        // setValidNome(true);
    }

    const cognomeChangeHandler = (event) => {
        console.log(event.target.value);
        setCognomeModifica(event.target.value);
        setValidCognome(true);
    }

    const cittàChangeHandler = (event) => {
        console.log(event.target.value);
        setCittàModifica(event.target.value);
        setValidCittà(true);
    }

    const dataNascitaChangeHandler = (event) => {
        console.log(event.target.value);
        setDataModifica(event.target.value);
        setValidData(true);
        setErrorMinData(false);
    }
    
    const CFChangeHandler = (event) => {
        console.log(event.target.value);
        setCFModifica(event.target.value);
        setValidCF(true);
    }

    const contattoEmailChangeHandler = (event) => {
        console.log(event.target.value);
        setContattoEmail(event.target.value);
        setValidContattoEmail(true);
    }
    const contattoCellulareChangeHandler = (event) => {
        console.log("Questo è il numero di cellulare prima dell'inserimento",event.target.value);
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

    const verificaGiochiDelPaziente = (gioco) => {
        return(
            <div className={styles.modal_wrap_GIOCHI}>
                <div className={styles.modal_NOMEGIOCO}>{gioco.nomeGioco}</div>
                <div className={styles.modal_TIPOGIOCO}>{gioco.tipoGioco}</div>
                <div className={styles.modal_LIVELLOGIOCO}>{gioco.livelloGioco} </div>
                <input onChange={(event) => {assegnaGioco(gioco, event)}} checked={gioco.assegnato} type="checkbox"></input>
            </div>
        );
    }

    const assegnaGioco = (gioco, event) => {
        let arrayTemporaneo = []
        setListaGiochi(listaGiochi.map((giocoTemp) => (gioco.gameID === giocoTemp.gameID ? {...giocoTemp, assegnato: !giocoTemp.assegnato} : giocoTemp)))

    }

    const checkboxAssegnaTutti = (event) => {
        if(event.target.checked){
            setCheckboxAllGamesAssigned(true);
            setListaGiochi(listaGiochi.map((giocoTemp) => ({...giocoTemp, assegnato: true})))
        }
        else{
            setCheckboxAllGamesAssigned(false);
            setListaGiochi(listaGiochi.map((giocoTemp) => ({...giocoTemp, assegnato: false})))
        }
    }

    const eliminaGioco = (id) => {
        let arrayTemporaneo = [];

        giochiDelPaziente.map((gioco) => {
            if(gioco.gameID !== id){
                arrayTemporaneo.push(gioco)
            }
        })
        setGiochiDelPaziente(arrayTemporaneo);
    }

    async function formModifyHandler(event){
        event.preventDefault();

        var dateee = new Date(dataModifica);

        var day = dateee.toLocaleString('it-IT', {day: '2-digit'})
        var month = dateee.toLocaleString('it-IT', {month: '2-digit'})
        var year = dateee.getFullYear();

        let dateString = `${year}-${month}-${day}`;

        if(nomeModifica.trim().length < 1 
        || cognomeModifica.trim().length < 1 
        || cittàModifica.trim().length < 1 
        || isNaN(dateee) || dateString < "1870-01-01"
        || CFModifica.trim().length < 16 || CFModifica.trim().length > 16){
            if(nomeModifica.trim().length < 1){
                setValidNome(false);
                // console.log(validNome);
            }
            else{
                setValidNome(true);
            }
            if(cognomeModifica.trim().length < 1){
                setValidCognome(false);
            }
            else{
                setValidCognome(true);
            }
            if(cittàModifica.trim().length < 1){
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
            if(CFModifica.trim().length < 16 || CFModifica.trim().length > 16){
                setValidCF(false);
            }
            else{
                setValidCF(true);
            }
            return;
        }

        const datiPaziente = {
            nome: nomeModifica,
            cognome: cognomeModifica,
            city: cittàModifica,
            codiceFiscale: CFModifica.toUpperCase(),
            dataNascita: dateString,
            contattoEmail: contattoEmail,
            contattoCellulare: contattoCellulare,
            informazioniMediche: informazioniMediche,
            listaGiochi: giochiDelPaziente,
            ID: props.iddd
        };

        let pazienteSalvatoID;
        console.log("stampo il numero prima di inserirlo",datiPaziente.contattoCellulare);
        pazienteSalvatoID = await getServerMgr().updatePaziente(
            datiPaziente.nome, datiPaziente.cognome, datiPaziente.city, datiPaziente.codiceFiscale, datiPaziente.dataNascita, datiPaziente.contattoEmail, datiPaziente.contattoCellulare, 
            datiPaziente.informazioniMediche, datiPaziente.listaGiochi, datiPaziente.ID
        );
        // console.log("pazienteID--> " + pazienteSalvatoID)
        console.log("stampo la nuova lista giochi paziente",datiPaziente.listaGiochi);
        patients_ctx.modificaLista();
        alert("Dati del paziente modificati con successo")
    }

    return(
        <div className={styles.center_form}>
            <h1 className={styles.title_form}>Modifica dati del paziente: {props.nomeee} {props.cognomeee}</h1>
            <div style={{width:"100%"}}>
                <Tabs variant="underline" fill id="controlled-tab-example" activeKey={visualizzaSchermata} onSelect={(key) => {
                   
                    selezionaSchermataVisualizzata(key)
                }}
                >
                    <Tab eventKey={"DATI_PERSONALI"} title={"Dati personali"}>
                        <div className={styles.vertical}>
                            <h1 className={styles.subtext_form}>Anagrafica</h1>
                            <div className={styles.wrapper_DATI_PERSONALI}>
                                <label className={`${styles.label_style} ${!validNome ? styles.invalid : ""}`}>Nome:</label>
                                <input className={`${styles.input_style} ${!validNome ? styles.invalid : ""}`} type="text" value={nomeModifica} onChange={nomeChangeHandler}></input>
                                {!validNome && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un nome valido</div>}

                                <label className={`${styles.label_style} ${!validCognome ? styles.invalid : ""}`}>Cognome</label>
                                <input className={`${styles.input_style} ${!validCognome ? styles.invalid : ""}`} type="text" value={cognomeModifica} onChange={cognomeChangeHandler}></input>
                                {!validCognome && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un cognome valido</div>}

                                <label className={`${styles.label_style} ${!validCittà ? styles.invalid : ""}`}>Città di nascita:</label>
                                <input className={`${styles.input_style} ${!validCittà ? styles.invalid : ""}`} type="text" value={cittàModifica} onChange={cittàChangeHandler}></input>
                                {!validCittà && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una città esistente</div>}

                                <label className={`${styles.label_style} ${!validData ? styles.invalid : ""}`}>Data di nascita:</label>
                                <input className={`${styles.input_style} ${!validData ? styles.invalid : ""}`} type="date" min={"1870-01-01"} value={dataModifica} onChange={dataNascitaChangeHandler}></input>
                                {!validData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una data valida</div>}
                                {errorMinData && <div style={{width: "100%", color: "red", textAlign: "center"}}>Non puoi inserire una data antecedente al 01-01-1870</div>}

                                <label className={`${styles.label_style} ${!validCF ? styles.invalid : ""}`}>Codice Fiscale:</label>
                                <input className={`${styles.input_style} ${!validCF ? styles.invalid : ""}`} type="text" value={CFModifica} onChange={CFChangeHandler}></input>
                                {!validCF && <div style={{width: "100%", color: "red", textAlign: "center"}}>Il codice fiscale deve contenere 16 caratteri</div>}
                            </div>
                            <h1 style={{marginTop: "8px"}} className={styles.subtext_form}>Contatti</h1>
                            <div className={styles.wrapper_DATI_PERSONALI}>
                                <label style={{marginTop: "1px"}} className={`${styles.label_style} ${!validContattoEmail ? styles.invalid : ""}`}>Email:</label>
                                <input className={`${styles.input_style} ${!validContattoEmail ? styles.invalid : ""}`} type="text" value={contattoEmail} onChange={contattoEmailChangeHandler}></input>
                                {!validContattoEmail && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci una email valida</div>}

                                <label className={`${styles.label_style} ${!validContattoCellulare ? styles.invalid : ""}`}>Cellulare:</label>
                                <input className={`${styles.input_style} ${!validContattoCellulare ? styles.invalid : ""}`} type="number" value={contattoCellulare} onChange={contattoCellulareChangeHandler}></input>
                                {!validContattoCellulare && <div style={{width: "100%", color: "red", textAlign: "center"}}>Inserisci un numero telefonico valido</div>}
                            </div>
                        </div>
                        
                    </Tab>

                    

                    <Tab eventKey={"GIOCHI"} title={"Giochi"}>
                        <div className={styles.vertical}>
                            {/* <h2>Lista giochi</h2> */}
                            <div style={{width: "80%"}}>
                                <Accordion>
                                    <h2 className={styles.text_subtitle}>Giochi assegnati:</h2>
                                    {giochiDelPaziente.length === 0 &&
                                        <h2 className={styles.text_subtitle}>Nessun gioco assegnato.</h2>
                                    }
                                    {giochiDelPaziente.map((gioco) => (
                                        <Accordion.Item className={`${styles.accordion_item}`} eventKey={gioco.gameID}>
                                            <Accordion.Header>{gioco.nomeGioco}</Accordion.Header>
                                            <Accordion.Body>
                                            <div className={styles.wrapper_vertical}>
                                                <div className={styles.wrapper_horizontal}>
                                                    <label className={`${styles.sintesiMedica_label_PATOLOGIA}`}>Nome:</label>
                                                    <h5 className={`${styles.sintesiMedica_content_PATOLOGIA}`}>{gioco.nomeGioco}</h5>
                                                </div>
                                                <div className={styles.wrapper_horizontal}>
                                                    <label className={`${styles.sintesiMedica_label_TERAPIA}`}>Tipo gioco:</label>
                                                    <h5 className={`${styles.sintesiMedica_content_TERAPIA}`}>{gioco.tipoGioco}</h5>
                                                </div>
                                                <div className={styles.wrapper_horizontal}>
                                                    <label className={`${styles.sintesiMedica_label_DATA}`}>Difficoltà:</label>
                                                    <h5 className={`${styles.sintesiMedica_content_DATA}`}>{gioco.livelloGioco}</h5>
                                                </div>
                                                <div style={{width: "100%", marginTop: "10px"}} className={styles.horizontal}>
                                                    <DeleteButton onClick={
                                                        () => eliminaGioco(gioco.gameID)
                                                    }>
                                                    </DeleteButton>
                                                </div>
                                                
                                            </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                                <div className={styles.horizontal}>
                                    <GenericButton
                                        onClick={() => {setModaleListaGiochi(true)}}
                                        buttonText={"Seleziona giochi"}
                                        generic_button
                                    ></GenericButton>
                                </div>
                            </div>
                            
                            <Modal dialogClassName={styles.modal_custom_width} scrollable centered show={modaleListaGiochi}>
                                <Modal.Header style={{fontWeight: "bold", fontSize: "22px"}}>Lista giochi</Modal.Header>
                                <Modal.Body>
                                    <div className={styles.modal_wrap_GIOCHI}>
                                        <div style={{fontWeight: "bold"}} className={styles.modal_NOMEGIOCO}>Nome</div>
                                        <div style={{fontWeight: "bold"}} className={styles.modal_TIPOGIOCO}>Tipo</div>
                                        <div style={{fontWeight: "bold"}} className={styles.modal_LIVELLOGIOCO}>Difficoltà</div>
                                        <input type="checkbox" checked={checkboxAllGamesAssigned} onChange={(event) => {checkboxAssegnaTutti(event)}}></input>
                                    </div>
                                    {listaGiochi.map(verificaGiochiDelPaziente)}
                                </Modal.Body>
                                <Modal.Footer style={{justifyContent: "center"}}>
                                    <GenericButton
                                        onClick={() => setModaleListaGiochi(false)}
                                        buttonText={"Chiudi"}
                                        generic_button
                                        red_styling
                                    ></GenericButton>
                                </Modal.Footer>
                            </Modal>
                            
                        </div>
                    </Tab>
                </Tabs>
            </div>

            <hr style={{width: "100%"}}></hr>

            <div className={styles.horizontal}>
                <GenericButton
                    onClick={formModifyHandler}
                    generic_button={true}
                    buttonText="Salva modifiche"
                >
                </GenericButton>
                <GenericButton
                    onClick={patients_ctx.chiudiFormModifica}
                    generic_button={true}
                    red_styling
                    buttonText="Chiudi"
                >
                </GenericButton>
            </div>
            
        </div>
    );
}

export default EditPaziente;