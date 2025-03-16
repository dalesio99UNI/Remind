import logo from "../../logo8.png";
import Card from "../UI/Card";
import GenericButton from "../UI/GenericButton";
import styles from "./WelcomePage.module.css";

function WelcomePage(props) {
    return (
        <div className={styles.wrapper_welcome}>
            <Card>
                <img className={styles.img_size} src={logo} alt="Remind Logo" />
                <div className={styles.card_content}>
                    Benvenuto su Remind!
                </div>
                <div className={styles.description_text}>
                    Il portale che ti aiuta a gestire e monitorare i tuoi pazienti
                </div>
                <div className={styles.wrapper_button}>
                    <GenericButton
                        onClick={props.goToLogin}
                        buttonText={"Accedi"}
                        generic_button
                    />
                </div>
            </Card>
        </div>
    );
}


export default WelcomePage;