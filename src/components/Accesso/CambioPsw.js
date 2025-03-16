import styles from "./CambioPsw.module.css";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import Card from "../UI/Card";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
// import { auth } from "../../config/firebase-config";

function CambioPsw(){
    const [singletonHasLoaded, setSingletonHasLoaded] = useState(false);
    const [validNewPassword, setValidNewPassword] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [validNewPasswordConferma, setValidNewPasswordConferma] = useState(true);
    const [newPasswordConferma, setNewPasswordConferma] = useState('');
    const [PSWChanged, setPSWChanged] = useState(null);
    
    const location = useLocation();

    const auth_ctx = useContext(AuthContext);
    const query = getQuery();

    useEffect(() => {
        initSingleton()
        .then(setSingletonHasLoaded(true))
      }, [])

    useEffect(() => {
        setValidNewPassword(true);
        // const query = getQuery();
        console.log(query.get('code'));
    }, [newPassword])

    function initSingleton(){
        return new Promise((resolve, reject) => {
          getServerMgr(resolve)
        })
      }

    function getQuery(){
        return new URLSearchParams(location.search);
    }

    const passwordChangeHandler = (event) => {
        setNewPassword(event.target.value);
        setValidNewPassword(true)
    }
    const passwordConfermaChangeHandler = (event) => {
        setNewPasswordConferma(event.target.value);
        setValidNewPasswordConferma(true)
    }

    const submitChangePassword = async (event) => {
        event.preventDefault();

        let result;
        if(newPassword.trim().length > 5 && newPassword === newPasswordConferma){
            result = await getServerMgr().pswRecovery_reset(newPassword, query.get('code'))
            .then(console.log(result))
            .catch((err) => {
                console.error(err)
            });
    
            if(result !== null){
                setPSWChanged(true);
            }
            else{
                setPSWChanged(false);
            }
        }
        else{
            if(newPassword.trim().length <= 5){
                setValidNewPassword(false);
            }
            if(newPassword !== newPasswordConferma){
                setValidNewPasswordConferma(false);
            }
        }
        
    }

    if(singletonHasLoaded){
        return(
            <div className={styles.wrap_center_card}>
                <Card
                    children = {
                        <form className={styles.center_elements} onSubmit={submitChangePassword}>
                            <h1 className={styles.title}>Cambio password</h1>
    
                            {/* <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Inserisci la tua email</label>
                            <input className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`} type="email" placeholder="Inserisci email.." value={email} onChange={emailChangeHandler}></input> */}
    
                            <label className={`${styles.label_box} ${!validNewPassword ? styles.invalid : ''}`}>Inserisci nuova password</label>
                            <input className={`${styles.input_box} ${!validNewPassword ? styles.invalid : ''}`} type="password" placeholder="Nuova password.." value={newPassword} onChange={passwordChangeHandler}></input>
    
                            {!validNewPassword && <h2 style={{color: "red"}}>Inserisci una password valida!</h2>}

                            <label className={`${styles.label_box} ${!validNewPasswordConferma ? styles.invalid : ''}`}>Conferma nuova password</label>
                            <input className={`${styles.input_box} ${!validNewPasswordConferma ? styles.invalid : ''}`} type="password" placeholder="Nuova password.." value={newPasswordConferma} onChange={passwordConfermaChangeHandler}></input>
    
                            {!validNewPasswordConferma && <h2 style={{color: "red"}}>La password non corrisponde!</h2>}
    
                            <GenericButton
                                type = "submit"
                                generic_button={true}
                                buttonText = 'Invia'
                            >
                            </GenericButton>
    
                            {PSWChanged &&
                                <>
                                    <GenericAlternativeButton
                                        generic_button={true}
                                        buttonText={
                                            <Link style={{color: "white", textDecoration: "none"}} to="/">Go to Login</Link>
                                        }
                                    >    
                                    </GenericAlternativeButton>
                                    <h2 className={styles.label_box}>Password cambiata!</h2>
                                </>
                            }
                            {PSWChanged !== null && !PSWChanged &&
                                <h2>Si è verificato un errore! Riprova tra qualche minuto.</h2>
                            }
                            
                            {/* <h5 className={styles.log_reg} onClick={goToLoginForm}>Vai al Login</h5> */}
                        </form>
                    }
                >
                </Card>
            </div>
        );
    }
    else{
        return(
            <div>LOADING</div>
          );
    }
    
}

export default CambioPsw;