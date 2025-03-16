import { useContext, useEffect, useState } from "react";
import styles from "./LoginForm.module.css";
import GenericButton from "../UI/GenericButton";
import Card from "../UI/Card";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import logo from "../../logo8.png";

function LoginForm(props) {
    const auth_ctx = useContext(AuthContext);

    const [erroreLogin, setErroreLogin] = useState(false);

    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('UID') !== null) {
            auth_ctx.mantieniUtenteLoggato();
            console.log(auth_ctx.tipoAccount);
            if (auth_ctx.tipoAccount === "Paziente") {
                navigate(`/giochi/${auth_ctx.utenteLoggatoUID}`);
            } else {
                navigate(`/pazienti/${auth_ctx.utenteLoggatoUID}`);
            }
        }
    }, []);

    useEffect(() => {
        setValidEmail(true);
        setValidPassword(true);
        setErroreLogin(false);
    }, [email, password]);

    const goToRegistrationForm = () => {
        props.goToRegForm();
    };

    const goToRecoverPassword = () => {
        props.goToPswDiment();
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitLogin = async (event) => {
        event.preventDefault();
        let result;

        if (email.includes('@') && password.trim().length >= 6) {
            result = await getServerMgr().getLogin(email, password)
                .catch((err) => {
                    console.error(err);
                });
        }

        if (result && Array.isArray(result) && result.length > 0) {
            const user = result[0];
            sessionStorage.setItem('UID', user.UID);
            if (user.UID && user.titolo !== undefined && user.nome && user.cognome) {
                auth_ctx.login(
                    email, user.UID, user.titolo, user.nome, user.cognome, user.patientID
                );

               

                if (user.titolo === 3) {
                    navigate(`/giochi/${user.UID}`);
                } else {
                    navigate(`/pazienti/${user.UID}`);
                }
            }
        } else {
            setValidEmail(false);
            setValidPassword(false);
            setErroreLogin(true);
        }
    };

    return (
        <div className={styles.wrapper}>
            <Card>
                <form className={styles.center_elements} onSubmit={submitLogin}>
                    <img className={styles.img_size} src={logo} alt="Logo" />
                    <h1 className={styles.title}>Login</h1>
    
                    <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Email</label>
                    <input 
                        className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`} 
                        type="email" 
                        placeholder="Inserisci email" 
                        value={email} 
                        onChange={emailChangeHandler} 
                    />
    
                    <label className={`${styles.label_box} ${!validPassword ? styles.invalid : ''}`}>Password</label>
                    <input 
                        className={`${styles.input_box} ${!validPassword ? styles.invalid : ''}`} 
                        type="password" 
                        placeholder="Inserisci password" 
                        value={password} 
                        onChange={passwordChangeHandler} 
                    />
    
                    {erroreLogin && <h2 className={styles.error_message}>Credenziali non corrette</h2>}
    
                    <GenericButton
                        type="submit"
                        generic_button={true}
                        buttonText='Accedi'
                    />
    
                    <h5 className={styles.log_reg} onClick={goToRegistrationForm}>Clicca qui per registrarti!</h5>
                    <h5 className={styles.psw_dimenticata} onClick={goToRecoverPassword}>Password dimenticata?</h5>
                </form>
            </Card>
        </div>
    );
}    

export default LoginForm;
