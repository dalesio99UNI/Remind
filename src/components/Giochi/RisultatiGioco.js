import styles from "./RisultatiGioco.module.css";
import GenericButton from "../UI/GenericButton";
import { useContext, useState } from "react";
import PatientContext from "../../context/patients-context";
import { Card } from "react-bootstrap";
import AuthContext from "../../context/auth-context";

var paziente_selezionato_ID;

function RisultatiGioco(props){
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);

    var paziente_selezionato;

    const [paz, setPaz] = useState(null);
    const [disabledSaveButton, setDisabledSaveButton] = useState(true);

    //console.log(patients_ctx.listaPazienti.map(ogg => ogg.id).indexOf(value));

    function trovaPaziente(event){
        var paziente_nome_mostrato;
        console.log(event.target.value);

        for(var i = 0; i < patients_ctx.listaPazienti.length; i++){
            if(patients_ctx.listaPazienti[i].ID === parseInt(event.target.value)){
                console.log("TROVATO");
                paziente_nome_mostrato = patients_ctx.listaPazienti[i].nome + " " + patients_ctx.listaPazienti[i].cognome
                paziente_selezionato_ID = patients_ctx.listaPazienti[i].ID;
                return paziente_nome_mostrato;
            }
            else{
                console.log("NON TROVATO");
                console.log(patients_ctx.listaPazienti[i].ID);
            }
        }
        return -1;
    }

    function passaIndiceAGiochiPuntoJS(){
        console.log(paziente_selezionato_ID);
        props.assegnaRisultatiPaziente(paziente_selezionato_ID);
        // props.assegnaRisultatiPaziente(paziente_selezionato_obj)
    }

    return(
        <div className={styles.card_wrapper}>
            <Card>
                <Card.Header>
                    <h1 className={styles.title_scheda}>RISULTATI GIOCO</h1>
                </Card.Header>

                <Card.Body>
                    <h3 style={{color: "green"}} className={styles.numero_risposte}>Risposte corrette: {props.numeroRisposteCorrette}</h3>
                    <h3 style={{color: "red"}} className={styles.numero_risposte}>Risposte sbagliate: {props.numeroDomandeTotali - props.numeroRisposteCorrette}</h3>
                    <h3 className={styles.numero_risposte}>Totale: {props.numeroRisposteCorrette}/{props.numeroDomandeTotali}</h3>
                    <h3 className={styles.numero_risposte}>Percentuale corrette: {`${((props.numeroRisposteCorrette/props.numeroDomandeTotali) * 100).toFixed(2)}%`}</h3>

                    <hr></hr>

                    <h2 className={styles.paz_selezionato}>Assegna risultati ad un paziente:</h2>
                    <select className={styles.select_box} onChange={(event) => {
                        console.log(patients_ctx.listaPazienti.map(ogg => ogg.ID).indexOf(event.target.value));
                        
                        paziente_selezionato = trovaPaziente(event);
                        
                        if(paziente_selezionato !== -1){
                            setDisabledSaveButton(false);
                            setPaz(paziente_selezionato);
                        }
                        else{
                            setDisabledSaveButton(true);
                        }
                        }}>
                        <option hidden>-- seleziona paziente --</option>
                        {patients_ctx.listaPazienti.map(patients_ctx.arrayToLista)}
                    </select>
                </Card.Body>

                <Card.Footer>
                    <div className={styles.horizontal}>
                        <GenericButton
                            onClick={props.chiudiSchedaRisultati}
                            generic_button={true}
                            red_styling
                            buttonText='Chiudi'>
                        </GenericButton>

                        <GenericButton
                            is_disabled={disabledSaveButton}
                            onClick={passaIndiceAGiochiPuntoJS}
                            generic_button={true}
                            buttonText='Assegna risultati'>
                        </GenericButton>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    );
}

export function RisultatiGiocoPazAccnt(props){
    return(
        <div className={styles.card_wrapper}>
            <Card>
                <Card.Header>
                    <h1 className={styles.title_scheda}>GIOCO TERMINATO!</h1>
                </Card.Header>

                <Card.Body>
                    <h3 style={{textAlign: "center"}} className={styles.numero_risposte}>Vuoi giocare di nuovo?</h3>
                    <div className={styles.horizontal}>
                        <GenericButton
                            onClick={props.chiudiSchedaRisultati}
                            generic_button={true}
                            red_styling
                            buttonText='Chiudi'>
                        </GenericButton>

                        <GenericButton
                            // is_disabled={disabledSaveButton}
                            onClick={props.rigioca}
                            generic_button={true}
                            buttonText='Gioca di nuovo'>
                        </GenericButton>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default RisultatiGioco;