import { useContext, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreaBox.module.css";
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr.js"; 

function CreaBox() {
    const navigate = useNavigate();
    const auth_ctx = useContext(AuthContext);
    const [pazienti, setPazienti] = useState([]);
    const [pazienteSelezionato, setPazienteSelezionato] = useState("");
    const [validPaziente, setValidPaziente] = useState(true);

    const [formData, setFormData] = useState({
        nome: "",
        cognome: "",
        citta: "",
        eta: "",
    });


    
        useEffect(() => {
            const fetchPazienti = async () => {
                try {
                    const result = await getServerMgr().getPatientsListArray(auth_ctx.utenteLoggatoUID);
                    if (Array.isArray(result)) {
                        setPazienti(result);
                    } else {
                        setPazienti([]);
                    }
                } catch (error) {
                    console.error("Errore nel recupero dei pazienti:", error);
                    setPazienti([]);
                }
            };
            if (auth_ctx.utenteLoggatoUID) {
                fetchPazienti();
            }
        }, [auth_ctx.utenteLoggatoUID]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handlePazienteChange = async (event) => {
        const pazienteId = event.target.value;  
        setPazienteSelezionato(pazienteId); 
        console.log("Paziente selezionato:", pazienteId);
        setValidPaziente(!!pazienteId);  
    
       
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { nome, cognome, citta, eta} = formData;
    
        try {
           
          

            
                const patientID = pazienteSelezionato;
    
                const boxResult = await getServerMgr().CreateBoxPatient(
                    patientID,
                    nome,
                    cognome,
                    citta,
                    eta
                    
                );
                console.log("risultato dell'inserimento",boxResult);
    
                if (boxResult!==null && boxResult!==undefined) {
                    console.log("Nuovo Box creato con ID:", boxResult.boxID);
                    alert("Box creata con successo");
                    navigate(`/box-dei-ricordi/${auth_ctx.utenteLoggatoUID}`);
                } else {
                    console.error("Errore nella creazione del box:", boxResult.error);
                }
             
        } catch (error) {
            console.error("Si è verificato un errore:", error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Crea una nuova Box</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                />

                <label>Cognome:</label>
                <input
                    type="text"
                    name="cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                    required
                />

                <label>Città:</label>
                <input
                    type="text"
                    name="citta"
                    value={formData.citta}
                    onChange={handleChange}
                    required
                />

                <label>Età:</label>
                <input
                    type="text"
                    name="eta"
                    value={formData.eta}
                    onChange={handleChange}
                    required
                />

{pazienti.length > 0 && (
                <>
                    <select
                        className={`${styles.textbox_style} ${!validPaziente ? styles.invalid : ""}`}
                        onChange={handlePazienteChange}
                        value={pazienteSelezionato}
                    >
                        <option value="">Seleziona</option>
                        {pazienti.map((paziente) => (
                            <option key={paziente.ID} value={paziente.ID}>
                                {paziente.nome} {paziente.cognome}
                            </option>
                        ))}
                    </select>
                </>
            )}

            
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.createButton}>Crea</button>
                    <button 
                        type="button" 
                        className={styles.backButton} 
                        onClick={() => navigate(`/box-dei-ricordi/${auth_ctx.utenteLoggatoUID}`)}
                    >
                        Indietro
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreaBox;
