import styles from "./RadioButton.module.css";

function RadioButton(props){
    const selezionato = props.isSelected ? `${styles.is_selected}` : '';
    const classiStile = `${styles.radio_button} ${selezionato}`;

    return(
        <button onClick={props.onClick} className={classiStile}>
            {props.buttonText}{props.isSelected}
        </button>
    );
}

export default RadioButton;