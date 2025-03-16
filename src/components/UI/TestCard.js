import GenericAlternativeButton from "./GenericAlternativeButton";
import styles from "./TestCard.module.css";

function TestCard(props){
    return(
        <div className={styles.test_card}>
            <div className={styles.test_card_content}>
                <h1 className={styles.test_card_title}>{props.cardText}</h1>
                {props.children}
                {/* <GenericAlternativeButton
                    onClick={props.nascondiLista}
                    buttonText={"Avvia Test"}
                >
                </GenericAlternativeButton>
                <GenericAlternativeButton
                    buttonText={"Modifica Test"}
                >
                </GenericAlternativeButton>
                {props.testEliminabile &&
                    <GenericAlternativeButton
                        colore_rosso={true}
                        buttonText={"Elimina Test"}
                    >
                    </GenericAlternativeButton>
                } */}
            </div>
        </div>
    );
}

export default TestCard;