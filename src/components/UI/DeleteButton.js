import styles from './DeleteButton.module.css';
import trashCan from '../Images/trash-can.png';

function DeleteButton(props){
    const classiStile = props.stile_alternativo ? `${styles.delete_button_alternative}` : `${styles.delete_button}`;

    return(
        <button onClick={props.onClick} className={classiStile}>
            <img src={trashCan} alt='trash-can' className={styles.trash_image}></img>
            <div className={styles.delete_text}>Elimina</div>
        </button>
    );
}

export default DeleteButton;