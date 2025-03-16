import styles from "./GameCard.module.css";

function GameCard(props){
    return(
        <li className={styles.item_gioco}>
            {props.children}
        </li>
    );
}

export default GameCard;