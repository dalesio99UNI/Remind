import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import styles from "./ModificaRicordo.module.css"; 
import { useLocation } from "react-router-dom"; 
import { getServerMgr } from "../../backend_conn/ServerMgr.js";
import L from 'leaflet';
import AuthContext from "../../context/auth-context";

function LocationMarker({ setLatitudine, setLongitudine }) {
    useMapEvents({
        click(e) {
            setLatitudine(e.latlng.lat);
            setLongitudine(e.latlng.lng);
        }
    });

    return null; 
}

function ModificaRicordo() {
    const auth_ctx = useContext(AuthContext);
    const { idRicordo, boxID } = useParams();
    const navigate = useNavigate();
    const location = useLocation(); 
    const ricordo = location.state?.ricordo; 
    const BOXid = location.state.boxID;
    const UID = auth_ctx.utenteLoggatoUID;

    
    const [titolo, setTitolo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [tipo, setTipo] = useState(ricordo.tipo);
    const [latitudine, setLatitudine] = useState("");
    const [longitudine, setLongitudine] = useState("");
    const [files, setFiles] = useState([]);
    const [OldLatitudine, OldsetLatitudine] = useState(ricordo ? ricordo.latitudine : 0); 
    const [OldLongitudine, OldsetLongitudine] = useState(ricordo ? ricordo.longitudine : 0); 
    const [oldMultimedia, setOldMultimedia] = useState(ricordo ? ricordo.multimedia : []); 

    
    useEffect(() => {
        if (ricordo) {
            setTitolo(ricordo.titolo);
            setDescrizione(ricordo.descrizione);
            setTipo(ricordo.tipo);
            OldsetLatitudine(ricordo.latitudine);
            OldsetLongitudine(ricordo.longitudine);
            setOldMultimedia(ricordo.multimedia || []);
         
            if (ricordo.tipo === "luogo") {
                setLatitudine(ricordo.latitudine || "");
                setLongitudine(ricordo.longitudine || "");
            }
        }
    }, [ricordo]);

   
    const handleTipoChange = (e) => {
        const newTipo = e.target.value;
        setTipo(newTipo);

        
        if (newTipo !== "luogo") {
            setLatitudine("");
            setLongitudine("");
            OldsetLatitudine("");
            OldsetLongitudine("");
        } else {
            
            setLatitudine(OldLatitudine || "");
            setLongitudine(OldLongitudine || "");
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files; 
        if (selectedFiles && selectedFiles.length > 0) {
            
            const newFiles = Array.from(selectedFiles);
            
           
            setFiles(newFiles);
        }
    };

    
    const handleSave = async (e) => {
        e.preventDefault();

      
        const newLatitudine = latitudine || OldLatitudine;
        const newLongitudine = longitudine || OldLongitudine;

       
        const newMultimedia = files.length > 0 ? files : oldMultimedia;

       
        const multimediaFormatted = newMultimedia.map(item => {
            if (item && item.name) {
                return { url: "immagini/" + item.name }; 
            } else if (item && item.url) {
                return { url: item.url };
            }
            return null; 
        }).filter(item => item !== null); 

   
        const updatedRicordo = {
            id_ricordo: idRicordo,
            titolo: titolo,
            descrizione: descrizione,
            tipo: tipo,
            latitudine: tipo === "luogo" ? parseFloat(newLatitudine) : null,
            longitudine: tipo === "luogo" ? parseFloat(newLongitudine) : null,
            multimedia: multimediaFormatted,
        };

        console.log("Stampo il ricordo prima di aggiornare:", updatedRicordo);

        try {
           
            await getServerMgr().updateRicordo(idRicordo, updatedRicordo, (result) => {
                console.log("Ricordo aggiornato con successo:", result);
              
                alert("Modifiche effettuate con successo");
                navigate(`/box-dei-ricordi/dettagliBox/${UID}/${BOXid}`);
            });
        } catch (error) {
            console.error("Errore nell'aggiornamento del ricordo:", error);
            alert("Errore nell'aggiornamento del ricordo");
        }
    };

    
    const defaultLat = 41.9028;
    const defaultLng = 12.4964;

    
    const currentLat = latitudine || OldLatitudine || defaultLat;
    const currentLng = longitudine || OldLongitudine || defaultLng;

    return (
        <div className={styles.container}>
            <h2>Modifica Ricordo</h2>
            <form onSubmit={handleSave} className={styles.form}>
                <label>
                    Titolo:
                    <input
                        type="text"
                        value={titolo}
                        onChange={(e) => setTitolo(e.target.value)}
                        className={styles.inputField}
                    />
                </label>
                <label>
                    Descrizione:
                    <textarea
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                        className={styles.textareaField}
                    />
                </label>
                <label>
                    Tipo:
                    <select
                        value={tipo}
                        onChange={handleTipoChange} 
                        className={styles.selectField}
                    >
                        <option value="luogo">Luogo</option>
                        <option value="immagine">Immagine</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                    </select>
                </label>

               
                {tipo === "luogo" && (
                    <>
                        <label>Seleziona posizione sulla mappa:</label>
                        <div className={styles.mapContainer}>
                            <MapContainer
                                center={[currentLat, currentLng]} 
                                zoom={13}
                                style={{ height: "300px", width: "100%" }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <LocationMarker setLatitudine={setLatitudine} setLongitudine={setLongitudine} />
                                {(currentLat !== 0 && currentLng !== 0) && (
                                    <Marker position={[currentLat, currentLng]} icon={new L.Icon({
                                        iconUrl: '/immagini/marker-icon-2x.png', 
                                        iconSize: [30, 30],                   
                                        iconAnchor: [16, 32],                 
                                        popupAnchor: [0, -32]                 
                                    })}>
                                        <Popup>Posizione del ricordo</Popup>
                                    </Marker>
                                )}
                            </MapContainer>
                        </div>
                    </>
                )}

              
                {(tipo === "immagine" || tipo === "video" || tipo === "audio") && (
                    <>
                        <label>
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}:
                            <input
                                type="file"
                                accept={tipo === "immagine" ? "image/*" : tipo === "video" ? "video/*" : "audio/*"}
                                onChange={handleFileChange}
                                className={styles.inputField}
                                multiple 
                            />
                        </label>
                    </>
                )}

                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.saveButton}>Salva</button>
                    <button type="button" onClick={() => navigate(-1)} className={styles.cancelButton}>Annulla</button>
                </div>
            </form>
        </div>
    );
}

export default ModificaRicordo;
