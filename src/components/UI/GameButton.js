import styles from './GameButton.module.css';

function GameButton(props){
    const disabledButton = props.is_disabled ? `${styles.is_disabled}` : '';
    const rispostaCORRETTA = props.correct_answer ? `${styles.correct_answer}` : '';
    const rispostaSBAGLIATA = props.wrong_answer ? `${styles.wrong_answer}` : '';
    const bottoneStileGioco = props.game_button ? `${styles.game_button}` : '';
    const classiStile = `${bottoneStileGioco} ${rispostaCORRETTA} ${rispostaSBAGLIATA} ${disabledButton}`

    return (
        <button disabled={disabledButton} onClick={props.onClick} className={classiStile}>
            {props.buttonText}
        </button>
    );
}

export default GameButton;