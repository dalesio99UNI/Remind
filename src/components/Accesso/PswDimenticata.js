import { useEffect, useState } from 'react';
import styles from './PswDimenticata.module.css';
import Card from '../UI/Card';
import GenericButton from '../UI/GenericButton';
import { getServerMgr } from '../../backend_conn/ServerMgr';
import logo from "../../logo8.png";




function PswDimenticata(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [submitted, setSubmitted] = useState(false); 

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };

    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const submitPswRecovery = async (event) => {
        event.preventDefault();
        setSubmitted(true);
    
        let isValid = true;
    
        if (!validateEmail(email)) {
            setValidEmail(false);
            isValid = false;
        } else {
            setValidEmail(true);
        }
    
        if (password.length < 6) {
            setValidPassword(false);
            isValid = false;
        } else {
            setValidPassword(true);
        }
    
        if (password !== confirmPassword) {
            setValidConfirmPassword(false);
            isValid = false;
        } else {
            setValidConfirmPassword(true);
        }
    
        if (!isValid) return; 
    
        try {
            let result = await getServerMgr().pswRecovery_checkEmail(email);
            console.log("risultato del recupero password",result);
            if (result !== null && Object.keys(result).length > 0) {
                let result2 = await getServerMgr().pswRecovery_code(email, password); 
                if (result2 !== null) {
                    alert("Passowrd modificata con successo!");
                    props.goToLoginForm();
                }
               
            } else {
                alert("Nessun account trovato con questa email.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
<div className='wrapper'>
        <Card>
            <form className={styles.center_elements} onSubmit={submitPswRecovery}>
                <img className={styles.img_size} src={logo} alt="Logo" />
                <h1 className={styles.title}>Recupero Password</h1>
    
                <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Email</label>
                <input
                    className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`}
                    type="email"
                    placeholder="Inserisci email"
                    value={email}
                    onChange={emailChangeHandler}
                />
                {!validEmail && submitted && <h2 className={styles.error_message}>Inserisci una email valida!</h2>}
    
                <label className={`${styles.label_box} ${!validPassword ? styles.invalid : ''}`}>Nuova password</label>
                <input
                    className={`${styles.input_box} ${!validPassword ? styles.invalid : ''}`}
                    type="password"
                    placeholder="Inserisci la password"
                    value={password}
                    onChange={passwordChangeHandler}
                />
                {!validPassword && submitted && <h2 className={styles.error_message}>La password deve essere lunga almeno 6 caratteri!</h2>}
    
                <label className={`${styles.label_box} ${!validConfirmPassword ? styles.invalid : ''}`}>Conferma Password</label>
                <input
                    className={`${styles.input_box} ${!validConfirmPassword ? styles.invalid : ''}`}
                    type="password"
                    placeholder="Conferma la password"
                    value={confirmPassword}
                    onChange={confirmPasswordChangeHandler}
                />
                {!validConfirmPassword && submitted && <h2 className={styles.error_message}>Le password non corrispondono!</h2>}
    
                <GenericButton type="submit" generic_button={true} buttonText="Invia" />
    
                <h5 className={styles.log_reg} onClick={props.goToLoginForm}>Vai al Login</h5>
            </form>
        </Card>
        </div>
    );
    
}

export default PswDimenticata;
