import logo from "../../logo8.png";
import GenericButton from "../UI/GenericButton";
import styles from "./RegistrationForm.module.css";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import { getServerMgr } from "../../backend_conn/ServerMgr";

function RegistrationForm(props){
    // const listaUtentiReference = doc(db, "listaUtenti")
    var emailEsistente = null;
    const [registrEffettuata, setRegistrEffettuata] = useState(null);

    const [titolo, setTitolo] = useState("Caregiver");
    let titoloID;

    const [validNome, setValidNome] = useState(true);
    const [nome, setNome] = useState("");

    const [validCognome, setValidCognome] = useState(true);
    const [cognome, setCognome] = useState("");

    const [validEmail, setValidEmail] = useState(true);
    const [email, setEmail] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [password, setPassword] = useState('');

    const [validPasswordConferma, setValidPasswordConferma] = useState(true);
    const [passwordConferma, setPasswordConferma] = useState('');

    const submitRegistration = async (event) =>{
        event.preventDefault();
        let result;

        switch(titolo){
            case "Caregiver":
                titoloID = 1;
                break;
            default:
                break;
        }

        if(email.includes('@') && password.trim().length >= 6 && nome.trim().length > 1 && cognome.trim().length > 1 && password === passwordConferma){
            console.log("MANDO DATI PER LOGIN");

            result = await getServerMgr().getAccount()
            .catch((err) => {
                console.error(err);
            });

            if(result !== undefined && result!=null){
                for(var i=0; i < result.length; i++){
                    if(result[i].email === email){
                        // setValidNome(false);
                        // setValidCognome(false);
                        setValidEmail(false);
                        // setValidPassword(false);
                        // setABuonFine(false);
                        emailEsistente = true;
                        alert("Email già associata ad un account!");
                        break;
                    }
                    else{
                        emailEsistente = false;
                    }
                }
                if(!emailEsistente){
                    let result2;
                    result2 = await getServerMgr().addAccount(nome, cognome, titoloID, email, password)
                    .then(() => {
                        alert("ACCOUNT CREATO!");
                        goToLoginForm();
                    })
                    .catch((err) => {
                        console.error(err);
                        // setRegistrEffettuata(false);
                    });
                }
            }
            else{
                let result2;
                result2 = await getServerMgr().addAccount(nome, cognome, titoloID, email, password)
                .then(alert("ACCOUNT CREATO!"))
                .catch((err) => {
                    console.error(err);
                })
                // alert("NESSUN ACCOUNT TROVATO");
            }        
        }
        else{
            if(!email.includes('@')){
                setValidEmail(false);
            }
            if(password.trim().length < 6){
                setValidPassword(false);
            }
            if(nome.trim().length <= 1){
                setValidNome(false);
            }
            if(cognome.trim().length <= 1){
                setValidCognome(false);
            }
            if(password !== passwordConferma){
                setValidPasswordConferma(false);
            }
        }
    }

    useEffect(() => {
        setValidEmail(true);
        setValidPassword(true);
        setValidNome(true);
        setValidCognome(true);
        setValidPasswordConferma(true);
        emailEsistente = null;
    }, [nome,cognome,email,password,titolo, passwordConferma]);

    const goToLoginForm = () => {
        // console.log("VAI AL FORM PER LOGGARE");
        props.goToLoginForm();
        // props.onShowMe('FORM-LOG_in');
    }

    const titoloChangeHandler = (event) =>{
        setTitolo(event.target.value);
        console.log(event.target.value);
    }

    const nomeChangeHandler = (event) =>{
        setNome(event.target.value);
        setValidNome(true);
    }

    const cognomeChangeHandler = (event) =>{
        setCognome(event.target.value);
        setValidCognome(true);
    }

    const emailChangeHandler = (event) =>{
        setEmail(event.target.value);
        setValidEmail(true);
    }

    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value);
        setValidPassword(true);
    }

    const passwordConfermaChangeHandler = (event) =>{
        setPasswordConferma(event.target.value);
        setValidPasswordConferma(true);
    }

    return (
        <Card>
          <form className={styles.center_elements} onSubmit={submitRegistration}>
            <img className={styles.img_size} src={logo} alt="Logo" />
            <h1 className={styles.title}>Registrazione</h1>
      
            <label className={styles.label_box}>Titolo</label>
      
            <p className={styles.dropdown_box}>
              Caregiver
              <span className={styles.tooltip}>
                <i className="fa fa-info-circle"></i> 
                <span className={styles.tooltipText}>Il caregiver è colui che si occupa del paziente</span>
              </span>
            </p>
      
            <label className={`${styles.label_box} ${!validEmail ? styles.invalid : ''}`}>Email</label>
            <input
              className={`${styles.input_box} ${!validEmail ? styles.invalid : ''}`}
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={emailChangeHandler}
            />
            {!validEmail && <div className={styles.error_message}>Inserisci una email valida</div>}
      
            <label className={`${styles.label_box} ${!validPassword ? styles.invalid : ''}`}>Password</label>
            <input
              className={`${styles.input_box} ${!validPassword ? styles.invalid : ''}`}
              type="password"
              placeholder="Inserisci la tua password"
              value={password}
              onChange={passwordChangeHandler}
            />
            {!validPassword && <div className={styles.error_message}>Inserisci una password con almeno 6 caratteri</div>}
      
            <label className={`${styles.label_box} ${!validPasswordConferma ? styles.invalid : ''}`}>Conferma Password</label>
            <input
              className={`${styles.input_box} ${!validPasswordConferma ? styles.invalid : ''}`}
              type="password"
              placeholder="Conferma la password"
              value={passwordConferma}
              onChange={passwordConfermaChangeHandler}
            />
            {!validPasswordConferma && <div className={styles.error_message}>La password non corrisponde</div>}
      
            <label className={`${styles.label_box} ${!validNome ? styles.invalid : ''}`}>Nome</label>
            <input
              className={`${styles.input_box} ${!validNome ? styles.invalid : ''}`}
              type="text"
              placeholder="Inserisci nome"
              value={nome}
              onChange={nomeChangeHandler}
            />
            {!validNome && <div className={styles.error_message}>Inserisci un nome valido</div>}
      
            <label className={`${styles.label_box} ${!validCognome ? styles.invalid : ''}`}>Cognome</label>
            <input
              className={`${styles.input_box} ${!validCognome ? styles.invalid : ''}`}
              type="text"
              placeholder="Inserisci cognome"
              value={cognome}
              onChange={cognomeChangeHandler}
            />
            {!validCognome && <div className={styles.error_message}>Inserisci un cognome valido</div>}
      
            {emailEsistente !== null && !emailEsistente && <h2>Registrazione effettuata!</h2>}
           
      
            <GenericButton type="submit" generic_button={true} buttonText="Registrati" />
      
            <h5 className={styles.log_reg} onClick={goToLoginForm}>Hai già un account? Accedi!</h5>
          </form>
        </Card>
      );
      
}

export default RegistrationForm;