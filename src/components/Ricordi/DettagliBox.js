import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServerMgr } from "../../backend_conn/ServerMgr.js";
import RicordoSingolo from "./RicordoSingolo";
import styles from "./DettagliBox.module.css"; 

function DettagliBox() {
    const { userID, boxID} = useParams();
    const [box, setBox] = useState(null);
    const [filtroTipo, setFiltroTipo] = useState("");
    const [filtroTitolo, setFiltroTitolo] = useState("");
    const [ricordi, setRicordi] = useState([]);
    const navigate = useNavigate();


    

    console.log("userID:", userID);
    console.log("boxID:", boxID);
    
    console.log("recupero del box ID", boxID);

    useEffect(() => {
        
        const EstraiRicordi = async () => {
            try {
                const data = await getServerMgr().getRicordiByBoxId(boxID);
                console.log("Ricordi ricevuti:", data);
                setRicordi(data); 
            } catch (error) {
                console.error("Errore nel recupero dei ricordi e multimedia:", error);
            }
        };
    
        EstraiRicordi();
    }, [boxID]);
    

    const handleInserisciRicordo = () => {
        navigate(`/box-dei-ricordi/dettagliBox/dettagli-ricordo/inserisci-ricordo/${boxID}`);
    };

    const handleBack = () => {
        navigate(-1);
    };
    

    return (
        <div className={styles.container}>
            
            <button className={styles.backButton} onClick={handleBack}>
                ← Indietro
            </button>
    
            
            <div className={styles.filterBar}>
                
                <select 
                    id="filtro" 
                    value={filtroTipo} 
                    onChange={(e) => setFiltroTipo(e.target.value)}
                >
                    <option value="" disabled hidden>Tipo Ricordo</option>
                    <option value="">Tutti</option>
                    <option value="immagine">Immagini</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="luogo">Luogo</option>
                </select>
    
         
                <button className={styles.insertButton} onClick={handleInserisciRicordo}>
                    Inserisci Ricordo
                </button>
    
               
                <input 
                    type="text" 
                    className={styles.searchInput} 
                    placeholder="Cerca per titolo..." 
                    value={filtroTitolo} 
                    onChange={(e) => setFiltroTitolo(e.target.value)} 
                />
            </div>
    
          
            <div className={styles.ricordiList}>
                {ricordi
                    .filter(ricordo => 
                        (filtroTipo === "" || ricordo.tipo === filtroTipo) &&
                        (filtroTitolo === "" || ricordo.titolo.toLowerCase().includes(filtroTitolo.toLowerCase()))
                    )
                    .map((ricordo) => {
                        console.log("ID Ricordo:", ricordo.id_ricordo); 
                        return (
                            <RicordoSingolo 
                                key={ricordo.id_ricordo}
                                titolo={ricordo.titolo}
                                tipo={ricordo.tipo}
                                multimedia={ricordo.multimedia}
                                longitudine={ricordo.longitudine}
                                latitudine={ricordo.latitudine}
                                descrizione={ricordo.descrizione}
                                idRicordo={ricordo.id_ricordo} 
                                boxID={boxID}
                            />
                        );
                    })}
            </div>
        </div>
    );
    
}

export default DettagliBox;
