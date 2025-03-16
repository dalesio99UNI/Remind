import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServerMgr } from "../../backend_conn/ServerMgr.js";
import styles from "./ModificaBox.module.css";
import AuthContext from "../../context/auth-context";

function ModificaBox() {
    const { boxID } = useParams();
    const navigate = useNavigate();
    const auth_ctx = useContext(AuthContext);

   
    console.log("Box ID:", boxID); 

   
    const [boxData, setBoxData] = useState({
        nome_box: "",
        cognome_box: "",
        citta: "",
        eta_box: ""
    });

   
    const [initialBoxData, setInitialBoxData] = useState({
        nome_box: "",
        cognome_box: "",
        citta: "",
        eta_box: ""
    });

    
    useEffect(() => {
        const fetchBox = async () => {
            try {
                const data = await getServerMgr().getBoxPazienteByID(boxID);
                console.log("qui stampo i dati prima di modificare la box",data);
                const box = data[0];

               

                if (box) {
                    
                    setBoxData({
                        nome_box: box.nome_box || "",
                        cognome_box: box.cognome_box || "",
                        citta: box.citta || "",
                        eta_box: box.eta_box || "",
                    });
                    
                    setInitialBoxData({
                        nome_box: box.nome_box || "",
                        cognome_box: box.cognome_box || "",
                        citta: box.citta || "",
                        eta_box: box.eta_box || "",
                    });
                }
            } catch (error) {
                console.error("Errore nel recupero del box:", error);
            }
        };

        fetchBox();
    }, [boxID]);

    
    const handleInputChange = (field, value) => {
        setBoxData({
            ...boxData,
            [field]: value
        });
    };


    const handleSave = async () => {
        try {
            console.log("dati passati per l'aggiornamento:", boxData);
console.log("dati iniziali:",initialBoxData);
        
            const updatedBoxData = {
                nome_box: boxData.nome_box.trim() || initialBoxData.nome_box,
                cognome_box: boxData.cognome_box.trim() || initialBoxData.cognome_box,
                citta: boxData.citta.trim() || initialBoxData.citta,
                eta_box: typeof boxData.eta_box === 'string' ? boxData.eta_box.trim() : boxData.eta_box || initialBoxData.eta_box,
            };
            console.log("dati passati" ,updatedBoxData);

            if (
                updatedBoxData.nome_box === initialBoxData.nome_box &&
                updatedBoxData.cognome_box === initialBoxData.cognome_box &&
                updatedBoxData.citta === initialBoxData.citta &&
                updatedBoxData.eta_box === initialBoxData.eta_box
            ) {
                alert("Nessuna modifica effettuata.");
                return;
            }

         
            await getServerMgr().updateBox(boxID, updatedBoxData);
            navigate(`/box-dei-ricordi/${auth_ctx.utenteLoggatoUID}`); 
            alert("Le modifiche sono state salvate con successo!");
        } catch (error) {
            console.error("Errore durante la modifica:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Modifica Box</h2>
    
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    name="nome"
                    value={boxData.nome_box}
                    onChange={(e) => handleInputChange('nome_box', e.target.value)}
                    placeholder="Nome"
                    className={styles.inputField}
                />
                <input
                    type="text"
                    name="cognome"
                    value={boxData.cognome_box}
                    onChange={(e) => handleInputChange('cognome_box', e.target.value)}
                    placeholder="Cognome"
                    className={styles.inputField}
                />
                <input
                    type="text"
                    name="citta"
                    value={boxData.citta}
                    onChange={(e) => handleInputChange('citta', e.target.value)}
                    placeholder="Città"
                    className={styles.inputField}
                />
                <input
                    type="text"
                    name="eta"
                    value={boxData.eta_box}
                    onChange={(e) => handleInputChange('eta_box', e.target.value)}
                    placeholder="Età"
                    className={styles.inputField}
                />
            </div>
    
            <div className={styles.buttonsContainer}>
                <button onClick={handleSave} className={styles.saveButton}>
                    Salva Modifiche
                </button>
                <button
                    type="button"
                    className={styles.backButton}
                    onClick={() => navigate(`/box-dei-ricordi/${auth_ctx.utenteLoggatoUID}`)}
                >
                    Indietro
                </button>
            </div>
        </div>
    );
    
}

export default ModificaBox;
