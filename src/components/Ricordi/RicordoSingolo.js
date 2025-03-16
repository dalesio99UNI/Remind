import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'; 
import L from 'leaflet'; 
import styles from "./RicordoSingolo.module.css";
import 'leaflet-fullscreen';
import { getServerMgr } from "../../backend_conn/ServerMgr.js";


function FullscreenControl() {
    const map = useMap();

    useEffect(() => {
        L.control.fullscreen({ position: 'topright' }).addTo(map);
    }, [map]);

    return null;
}

function RicordoSingolo({ titolo, tipo, multimedia, descrizione, idRicordo, latitudine, longitudine, onDelete,boxID }) {
    const navigate = useNavigate();
    const ricordo = {
        idRicordo,
        titolo,
        tipo,
        descrizione,
        latitudine,
        longitudine,
        multimedia
    };
    const file = tipo !== "luogo" && multimedia?.length > 0 ? multimedia[0] : null;
    const fileUrl = file ? `/immagini/${file.url.split('/').pop()}` : null;
    const fileType = file ? file.tipo : null;

    console.log("Latitudine:", latitudine, "Longitudine:", longitudine);

    const handleViewDetails = () => {
        navigate(`/box-dei-ricordi/dettagliBox/dettagli-ricordo/RicordoSingolo/visualizza-ricordo/${idRicordo}`);
    };

    const handleEdit = () => {
        navigate(`/box-dei-ricordi/dettagliBox/dettagli-ricordo/RicordoSingolo/modifica-ricordo/${idRicordo}`, {
            state: { ricordo,boxID }  
        });
    };
    

    const handleDelete = async () => {
        if (window.confirm("Sei sicuro di voler eliminare questo ricordo?")) {
            try {
               
                const response = await getServerMgr().deleteRicordoById(idRicordo);
                
                
                if (response.success) {
                    alert("Eliminazione avvenuta con successo!");
                   window.location.reload();
                } else {
                    alert("Errore nell'eliminazione del ricordo.");
                }
            } catch (error) {
                console.error("Errore nell'eliminazione del ricordo:", error);
                alert("Si è verificato un errore, riprova.");
            }
        }
    };
    
    

    return (
        <div className={styles.ricordoItem}>
            <h3>{titolo}</h3>
            <p><strong>Tipo:</strong> {tipo}</p>
            {multimedia?.length > 1 && (
    <p className={styles.multimediaHint}>
        📂 Più file disponibili. Clicca su <strong>Visualizza</strong> per vederli tutti.
    </p>
)}
            <div className={styles.mediaContainer}>
                {tipo !== "luogo" && file ? (
                    <>
                        {fileType.includes("immagine") && (
                            <img src={fileUrl} alt={titolo} className={styles.previewImage} />
                        )}
                        {fileType.includes("video") && (
                            <video controls className={styles.previewVideo}>
                                <source src={fileUrl} type="video/mp4" />
                                Il tuo browser non supporta il video.
                            </video>
                        )}
                        {fileType.includes("audio") && (
                            <audio controls className={styles.previewAudio}>
                                <source src={fileUrl} type="audio/mpeg" />
                                Il tuo browser non supporta l'audio.
                            </audio>
                        )}
                    </>
                ) : (
                    tipo === "luogo" && latitudine && longitudine && (
                        <div className={styles.mapContainer}>
                            <h4>Posizione del Ricordo</h4>
                            <MapContainer 
                                center={[latitudine, longitudine]} 
                                zoom={13}
                                className={styles.leafletMap}
                            >
                                <FullscreenControl /> 
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[latitudine, longitudine]}  icon={new L.Icon({
                                    iconUrl: '/immagini/marker-icon-2x.png',  
                                    iconSize: [30, 30],                   
                                    iconAnchor: [16, 32],                
                                    popupAnchor: [0, -32]                 
                                  })}>
                                    <Popup>Posizione del ricordo</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    )
                )}
            </div>

            <p>{descrizione}</p>

            <div className={styles.buttonContainer}>
                <button className={styles.viewButton} onClick={handleViewDetails}>Visualizza</button>
                <button className={styles.editButton} onClick={handleEdit}>Modifica</button>
                <button className={styles.deleteButton} onClick={handleDelete}>Elimina</button>
            </div>
        </div>
    );
}

export default RicordoSingolo;
