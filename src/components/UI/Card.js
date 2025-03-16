import styles from "./Card.module.css";

function Card(props){
    const cardAnimata = props.animazione ? `${styles.animazione}` : '';
    const stileAggiuntivo = props.altroStile ? `${styles.altroStile}` : '';
    const stileHover = props.stileHover ? `${styles.stileHover}` : '';
    const backgroundBlue = props.backgroundBlue ? `${styles.backgroundBlue}` : '';
    const classiStile = `${styles.generic_wrapper} ${cardAnimata} ${stileAggiuntivo} ${stileHover} ${backgroundBlue}`;

    return(
        <div className={classiStile}>
            {props.children}
        </div>
    );
}

export default Card;