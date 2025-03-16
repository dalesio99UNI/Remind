import { useContext, useState } from "react";
import { Navbar, Nav, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import PatientContext from "../../context/patients-context";
import Modal from "./Modal";
import styles from "./MainMenu.module.css";
import logo from "../../logo8.png";
import logo_MOBILE from "../../logo8.png";

import user from "../../profilo1.png";
import patient from "../../paziente.png";
import game from "../../gioco2.png";
import questions from "../../domanda3.png";
import Box from "../../box.png";

function MainMenu(props) {
    const auth_ctx = useContext(AuthContext);
    const patients_ctx = useContext(PatientContext);

    const [highlightMenuButton_PAZIENTI, setHighlightMenuButton_PAZIENTI] = useState(true);
    const [highlightMenuButton_GIOCHI, setHighlightMenuButton_GIOCHI] = useState(false);

    const navigate = useNavigate();


    const handleTabSelect = (selectedTab) => {
        if (selectedTab === "Pazienti") {

            patients_ctx.cercaPaziente(""); 
            navigate(`/pazienti/${auth_ctx.utenteLoggatoUID}`, { replace: true }); 
        } else if (selectedTab === "Giochi") {
           
            navigate(`/giochi/${auth_ctx.utenteLoggatoUID}`, { replace: true }); 
        }
    };

    return (
        <>
            <Navbar className={`${styles.wrap_menu}`}>
                <div className={`${styles.wrap_website_name}`}>
                    <img className={styles.menu_image} src={logo} alt="CogniCare" />
                </div>
                <div className={`${styles.wrap_website_name_MOBILE}`}>
                    <img className={styles.menu_image} src={logo_MOBILE} alt="CogniCare" />
                </div>
                <Nav className={`${styles.wrap_buttons}`}>
                    <OverlayTrigger className="pulsanteProfile" rootClose rootCloseEvent="click" trigger="click" placement="bottom" overlay={
                        <Popover>
                            <Popover.Body style={{ maxWidth: "250px" }}>
                                <p className={styles.utente_loggato_FULLNAME}>
                                    {auth_ctx.nomeUtenteLoggato} {auth_ctx.cognomeUtenteLoggato}
                                </p>
                                <p className={styles.utente_loggato}>{auth_ctx.utenteLoggato}</p>
                                <button
                                    className={styles.logout_button}
                                    onClick={auth_ctx.onLogoutClick}
                                    style={{ width: "100%" }}
                                >
                                    Log Out
                                </button>
                            </Popover.Body>
                        </Popover>
                    }>
                        <div className={styles.wrapper_flex}>
                            <Button className={styles.profile_button}>
                                <img className={styles.profile_image} src={user} alt="Profile" />
                            </Button>
                        </div>
                    </OverlayTrigger>

                    {auth_ctx.tipoAccount !== "Paziente" &&
                        <Link className={styles.menu_option} style={{ textDecoration: "none" }} to={`/pazienti/${auth_ctx.utenteLoggatoUID}`}>
                            <Nav.Item
                                className={`${styles.menu_option} ${props.selected === "PAZIENTI" ? styles.menu_option_SELECTED : ''}`}
                                onClick={() => handleTabSelect("Pazienti")}
                            >
                                <img className={styles.image_option} src={patient} alt="pazienti" />
                                <div className={styles.menu_text_option}>Pazienti</div>
                            </Nav.Item>
                        </Link>
                    }

                    <Link className={styles.menu_option} style={{ textDecoration: "none" }} to={`/giochi/${auth_ctx.utenteLoggatoUID}`}>
                        <Nav.Item
                            className={`${styles.menu_option} ${props.selected === "GIOCHI" ? styles.menu_option_SELECTED : ''}`}
                            onClick={() => handleTabSelect("Giochi")}
                        >
                            <img className={styles.image_option} src={game} alt="giochi" />
                            {auth_ctx.tipoAccount !== "Paziente" && <div className={styles.menu_text_option}>Giochi</div>}
                            {auth_ctx.tipoAccount === "Paziente" && <div className={styles.menu_text_option}>I Miei Giochi</div>}
                        </Nav.Item>
                    </Link>

                    {auth_ctx.tipoAccount !== "Paziente" &&
                        <Link className={styles.menu_option} style={{ textDecoration: "none" }} to={`/domande/${auth_ctx.utenteLoggatoUID}`}>
                            <Nav.Item
                                className={`${styles.menu_option} ${props.selected === "DOMANDE" ? styles.menu_option_SELECTED : ''}`}
                            >
                                <img className={styles.image_option} src={questions} alt="domande" />
                                <div className={styles.menu_text_option}>Domande</div>
                            </Nav.Item>
                        </Link>
                    }
                     
                     <Link className={styles.menu_option} style={{ textDecoration: "none" }} to={`/box-dei-ricordi/${auth_ctx.utenteLoggatoUID}`}>
    <Nav.Item
        className={`${styles.menu_option} ${props.selected === "BOX DEI RICORDI" ? styles.menu_option_SELECTED : ''}`}
    >
        <img className={styles.image_option} src={Box} alt="Box dei ricordi" />
        <div className={styles.menu_text_option}>Box dei ricordi</div>
    </Nav.Item>
</Link>

                    
                </Nav>
            </Navbar>

            {auth_ctx.utenteLoggato !== null && auth_ctx.logoutModal &&
                <Modal
                    testoModale={"Sei sicuro di voler effettuare il logout?"}
                    CONFERMA={() => {
                        auth_ctx.onLogout();
                        sessionStorage.clear();
                        navigate("/");
                    }}
                    ANNULLA={() => {
                        auth_ctx.cancelLogout();
                    }}
                />
            }
        </>
    );
}

export default MainMenu;

