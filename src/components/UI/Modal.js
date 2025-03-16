import styles from './Modal.module.css';
import GenericButton from "./GenericButton";
import ReactDOM from 'react-dom';

function ModalToPort(props){
    return(
        <div className={styles.background_modal}>
            <div className={styles.wrapper_modal}>
                <h2 className={styles.modal_title_text}>{props.testoModale}</h2>
                {props.pazienteNome !== undefined && props.pazienteCognome !== undefined && 
                    <h2 className={styles.underline_text}>{props.pazienteNome} {props.pazienteCognome}</h2>
                }
                {props.patologia !== undefined &&
                    <h2 className={styles.underline_text}>{props.patologia}</h2>
                }
                
                <GenericButton
                onClick={props.CONFERMA}
                generic_button={true}
                buttonText='SI'
                red_styling
                >
                </GenericButton>

                <GenericButton
                onClick={props.ANNULLA}
                generic_button={true}
                buttonText='NO'>
                </GenericButton>
            </div>
        </div>
    );
}

function Modal(props){
    return(
        <>
            {ReactDOM.createPortal(
            <ModalToPort
                testoModale = {props.testoModale}
                CONFERMA={props.CONFERMA}
                ANNULLA={props.ANNULLA}
                pazienteNome={props.pazienteNome}
                pazienteCognome={props.pazienteCognome}
                patologia= {props.patologia}
            >
            </ModalToPort>, document.getElementById('modale'))}
        </>
    );
}

export default Modal;