import styles from "./CardSmall.module.css";

function CardSmall(props){
    // const cardAnimata = props.animazione ? `${styles.animazione}` : '';
    const stileAggiuntivo = props.stileAggiuntivo ? `${styles.stileAggiuntivo}` : '';
    // const stileHover = props.stileHover ? `${styles.stileHover}` : '';
    const classiStile = `${styles.generic_wrapper} ${stileAggiuntivo}`;

    return(
        <div className={classiStile}>
            {props.children}
        </div>
    );
}

export default CardSmall;