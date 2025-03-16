import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getServerMgr } from "../../backend_conn/ServerMgr.js";
import { useNavigate, useParams } from "react-router-dom";
import styles2 from './InserisciRicordo.module.css';

function InserisciRicordo() {
    const navigate = useNavigate();
    const { boxID } = useParams();
    const [titolo, setTitolo] = useState('');
    const [tipo, setTipo] = useState('');
    const [multimedia, setMultimedia] = useState([]);
    const [descrizione, setDescrizione] = useState('');
    const [latitudine, setLatitudine] = useState(null);
    const [longitudine, setLongitudine] = useState(null);

    
    const handleMultimediaChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + multimedia.length <= 4) {
            setMultimedia((prev) => [...prev, ...files]);
        } else {
            alert('Puoi aggiungere solo 4 file');
        }
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!tipo) {
            alert("Seleziona un tipo di ricordo prima di salvare.");
            return;
        }

       
        if (tipo === "luogo" && (!latitudine || !longitudine)) {
            alert("Seleziona una posizione sulla mappa prima di salvare.");
            return;
        }

        
        const ricordoData = {
            titolo: titolo,
            tipo: tipo,
            descrizione: descrizione,
            latitudine: latitudine,
            longitudine: longitudine,
            multimedia: [],
            id_box: boxID
        };

      
        multimedia.forEach((file) => {
            ricordoData.multimedia.push(file.name); 
        });

        try {
            
            const response = await getServerMgr().insertRicordo(ricordoData);

            if (response.success) {
                alert("Ricordo salvato con successo!");
                
                setTitolo("");
                setTipo("");
                setMultimedia([]);
                setDescrizione("");
                setLatitudine(null);
                setLongitudine(null);
                navigate(-1); 
            } else {
                alert("Errore nel salvataggio del ricordo.");
            }

        } catch (error) {
            console.error("Errore nel salvataggio del ricordo:", error);
            alert("Si è verificato un errore, riprova.");
        }
    };

    const handleBack = () => {
        navigate(-1); 
    };

   
    function LocationMarker() {
        useMapEvents({
            click(e) {
                setLatitudine(e.latlng.lat);
                setLongitudine(e.latlng.lng);
            }
        });

        return latitudine && longitudine ? (
            <Marker position={[latitudine, longitudine]}  icon={new L.Icon({
                iconUrl: '/immagini/marker-icon-2x.png', 
                iconSize: [30, 30],                   
                iconAnchor: [16, 32],              
                popupAnchor: [0, -32]                 
              })}>
                <Popup>Posizione selezionata</Popup>
            </Marker>
        ) : null;
    }

    return (
        <div className={styles2.container}>
            <h2>Inserisci un nuovo ricordo</h2>
            <form onSubmit={handleSubmit} className={styles2.form}>
                
                <div className={styles2.field}>
                    <label htmlFor="titolo">Titolo</label>
                    <input 
                        type="text" 
                        id="titolo" 
                        value={titolo} 
                        onChange={(e) => setTitolo(e.target.value)} 
                        required 
                    />
                </div>

              
                <div className={styles2.field}>
                    <label htmlFor="tipo">Tipo di Multimedia</label>
                    <select 
                        id="tipo" 
                        value={tipo} 
                        onChange={(e) => setTipo(e.target.value)} 
                        required
                    >
                        <option value="">Seleziona Tipo</option>
                        <option value="immagine">Immagini</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="luogo">Luogo</option>
                    </select>
                </div>

                
                {(tipo === 'immagine' || tipo === 'video' || tipo === 'audio') && (
                    <div className={styles2.field}>
                        <label htmlFor="multimedia">Carica file</label>
                        <input 
                            type="file" 
                            id="multimedia" 
                            accept={tipo === 'immagine' ? 'image/*' : tipo === 'video' ? 'video/*' : 'audio/*'} 
                            onChange={handleMultimediaChange} 
                            multiple 
                            required 
                        />
                        <p>Carica fino a 4 file. Hai caricato {multimedia.length} file.</p>
                    </div>
                )}

               
                {tipo === 'luogo' && (
                    <div className={styles2.field}>
                        <label htmlFor="mappa">Seleziona una posizione sulla mappa</label>
                        <MapContainer 
                            center={[45.0, 9.0]} 
                            zoom={8} 
                            style={{ width: '100%', height: '400px' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationMarker />
                        </MapContainer>
                        <p>Posizione selezionata: Latitudine {latitudine}, Longitudine {longitudine}</p>
                    </div>
                )}

                
                <div className={styles2.field}>
                    <label htmlFor="descrizione">Descrizione</label>
                    <textarea 
                        id="descrizione" 
                        value={descrizione} 
                        onChange={(e) => setDescrizione(e.target.value)} 
                    />
                </div>

                <div className={styles2.buttonsContainer}>
    <button className={styles2.submitButton} type="submit">Salva Ricordo</button>
    <button className={styles2.backButton} onClick={handleBack}>← Indietro</button>
</div>

            </form>
        </div>
    );
}

export default InserisciRicordo;
