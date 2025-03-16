import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { getServerMgr } from "../../backend_conn/ServerMgr.js";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'; 
import 'leaflet-fullscreen';
import L from 'leaflet';
import styles from "./VisualizzaRicordo.module.css";


function FullscreenControl() {
    const map = useMap();

    useEffect(() => {
        if (map) {
            map.addControl(new L.Control.Fullscreen());
        }
    }, [map]);

    return null;
}


function VisualizzaRicordo() {
    const { idRicordo } = useParams();  
    const [ricordo, setRicordo] = useState(null);
const navigate = useNavigate();
    console.log("ID Ricordo da VisualizzaRicordo", idRicordo);  




    useEffect(() => {
        const fetchRicordoDetails = async () => {
            try {
                const data = await getServerMgr().getRicordoById(idRicordo);
                console.log("Dettagli Ricordo:", data);
                setRicordo(data);
            } catch (error) {
                console.error("Errore nel recupero dei dettagli del ricordo:", error);
            }
        };

        fetchRicordoDetails();
    }, [idRicordo]);  

    if (!ricordo) {
        return <div className={styles.loading}>Caricamento...</div>;
    }


    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className={styles.detailsContainer}>
             <div className={styles.header}>
    <button className={styles.backButton} onClick={handleBack}>
        ← Indietro
    </button>
    <h1 className={styles.title}>{ricordo.titolo}</h1>
</div>

<p><strong>Tipo:</strong> {ricordo.tipo}</p>
<p><strong>Descrizione:</strong> {ricordo.descrizione}</p>

            <div className={styles.mediaContainer}>
                {ricordo.tipo === "luogo" && ricordo.latitudine && ricordo.longitudine ? (
                    <div className={styles.mapContainer}>
                        <h4>Posizione del Ricordo</h4>
                        <MapContainer 
                            center={[ricordo.latitudine, ricordo.longitudine]} 
                            zoom={13} 
                            style={{ width: '100%', height: '600px' }}
                        >
                            <FullscreenControl />
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker 
  position={[ricordo.latitudine, ricordo.longitudine]} 
  icon={new L.Icon({
    iconUrl: '/immagini/marker-icon-2x.png', 
    iconSize: [30, 30],                  
    iconAnchor: [16, 32],                 
    popupAnchor: [0, -32]                 
  })}
>
  <Popup>Posizione del ricordo</Popup>
</Marker>
                        </MapContainer>
                    </div>
                ) : (
                    ricordo.multimedia.map((file, index) => {
                        const fileUrl = `/immagini/${file.url.split('/').pop()}`;

                        if (file.tipo.includes("immagine")) {
                            return <img key={index} src={fileUrl} alt={`Immagine ${index + 1}`} className={styles.detailImage} />;
                        } 
                        if (file.tipo.includes("video")) {
                            return (
                                <video key={index} controls className={styles.detailVideo}>
                                    <source src={fileUrl} type="video/mp4" />
                                    Il tuo browser non supporta il video.
                                </video>
                            );
                        }
                        if (file.tipo.includes("audio")) {
                            return (
                                <audio key={index} controls className={styles.detailAudio}>
                                    <source src={fileUrl} type="audio/mpeg" />
                                    Il tuo browser non supporta l'audio.
                                </audio>
                            );
                        }
                        return null;
                    })
                )}
            </div>

        

        </div>
    );
}

export default VisualizzaRicordo;
