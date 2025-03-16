import React, { useContext, useEffect, useState } from "react";
import SchedaPaziente from "../components/Pazienti/SchedaPaziente";
import someStyles from '../components/Pazienti/TabellaPazienti.module.css';
import DeleteButton from "../components/UI/DeleteButton";
import EditButton from "../components/UI/EditButton";
import DetailsButton from "../components/UI/DetailsButton";
import Modal from "../components/UI/Modal";
import EditPaziente from "../components/Pazienti/EditPaziente";
import Card from "../components/UI/Card";

import AuthContext from "./auth-context";
import { getServerMgr } from "../backend_conn/ServerMgr";
import { Collapse } from "react-bootstrap";

let scheda_paziente;
let modifica_paziente;
let modal_eliminazione;

const PatientContext = React.createContext({
    listaPazienti: [],
    listaGiochiDelPaziente: [],
    updateListaPazienti: ()=>{},
    showTabella: null,
    arrayToTable: () => {},
    arrayToLista: () => {},
    mostraRiga: () => {},
    showScheda: null,
    schedaPaziente: null,
    showModifica: null,
    modificaPaziente: null,
    modificaLista: () => {},
    chiudiFormModifica: () => {},
    showModale: null,
    modale: null,
    formVisibile: () => {},
    formNonVisibile: () => {},
    nuovoPazienteHandler: () => {},
    showFormNuovoPaziente: null,
    showBarraRicercaBottone: null,
    cercaPaziente: ()=>{},
    stringSearched: null,
    selectOrder:()=>{},
});

export function PatientContextProvider(props){
    const auth_ctx = useContext(AuthContext);
    
    //QUESTO STATO SERVE PER DARE IL TEMPO A FIREBASE DI FETCHARE E A REACT DI AGGIORNARE L'ELENCO DEI PAZIENTI
    const [isLoading, setIsLoading] = useState(true);

    const [stringaCercata, setStringaCercata] = useState("");

    const [ordinamentoSelezionato, setOrdinamentoSelezionato] = useState("");

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showTabella, setShowTabella] = useState(true);
    const [elencoPazienti, setElencoPazienti] = useState([]);
    const [listaGiochiDiUnPaziente, setListaGiochiDiUnPaziente] = useState([]);

    const [patientButtons, setPatientButtons] = useState();

    const [showFormNewPaziente, setShowFormNewPaziente] = useState(false);
    const [showSchedaPaziente, setShowSchedaPaziente] = useState(false);
    const [showModificaPaziente, setShowModificaPaziente] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setElencoPazienti(elencoPazienti);
    }, [ordinamentoSelezionato])

    const prendiListaPazienti = async () => {
        if(auth_ctx.utenteLoggato !== null && auth_ctx.tipoAccount !== "Paziente"){
            console.log(auth_ctx.utenteLoggato)
            console.log(auth_ctx.utenteLoggatoUID)
            let result;
            result = await getServerMgr().getPatientsList(auth_ctx.utenteLoggatoUID)
            .catch((err) => {
                console.error(err)
            });
    
            if(result !== null){
                setElencoPazienti(result);
            }
            else{
                setElencoPazienti([]);
            }
            // console.log(result[0]);
        }
    }

    //ESEGUO LA FUNZIONE PER AVERE SEMPRE LA LISTA AGGIORNATA DEI PAZIENTI
    useEffect(() => {
        if(auth_ctx.utenteLoggato !== null){
            console.log("CARICO LISTA PAZIENTI....");
            prendiListaPazienti();
        }
    }, [isLoading, auth_ctx.utenteLoggato]);
    

    //------------- AGGIORNA db CON IL NUOVO PAZIENTE ---> VIENE ESEGUITA IN AddPaziente.js TRAMITE PROPS
    function aggiungiPaziente(){
        setShowFormNewPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);

        prendiListaPazienti();
    }

    //FUNZIONE PER VISUALIZZARE FORM AGGIUNTA PAZIENTE
    function formVisibile(){
        setShowSearchBoxAndButton(false);
        setStringaCercata("");
        setShowFormNewPaziente(true);
        setShowTabella(false);
        setShowSchedaPaziente(false);
    }

    //FUNZIONE PER NASCONDERE FORM AGGIUNTA PAZIENTE
    function formNonVisibile(){
        setShowFormNewPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);
    }

    //FUNZIONE PER MOSTRARE LA SCHEDA DI MODIFICA DEI DATI DEL PAZIENTE
    async function modificaDatiPaziente(pazienteee){
       

        let resultGiochi =  await getServerMgr().listaGiochiPaziente(pazienteee.ID)
        console.log(resultGiochi)

console.log("stampo tutti i dati del paziente",pazienteee);

        setListaGiochiDiUnPaziente(resultGiochi);

        modifica_paziente = 

            <EditPaziente
                iddd={pazienteee.ID}
                nomeee={pazienteee.nome}
                cognomeee={pazienteee.cognome}
                cittààà={pazienteee.city}
                dataaa={pazienteee.dataNascita}
                contattoEmail={pazienteee.contattoEmail}
                contattoCellulare={pazienteee.contattoCellulare}
                attivitààà={pazienteee.attività}
                cfff={pazienteee.codiceFiscale}
                giochiii={resultGiochi}
            >
            </EditPaziente>


        setShowModificaPaziente(true);
        setShowSearchBoxAndButton(false);
        setShowTabella(false);
    }

    //---------------- FUNZIONE PER MODIFICARE I DATI DI UN PAZIENTE
    function modificaPaziente(){
        setShowModificaPaziente(false);
        setShowSearchBoxAndButton(true);
        setShowTabella(true);

        prendiListaPazienti();
    }

    //FUNZIONE PER CHIUDERE LA SCHEDA DI MODIFICA DEI DATI DEL PAZIENTE
    function chiudiFormModificaPaziente(event){
        event.preventDefault();
        setShowModificaPaziente(false);
        setShowSearchBoxAndButton(true);
        setStringaCercata("");
        setShowTabella(true);
    }

    //---------------- FUNZIONE PER ELIMINARE UN PAZIENTE
    async function eliminaPaziente(pazienteID){
        let result;

        result = await getServerMgr().deletePaziente(pazienteID)
        .then(console.log(result))
        .catch((err) => {
            console.error(err);
        });

        prendiListaPazienti();
    }

    //FUNZIONE PER VISUALIZZARE IL MODALE DI ELIMINAZIONE
    function confermaEliminazionePaziente(paziente_ID, paziente_Nome, paziente_Cognome){
        console.log("ELIMINO PAZIENTE");
        
        modal_eliminazione = 
            <Modal
            testoModale={"Sei sicuro di voler eliminare il seguente paziente?"}
            pazienteNome={paziente_Nome}
            pazienteCognome={paziente_Cognome}
            CONFERMA={() =>{
                eliminaPaziente(paziente_ID);
                setShowModal(false);
                // setShowTabella(true);
            }}
            ANNULLA={() => {
                setShowModal(false);
                // setShowTabella(true);
            }}>
            </Modal>;
        setShowModal(true);
    }

    function showButtonsForPatient(pazienteID){
        if(pazienteID === patientButtons){
            setPatientButtons();
        }
        else{
            setPatientButtons(pazienteID)
        }
    }

    //------------- FUNZIONE CHE RESTITUISCE LA SINGOLA RIGA DELLA TABELLA POPOLATA CON I DATI DEL PAZIENTE PRESI DAL db
    function fromArrayToTablePazienti(elencoPazienti){
        if(Object.keys(elencoPazienti).length > 0){
            if(stringaCercata.length === 0 || 
                (elencoPazienti.nome.toUpperCase().includes(stringaCercata.toUpperCase()) ||
                 elencoPazienti.cognome.toUpperCase().includes(stringaCercata.toUpperCase()) ||
                 elencoPazienti.codiceFiscale.toUpperCase().includes(stringaCercata.toUpperCase())
                )){
                return(
                    <>
                        <tr onClick={() => {
                            showButtonsForPatient(elencoPazienti.ID)
                        }} key={elencoPazienti.ID}>
                            <td className={`${someStyles['dati_tabella']} ${someStyles['nome']}`}>{elencoPazienti.nome}</td>
                            <td className={`${someStyles['dati_tabella']} ${someStyles['cognome']}`}>{elencoPazienti.cognome}</td>
                            <td className={`${someStyles['dati_tabella']} ${someStyles['città']}`}>{elencoPazienti.city}</td>
                            <td className={`${someStyles['dati_tabella']} ${someStyles['data']}`}>{elencoPazienti.dataNascita}</td>
                            <td className={`${someStyles['dati_tabella']} ${someStyles['codicefiscale']}`}>{elencoPazienti.codiceFiscale}</td>
                            
                        </tr>

                        <tr>
                            <td style={{height: "0"}} className={someStyles.buttons_row} colSpan={5}>
                                <Collapse in={patientButtons === elencoPazienti.ID}>
                                    <div>
                                        {/* <tr> */}
                                            {/* <td className={someStyles.buttons_row} colSpan={5}> */}
                                                <DetailsButton
                                                onClick={() => {
                                                    cliccaRiga(elencoPazienti);
                                                }}>
                                                </DetailsButton>
                            
                                                <EditButton
                                                onClick={() =>{
                                                    modificaDatiPaziente(elencoPazienti);
                                                }}>
                                                </EditButton>
                                                
                                                <DeleteButton
                                                onClick={() => {
                                                    confermaEliminazionePaziente(elencoPazienti.ID, elencoPazienti.nome, elencoPazienti.cognome);
                                                }}>
                                                </DeleteButton>
                                            {/* </td> */}
                                        {/* </tr> */}
                                    </div>
                                </Collapse>
                            </td>
                        </tr>
                    </>
                );
            }
            
        }
        else{
            console.log(elencoPazienti);
            return(
                <p>Non ci sono pazienti da mostrare. Creane uno</p>
            );
        }
    }

    //-------------- FUNZIONE CHE RESTITUISCE LE OPZIONI PER I MENU A DROPDOWN
    function fromArrayToListaPazienti(elencoPazienti){
        return(
           <option key={elencoPazienti.ID} value={elencoPazienti.ID} >
                {elencoPazienti.nome} {elencoPazienti.cognome} {'-- (C.F.: '}{elencoPazienti.codiceFiscale + ')'}
           </option>
        );
    }

    //FUNZIONE PER VISUALIZZARE LA SCHEDA DI UN SINGOLO PAZIENTE CON I SUOI DATI
    async function cliccaRiga(pazientee){
       
        console.log("stampo il contenuto di paziente",pazientee);
        console.log("stampo l'ID del paziente",pazientee.ID);
    

        let resultGiochi =  await getServerMgr().listaGiochiPaziente(pazientee.ID)
        console.log(resultGiochi)

        let resultStatistiche = await getServerMgr().getPatientStatistics(pazientee.ID);
        console.log("stampo tutte le statistiche del paziente",resultStatistiche);

       
        let resultCredentialsPatients = await getServerMgr().getPatientCredentials(pazientee.ID);
        console.log("stampo le credenziali",resultCredentialsPatients); 

        scheda_paziente = 
            <SchedaPaziente
                id = {pazientee.ID}
                nome = {pazientee.nome}
                cognome = {pazientee.cognome}
                città = {pazientee.city}
                datanascita = {pazientee.dataNascita}
                codicefiscale = {pazientee.codiceFiscale}
               
                contattoEmail = {pazientee.contattoEmail}
                contattoCellulare = {pazientee.contattoCellulare}
               
                listaGiochi = {resultGiochi}
                statsPaziente = {resultStatistiche}
                credentialsAccount= {resultCredentialsPatients}
                goBackButton = {chiudiSchedaPaziente}
            >
            </SchedaPaziente>
        setShowSchedaPaziente(true);
        setShowTabella(false);
        setShowSearchBoxAndButton(false);
        setShowFormNewPaziente(false);
    }

    //CHIUDE LA SCHEDA DEL PAZIENTE APERTA
    function chiudiSchedaPaziente(){
        console.log('CHIUDI SCHEDAAA');
        setShowSchedaPaziente(false);
        setShowTabella(true);
        setShowSearchBoxAndButton(true);
        // ordinaPerNome();
    }

    function searchPatient(stringaDaCercare){
        console.log(stringaDaCercare)
        setStringaCercata(stringaDaCercare);
    }

    function ordinamento(orderBy){
        switch(orderBy){
            case "NOME - Asc":
                ordinaPerNome("ASC");
                break;
            case "NOME - Disc":
                ordinaPerNome("DISC");
                break;
            case "COGNOME - Asc":
                ordinaPerCognome("ASC");
                break;
            case "COGNOME - Disc":
                ordinaPerCognome("DISC");
                break;
            case "CODICE FISC. - Asc":
                ordinaPerCodiceFiscale("ASC");
                break;
            case "CODICE FISC. - Disc":
                ordinaPerCodiceFiscale("DISC");
                break;
            default:
                break;
        }
        setOrdinamentoSelezionato(orderBy);
    }

    function ordinaPerNome(verso){
        if(verso === "ASC"){
            setElencoPazienti(elencoPazienti.sort(comparazionePerNome_ASCENDENTE));
        }
        if(verso === "DISC"){
            setElencoPazienti(elencoPazienti.sort(comparazionePerNome_DISCENDENTE));
        }
        console.log(elencoPazienti);
    }

    function comparazionePerNome_ASCENDENTE(a, b){
        if(a.nome.toUpperCase() < b.nome.toUpperCase()){
            return -1;
        }
        if(a.nome.toUpperCase() > b.nome.toUpperCase()){
            return 1;
        }
        return 0;
    }
    function comparazionePerNome_DISCENDENTE(a, b){
        if(a.nome.toUpperCase() > b.nome.toUpperCase()){
            return -1;
        }
        if(a.nome.toUpperCase() < b.nome.toUpperCase()){
            return 1;
        }
        return 0;
    }

    function ordinaPerCognome(verso){
        if(verso === "ASC"){
            setElencoPazienti(elencoPazienti.sort(comparazionePerCognome_ASCENDENTE));
        }
        if(verso === "DISC"){
            setElencoPazienti(elencoPazienti.sort(comparazionePerCognome_DISCENDENTE));
        }
        console.log(elencoPazienti);
    }

    function comparazionePerCognome_ASCENDENTE(a, b){
        if(a.cognome.toUpperCase() < b.cognome.toUpperCase()){
            return -1;
        }
        if(a.cognome.toUpperCase() > b.cognome.toUpperCase()){
            return 1;
        }
        return 0;
    }
    function comparazionePerCognome_DISCENDENTE(a, b){
        if(a.cognome.toUpperCase() > b.cognome.toUpperCase()){
            return -1;
        }
        if(a.cognome.toUpperCase() < b.cognome.toUpperCase()){
            return 1;
        }
        return 0;
    }

    function ordinaPerCodiceFiscale(verso){
        if(verso === "ASC"){
            setElencoPazienti(elencoPazienti.sort(comparazionePerCodiceFiscale_ASCENDENTE));
        }
        if(verso === "DISC"){
            setElencoPazienti(elencoPazienti.sort(comparazionePerCodiceFiscale_DISCENDENTE));
        }
        console.log(elencoPazienti);
    }

    function comparazionePerCodiceFiscale_ASCENDENTE(a, b){
        if(a.codiceFiscale.toUpperCase() < b.codiceFiscale.toUpperCase()){
            return -1;
        }
        if(a.codiceFiscale.toUpperCase() > b.codiceFiscale.toUpperCase()){
            return 1;
        }
        return 0;
    }
    function comparazionePerCodiceFiscale_DISCENDENTE(a, b){
        if(a.codiceFiscale.toUpperCase() > b.codiceFiscale.toUpperCase()){
            return -1;
        }
        if(a.codiceFiscale.toUpperCase() < b.codiceFiscale.toUpperCase()){
            return 1;
        }
        return 0;
    }

    return(
        <PatientContext.Provider
        value={{
            listaPazienti: elencoPazienti,
            listaGiochiDelPaziente: listaGiochiDiUnPaziente,
            updateListaPazienti: prendiListaPazienti,
            showTabella: showTabella,
            arrayToTable: fromArrayToTablePazienti,
            arrayToLista: fromArrayToListaPazienti,
            mostraRiga: cliccaRiga,
            showScheda: showSchedaPaziente,
            schedaPaziente: scheda_paziente,
            showModifica: showModificaPaziente,
            modificaPaziente: modifica_paziente,
            modificaLista: modificaPaziente,
            chiudiFormModifica: chiudiFormModificaPaziente,
            showModale: showModal,
            modale: modal_eliminazione,
            formVisibile: formVisibile,
            formNonVisibile: formNonVisibile,
            nuovoPazienteHandler: aggiungiPaziente,
            showFormNuovoPaziente: showFormNewPaziente,
            showBarraRicercaBottone: showSearchBoxAndButton,
            cercaPaziente: searchPatient,
            stringSearched: stringaCercata,
            selectOrder: ordinamento,
        }}>
            {props.children}
        </PatientContext.Provider>
    );
}

export default PatientContext;