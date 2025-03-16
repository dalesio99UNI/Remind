import styles from './DetailsButton.module.css';
import detailsForm from '../Images/details.png';

function DetailsButton(props){
    return(
        <button onClick={props.onClick} className={styles.details_button}>
            <img src={detailsForm} alt='editPencil' className={styles.details_image}></img>
            <div className={styles.details_text}>{props.schedaTest ? "Riepilogo" : "Scheda Paziente"}</div>
        </button>
    );
}

export default DetailsButton;