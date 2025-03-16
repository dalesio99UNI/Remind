// import { useState } from 'react';
import { useContext } from 'react';
import styles from './TabellaPazienti.module.css';
import PatientContext from '../../context/patients-context';

function TabellaPazienti(props){
    const patients_ctx = useContext(PatientContext);

    if(props.elenco.length > 0){
        return(
            <div className={styles.outer_wrapper_table}>
                <table className={styles.table_wrapper}>
                    <thead>
                        <tr>
                            <th className={`${styles['intestazione_tabella']} ${styles['nome']}`}>NOME</th>
                            <th className={`${styles['intestazione_tabella']} ${styles['cognome']}`}>COGNOME</th>
                            <th className={`${styles['intestazione_tabella']} ${styles['città']}`}>CITTA' DI NASCITA</th>
                            <th className={`${styles['intestazione_tabella']} ${styles['data']}`}>DATA DI NASCITA</th>
                            <th className={`${styles['intestazione_tabella']} ${styles['codicefiscale']}`}>CODICE FISCALE</th>
                            {/* <th className={styles.intestazione_tabella}>ATTIVITÀ</th> */}
                            {/* <th className={`${styles['intestazione_tabella']} ${styles['opzioni']}`}>OPZIONI</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {props.elenco}
                    </tbody>
                </table>
            </div>
        );
    }
    else{
        return(
            <table className={styles.table_wrapper}>
                <thead>
                    <tr>
                        <th className={`${styles['intestazione_tabella']} ${styles['nome']}`}>NESSUN PAZIENTE REGISTRATO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{textAlign: "center", fontSize: "20px"}}><td style={{display: "block", padding: "10px"}}>Aggiungi un paziente per visualizzare lo schedario.</td></tr>
                </tbody>
            </table>
        );
    }
}

export default TabellaPazienti;