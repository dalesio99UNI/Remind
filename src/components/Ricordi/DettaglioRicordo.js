import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getServerMgr } from "../../backend_conn/ServerMgr.js";
import styles from "./DettaglioRicordo.module.css"; 

function DettaglioRicordo() {
    const {userID,boxID, IdRicordo } = useParams(); 
    const [ricordo, setRicordo] = useState(null);

console.log("id ricordo", IdRicordo);


    useEffect(() => {
        const fetchRicordoDetails = async () => {
            try {
                const data = await getServerMgr().getRicordoByID(IdRicordo); 
                setRicordo(data);
            } catch (error) {
                console.error("Errore nel recupero dei dettagli del ricordo:", error);
            }
        };

        fetchRicordoDetails();
    }, [IdRicordo]);

    return (
        <div className={styles.container}>
            {ricordo ? (
                <div className={styles.ricordoDetails}>
                    <h2>{ricordo.titolo}</h2>
                    <p><strong>Tipo:</strong> {ricordo.tipo}</p>
                    <div className={styles.multimedia}>
                        {ricordo.multimedia.map((media, index) => (
                            <div key={index} className={styles.mediaItem}>
                               {media.includes(".mp4") ? (
    <video controls className={styles.media}>
        <source src={media} type="video/mp4" />
        Il tuo browser non supporta il video.
    </video>
) : media.includes(".jpg") || media.includes(".png") ? (
    <img className={styles.media} src={media} alt={`Media ${index}`} />
) : media.includes(".mp3") || media.includes(".wav") || media.includes(".ogg") ? (
    <audio controls className={styles.media}>
        <source src={media} type="audio/mpeg" />
        Il tuo browser non supporta l'audio.
    </audio>
) : (
    <p>Formato non supportato</p>
)}

                            </div>
                        ))}
                    </div>
                    <p>{ricordo.descrizione}</p>
                </div>
            ) : (
                <p>Caricamento...</p>
            )}
        </div>
    );
}

export default DettaglioRicordo;
