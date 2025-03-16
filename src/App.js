// import logo from './logo.svg';
import './App.css';
import { useContext, useEffect, useState } from 'react';

import Login from './components/Accesso/Login';
import Pazienti from './components/Pazienti/Pazienti';
import MainMenu from './components/UI/MainMenu';

import Giochi from './components/Giochi/Giochi';
import AuthContext from './context/auth-context';
import { PatientContextProvider } from './context/patients-context';
import Modal from './components/UI/Modal';
import { GameContextProvider } from './context/game-context';
import { getServerMgr } from './backend_conn/ServerMgr';



import { Nav } from 'react-bootstrap';
import RoutingNew from './Routing';

function App() {
  const [singletonHasLoaded, setSingletonHasLoaded] = useState(false);
  const [schermataMostrata, setSchermataMostrata] = useState('');

  const auth_ctx = useContext(AuthContext);

  useEffect(() => {
    initSingleton()
    .then(setSingletonHasLoaded(true))
  }, [])

  // useEffect(async () => {
  //   let result = await getServerMgr().getAccount();
  //   console.log(result);
  // }, [])

  useEffect(() => {
    if(auth_ctx.tipoAccount === "Paziente"){
      setSchermataMostrata('SCHERMATA_Giochi')
    }
    else{
      setSchermataMostrata('SCHERMATA_Pazienti')
    }
  }, [auth_ctx.tipoAccount])

  function initSingleton(){
    return new Promise((resolve, reject) => {
      getServerMgr(resolve)
    })
  }

  function changeSchermata(schermata){
    console.log('CAMBIO SCHERMATA');

    switch(schermata){
      case 0:
        setSchermataMostrata('SCHERMATA_Pazienti');
        break;
  
      case 1:
        setSchermataMostrata('SCHERMATA_Attività');
        break;
  
      case 2:
        setSchermataMostrata('SCHERMATA_Giochi');
        break;
  
     
  
      default:
        break;
    }
  }

  if(singletonHasLoaded){
    return (
      <div className='App'>
  
        {/* {auth_ctx.utenteLoggato !== null && auth_ctx.logoutModal &&
         
          
        } */}
          
        {/* {auth_ctx.utenteLoggato === null && <Login></Login>} */}

        <PatientContextProvider>
        <GameContextProvider>
       
      

          <RoutingNew>
            {/* {auth_ctx.utenteLoggato !== null && 
              
              <MainMenu
                showSchermata = {changeSchermata}>
              </MainMenu>
            
            } */}
          </RoutingNew>
          
          {/* {auth_ctx.utenteLoggato !== null && schermataMostrata === 'SCHERMATA_Pazienti' && <div className='wrap_schermata'><Pazienti/></div>} */}
          {/* {auth_ctx.utenteLoggato !== null && schermataMostrata === 'SCHERMATA_Attività' &&
           
            <div className='wrap_schermata'>
              <Attività/>
            </div>
         
          } */}
          {/* {auth_ctx.utenteLoggato !== null && schermataMostrata === 'SCHERMATA_Giochi' && 
            
            <div className='wrap_schermata'>
              <Giochi/>
            </div>
            
          } */}
          {}
     
        
        </GameContextProvider>
        </PatientContextProvider>
  
      </div>
    );
  }
  else{
    return(
      <div>LOADINGG</div>
    );
  }

  
}

export default App;


{/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

        // <Login
        // onUserLogin = {userLoggedin}>
        // </Login>

        // <MainMenu
        // makeUserLogout = {userLoggedout}
        // showSchermata = {changeSchermata}>
        // </MainMenu>