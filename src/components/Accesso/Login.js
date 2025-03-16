import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import PswDimenticata from "./PswDimenticata";
import CambioPsw from "./CambioPsw";
import WelcomePage from "./WelcomePage";

function Login(){
    const [mostraForm, setMostraForm] = useState('WELCOME');

    function showRegistrationForm(){
        setMostraForm('REGISTRATION');
        console.log('FORM CAMBIATO -> REGISTRAZIONE');
    }

    function showLoginForm(){
        setMostraForm('LOGIN');
        console.log('FORM CAMBIATO -> LOGIN')
    }

    function showRecuperoPassword(){
        setMostraForm('RECUPERO_PASSWORD');
        console.log('FORM CAMBIATO -> RECUPERO_PASSWORD')
    }

    return(
        <>
        {mostraForm === 'WELCOME' && 
            <WelcomePage
                goToLogin={showLoginForm}
            ></WelcomePage>
        }
        {mostraForm === 'LOGIN' && 
        <>
            <LoginForm
                goToPswDiment = {showRecuperoPassword}
                goToRegForm = {showRegistrationForm}
            >
            </LoginForm>
        </>
        }
        {mostraForm === 'REGISTRATION' && 
            <RegistrationForm
                goToLoginForm = {showLoginForm}
            >
            </RegistrationForm>
        }
        {mostraForm === 'RECUPERO_PASSWORD' && 
            <PswDimenticata
                goToLoginForm={showLoginForm}
            >
            </PswDimenticata>
            // <CambioPsw></CambioPsw>
        }
        </>
    );
}

export default Login;