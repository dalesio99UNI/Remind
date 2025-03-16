import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import './App.css';
import CambioPsw from "./components/Accesso/CambioPsw";
import Pazienti from "./components/Pazienti/Pazienti";
import DettagliBox from "./components/Ricordi/DettagliBox";
import BoxDeiRicordi from "./components/Ricordi/BoxDeiRicordi"
import ModificaBox from "./components/Ricordi/ModificaBox";
import CreaBox from "./components/Ricordi/CreaBox";
import Giochi from "./components/Giochi/Giochi";
import Login from "./components/Accesso/Login";
import MainMenu from "./components/UI/MainMenu";
import QRCodeLogin from "./components/Accesso/QRCodeLogin";
import Domande from "./components/Giochi/Domande";
import CreaDomanda from "./components/Giochi/CreaDomanda";
import InserisciRicordo from "./components/Ricordi/InserisciRicordo";
import VisualizzaRicordo from "./components/Ricordi/VisualizzaRicordo";
import DettaglioRicordo from "./components/Ricordi/DettaglioRicordo";
import ModificaRicordo from "./components/Ricordi/ModificaRicordo";

function RoutingNew(){
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login></Login>}></Route>
                <Route path="/QRCodeLogin/:UID" element={<QRCodeLogin></QRCodeLogin>}></Route>
                <Route path="/pazienti/:userID" element={
                    <>
                        <MainMenu
                            selected={"PAZIENTI"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Pazienti></Pazienti>
                        </div>
                    </>
                }>
                </Route>
                
               
                <Route path="/giochi/:userID" element={
                    <>
                        <MainMenu
                            selected={"GIOCHI"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Giochi></Giochi>
                        </div>
                    </>
                }>
                </Route>
                <Route path="/domande/:userID" element={
                    <>
                        <MainMenu
                            selected={"DOMANDE"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <Domande></Domande>
                        </div>
                    </>
                }>
                    </Route>
                    
                  
                <Route path="/box-dei-ricordi/:userID" element={
                    <>
                        <MainMenu selected={"BOX DEI RICORDI"} />
                        <div className="wrap_schermata">
                            <BoxDeiRicordi />
                        </div>
                    </>
                }>
                </Route>
                
<Route path="/box-dei-ricordi/dettagliBox/:userID/:boxID" element={
    <>
        <MainMenu selected={"BOX DEI RICORDI"} />
        <div className="wrap_schermata">
            <DettagliBox /> 
        </div>
    </>
} />
<Route  path="/box-dei-ricordi/dettagliBox/dettagli-ricordo/:userID/:boxID/:IdRicordo" 
                    element={
                        <>
                            <MainMenu selected={"BOX DEI RICORDI"} />
                            <div className="wrap_schermata">
                                <DettaglioRicordo /> 
                            </div>
                        </>
                    }  />


<Route  path="/box-dei-ricordi/dettagliBox/dettagli-ricordo/inserisci-ricordo/:boxID" 
                    element={
                        <>
                            <MainMenu selected={"BOX DEI RICORDI"} />
                            <div className="wrap_schermata">
                                <InserisciRicordo /> 
                            </div>
                        </>
                    }  />


<Route 
    path="/box-dei-ricordi/dettagliBox/dettagli-ricordo/RicordoSingolo/visualizza-ricordo/:idRicordo" 
    element={
        <>
            <MainMenu selected={"BOX DEI RICORDI"} />
            <div className="wrap_schermata">
                <VisualizzaRicordo/>  
            </div>
        </>
    }
/>
<Route 
    path="/box-dei-ricordi/dettagliBox/dettagli-ricordo/RicordoSingolo/modifica-ricordo/:idRicordo" 
    element={
        <>
            <MainMenu selected={"BOX DEI RICORDI"} />
            <div className="wrap_schermata">
                <ModificaRicordo/> 
            </div>
        </>
    }
/>




              
                <Route path="/box-dei-ricordi/crea-box/:userID" element={
                    <>
                        <MainMenu selected={"BOX DEI RICORDI"} />
                        <div className="wrap_schermata">
                            <CreaBox />
                        </div>
                    </>
                }>
                </Route>
                


                <Route path="/box-dei-ricordi/modifica/:userID/:boxID" element={
                  <>
                 <MainMenu selected={"BOX DEI RICORDI"} />
                 <div className="wrap_schermata">
                 <ModificaBox />
                  </div>
                            </>
                              }>
                     </Route>


                <Route path="/domande/creaDomanda/:userID" element={
                    <>
                        <MainMenu
                            selected={"DOMANDE"}
                        ></MainMenu>
                        <div className="wrap_schermata">
                            <CreaDomanda></CreaDomanda>
                        </div>
                    </>
                }>
                </Route>
                <Route path="/psw_recovery" element={<CambioPsw></CambioPsw>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutingNew;