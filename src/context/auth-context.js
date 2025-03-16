import React, { useEffect, useState } from "react";
import { getServerMgr } from "../backend_conn/ServerMgr";

const AuthContext = React.createContext({
    login: () => {},
    isLogged: false,
    logoutModal: null,
    onLogoutClick: () => {},
    cancelLogout: () => {},
    onLogout: () => {},
    utenteLoggato: null,
    utenteLoggatoUID: null,
    pazienteLoggatoID: null,
    mantieniUtenteLoggato: () => {},
    tipoAccount: null,
    nomeUtenteLoggato: null,
    cognomeUtenteLoggato: null,
    confirmPasswordReset: () => {}
});

export function AuthContextProvider(props) {
    const [utenteLoggato, setUtenteLoggato] = useState(null);
    const [utenteLoggatoUID, setUtenteLoggatoUID] = useState(null);
    const [pazienteLoggatoID, setPazienteLoggatoID] = useState(null);
    const [tipoAccount, setTipoAccount] = useState('');
    const [nomeUtente, setNomeUtente] = useState('');
    const [cognomeUtente, setCognomeUtente] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    
    useEffect(() => {
        if (sessionStorage.getItem('UID') !== null) {
            keepUserLogged();
        }
    }, []);

    function setAccountLogged(email, UID, tipoAccount, nome, cognome, pazienteID) {
        setUtenteLoggato(email);
        setUtenteLoggatoUID(UID);
        setNomeUtente(nome);
        setCognomeUtente(cognome);
        setPazienteLoggatoID(pazienteID);
        switch (tipoAccount) {
            case 1:
                setTipoAccount("Caregiver");
                break;
            case 2:
                setTipoAccount("Paziente");
                break;
            default:
                break;
        }
    }

   
    async function keepUserLogged() {
      try {
          let result = await getServerMgr().keepUserLoggedIn(sessionStorage.getItem('UID'));
          console.log("oggetto stampato dopo refresh",result);
          console.log("stampa dell'id di sessione ",sessionStorage.getItem('UID'));
         
          if (result && result.email) {
              setUtenteLoggatoUID(sessionStorage.getItem('UID'));
              setUtenteLoggato(result.email);
              setNomeUtente(result.nome);
              setCognomeUtente(result.cognome);
              setPazienteLoggatoID(result.patientID);
              
              switch (result.titolo) {
                  case 1:
                      setTipoAccount("Caregiver");
                      break;
                  case 2:
                      setTipoAccount("Paziente");
                      break;
                  default:
                      setTipoAccount("Sconosciuto");
                      break;
              }
          } else {
              console.error("Nessun dato utente trovato:", result);
          }
      } catch (err) {
          console.error("Errore nel recupero dei dati dell'utente:", err);
      }
  }
  

    function userClickedLoggedout() {
        setShowLogoutModal(true);
    }

    function closeModalLogout() {
        setShowLogoutModal(false);
    }

  
    function userLoggedout() {
        sessionStorage.removeItem('UID');  
        console.log('EFFETTUO LOGOUT');
        setUtenteLoggato(null);
        setUtenteLoggatoUID(null);
        setTipoAccount('');
        closeModalLogout();
    }

    return (
        <AuthContext.Provider
            value={{
                login: setAccountLogged,
                logoutModal: showLogoutModal,
                onLogoutClick: userClickedLoggedout,
                cancelLogout: closeModalLogout,
                onLogout: userLoggedout,
                utenteLoggato: utenteLoggato,
                utenteLoggatoUID: utenteLoggatoUID,
                pazienteLoggatoID: pazienteLoggatoID,
                mantieniUtenteLoggato: keepUserLogged,
                tipoAccount: tipoAccount,
                nomeUtenteLoggato: nomeUtente,
                cognomeUtenteLoggato: cognomeUtente,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
