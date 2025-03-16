import { useContext, useState, useEffect } from "react";
import BoxRicordo from "./BoxRicordoLayout"; 
import styles from "./BoxDeiRicordi.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr.js";

function BoxDeiRicordi() {
    const auth_ctx = useContext(AuthContext);
    const navigate = useNavigate();
    const [ricordi, setRicordi] = useState([]);
    const [filtroNome, setFiltroNome] = useState("");
    const UID = auth_ctx.utenteLoggatoUID;
    const tipoAccount = auth_ctx.tipoAccount;
    const isDoctor = tipoAccount === "Caregiver";

    console.log("UID del DOC", UID);

    const getBoxByUID = async (uid) => {
        try {

            console.log("stampo utente loggato", auth_ctx.utenteLoggatoUID);
            console.log("stampo tipo utente", isDoctor);
            const result = await getServerMgr().getBoxByUID(auth_ctx.utenteLoggatoUID, isDoctor);
            console.log("stampo tutte le box", result);
            if (Array.isArray(result)) {
                setRicordi(result);
            } else {
                setRicordi([]);
                console.error("Errore: i dati recuperati non sono un array", result);
            }
        } catch (error) {
            setRicordi([]);
            console.error("Errore nel recupero dei dati:", error);
        }
    };

    useEffect(() => {
        if (auth_ctx.utenteLoggatoUID) {
            getBoxByUID(auth_ctx.utenteLoggatoUID);
        }
    }, [auth_ctx.utenteLoggatoUID]);

    const handleFiltroNome = (event) => {
        setFiltroNome(event.target.value.toLowerCase());
    };

    const ricordiFiltrati = ricordi.filter(box => {
        console.log(box);
        const nome = box.nome_box ? box.nome_box.toLowerCase() : '';
        const cognome = box.cognome_box ? box.cognome_box.toLowerCase() : '';
        const nomeCompleto = `${nome} ${cognome}`;
        return filtroNome === "" || nomeCompleto.includes(filtroNome);
    });

    const handleDelete = async (idBox) => {
        if (window.confirm("Sei sicuro di voler eliminare questa box?")) {
            try {
                await getServerMgr().deleteBoxByID(idBox);
                console.log("ID usato per eliminare la box:", idBox);
    
              
                setRicordi((prevRicordi) => prevRicordi.filter((box) => box.id_box !== idBox));
    
                alert("Box eliminata con successo");
                console.log(`Box con ID ${idBox} eliminato con successo.`);
            } catch (error) {
                alert("Errore nell'eliminazione della box");
                console.error("Errore nell'eliminazione della box:", error);
            }
        }
    };
    

    const handleEdit = (idBox) => {
        console.log("Navigating to:", `/box-dei-ricordi/modifica/${auth_ctx.utenteLoggatoUID}/${idBox}`);
        navigate(`/box-dei-ricordi/modifica/${auth_ctx.utenteLoggatoUID}/${idBox}`);
    };

    return (
        <div className={styles.container}>
          
            <h1 className={styles.title}>📦 Box dei Ricordi</h1>
    
           
            <div className={styles.filterBar}>
                {isDoctor && (
                    <Link to={`/box-dei-ricordi/crea-box/${auth_ctx.utenteLoggatoUID}`}>
                        <button className={styles.createButton}>➕ Crea Box</button>
                    </Link>
                )}
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="🔍 Cerca per nome..."
                    onChange={handleFiltroNome}
                />
            </div>
    
           
            <div className={styles.boxContainer}>
                {ricordiFiltrati.length > 0 ? (
                    ricordiFiltrati.map((box) => (
                        <BoxRicordo
                            key={box.id_box || `${box.nome_box}-${box.cognome_box}-${box.citta}`}
                            nome={box.nome_box}
                            cognome={box.cognome_box}
                            citta={box.citta}
                            eta={box.eta_box}
                            onView={() => navigate(`/box-dei-ricordi/dettagliBox/${auth_ctx.utenteLoggatoUID}/${box.id_box}`)}
                            onEdit={() => handleEdit(box.id_box)}
                            onDelete={() => handleDelete(box.id_box)}
                            isDoctor={isDoctor}
                        />
                    ))
                ) : (
                    <p className={styles.noResults}>⚠️ Nessun box trovato.</p>
                )}
            </div>
        </div>
    );
    
}

export default BoxDeiRicordi;
