import GenericButton from "../UI/GenericButton";
import SearchBox from '../UI/SearchBox';
import Card from '../UI/Card';
import imageee from '../Images/add_person.png';
import TabellaPazienti from './TabellaPazienti';
import AddPaziente from './AddPaziente';
import { useContext, useEffect, useState } from 'react';
import styles from './Pazienti.module.css';
import PatientContext from "../../context/patients-context";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

function Pazienti(){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);
    
    const navigate = useNavigate();

    let tabella = 
        <TabellaPazienti
            elenco = {patients_ctx.listaPazienti.map(patients_ctx.arrayToTable)}>
        </TabellaPazienti>;

    useEffect(() => {
        console.log("Lista dei pazienti");
        console.log(patients_ctx.listaPazienti);
        console.log(auth_ctx.pazienteLoggatoID)
        if(auth_ctx.tipoAccount === "Paziente"){
            navigate(`/giochi/${auth_ctx.utenteLoggatoUID}`)
        }
    }, [auth_ctx.pazienteLoggatoID])

    function cercaInfoPaziente(event){
        patients_ctx.cercaPaziente(event.target.value);
        // setStringaDaCercare(event.target.value);
    }

    return(
        <>
            {patients_ctx.showBarraRicercaBottone && 
                <div className={styles.wrap_boxes}>
                    <select onChange={(event) => {
                        patients_ctx.selectOrder(event.target.value)
                    }} className={styles.select_style}>
                        <option hidden>Ordina per...</option>
                        <option>NOME - Asc</option>
                        <option>NOME - Disc</option>
                        <option>COGNOME - Asc</option>
                        <option>COGNOME - Disc</option>
                        <option>CODICE FISC. - Asc</option>
                        <option>CODICE FISC. - Disc</option>
                    </select>

                    <GenericButton
                        onClick={patients_ctx.formVisibile}
                        buttonText={"Aggiungi Paziente"}
                        generic_button={true}
                        text_hideable={true}
                        immagine={imageee}
                    >
                    </GenericButton>

                    <SearchBox
                        onChange={cercaInfoPaziente}
                    >
                    </SearchBox>
                </div>
            }

            {patients_ctx.showTabella && <h1 className={styles.page_title}>Lista Pazienti</h1>}
            {patients_ctx.showFormNuovoPaziente && <h1 className={styles.page_title}>Nuovo paziente</h1>}

            <div className={styles.wrapper_generico}>

                {patients_ctx.showModale && patients_ctx.modale}

                {patients_ctx.showScheda && patients_ctx.schedaPaziente}

                {patients_ctx.showModifica && patients_ctx.modificaPaziente}

                {patients_ctx.showFormNuovoPaziente && 
                    <AddPaziente
                    hideFormNewPaziente = {patients_ctx.formNonVisibile}>
                    </AddPaziente>
                }

                {patients_ctx.showTabella && tabella}
                
            </div>
        </>
    );
}

export default Pazienti;