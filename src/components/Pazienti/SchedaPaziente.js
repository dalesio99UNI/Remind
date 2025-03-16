import GenericButton from '../UI/GenericButton';
import Card from '../UI/Card';
import styles from './SchedaPaziente.module.css';
import { useEffect, useState } from 'react';
import StatistichePaziente from './StatistichePaziente';
import CardSmall from '../UI/CardSmall';
import { Accordion, Col, Modal, ProgressBar, Tab, Tabs } from 'react-bootstrap';
import { getServerMgr } from '../../backend_conn/ServerMgr';
import QRCode from 'react-qr-code';

function SchedaPaziente(props) {

console.log("stampo le props",props);

    const [sezioneScheda, setSezioneScheda] = useState('DATI_PERSONALI');
    const [informazioniMediche, setInformazioniMediche] = useState([]);
    const [listaGiochi, setListaGiochi] = useState([]);
    const [showCredentials, setShowCredentials] = useState(false);
    const [createCredentials, setCreateCredentials] = useState(false);
    const [credentials, setCredentials] = useState([]);
    const [enteredEmail, setEnteredEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [errorEmailMsg, setErrorEmailMsg] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [validPassword, setValidPassword] = useState(true);

    useEffect(() => {
        if (Array.isArray(props.informazioniMediche)) {
            setInformazioniMediche(props.informazioniMediche);
        } else {
            setInformazioniMediche([]);
        }
    }, [props.informazioniMediche]);

    useEffect(() => {
        if (Array.isArray(props.listaGiochi)) {
            setListaGiochi(props.listaGiochi);
        } else {
            setListaGiochi([]);
        }
    }, [props.listaGiochi]);

    useEffect(() => {
        if (Array.isArray(props.credentialsAccount)) {
            setCredentials(props.credentialsAccount);
        } else {
            setCredentials([]);
        }
    }, [props.credentialsAccount]);

    const selectShow = (stringa) => {
        setSezioneScheda(stringa);
    };

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        setValidEmail(true);
        
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        setValidPassword(true);
    };

    const creaAccountPaziente = async () => {
      
        const emailTrimmed = enteredEmail.trim();
    
        if (emailTrimmed.includes('@') && enteredPassword.trim().length >= 6) {
            try {
              
                const result = await getServerMgr().getAccount();
    
                
                if (!result || !Array.isArray(result)) {
                    console.error("Errore nel recupero degli account dal server");
                    return;
                }
    
               
                const emailEsistente = result.some((account) => account.email === emailTrimmed);
    
                if (emailEsistente) {
                    setValidEmail(false);
                    setErrorEmailMsg("Email già associata ad un account!");
                    alert("Email già associata ad un account!");
                    return;
                }
    
               
                const result2 = await getServerMgr().addAccount(props.nome, props.cognome, 2, emailTrimmed, enteredPassword, props.id);
                alert("ACCOUNT CREATO!");
    
               
                await getServerMgr().updatePatientWithProfileID(result2, props.id, emailTrimmed);
    
                
                setCreateCredentials(false);
    
                console.log("questo è l'id dell'account recuperato con le credenziali", result2);
    
                
                const resultCredentialsPatients = await getServerMgr().getPatientCredentials(result2);
                console.log("questo è l'account recuperato con le credenziali", resultCredentialsPatients);
                
                setCredentials(resultCredentialsPatients); 
            } catch (err) {
                console.error("Errore durante la creazione dell'account:", err);
            }
        } else {
          
            if (!emailTrimmed.includes('@')) {
                setValidEmail(false);
                setErrorEmailMsg("Inserisci una email valida");
            }
    
            
            if (enteredPassword.trim().length < 6) {
                setValidPassword(false);
            }
        }
    };
    

    return (
        <div style={{ width: "100%" }}>
            <h1 className={styles.page_title}>Scheda paziente: {props.nome} {props.cognome}</h1>
            <Tabs variant="underline" fill id="controlled-tab-example" activeKey={sezioneScheda} onSelect={selectShow}>
                <Tab className={styles.tab_text} eventKey="DATI_PERSONALI" title="Dati">
                    <div className={styles.horizontal_dati}>
                        <div className={styles.section_dati}>
                            <h3 className={styles.text_dati_personali_title}>ANAGRAFICA</h3>
                            <div className={styles.horizontal}>
                                <label className={styles.label_style}>NOME COMPLETO:</label>
                                <div className={styles.content_text_style}>{props.nome} {props.cognome}</div>
                            </div>
                            <div className={styles.horizontal}>
                                <label className={styles.label_style}>CITTÀ DI NASCITA:</label>
                                <div className={styles.content_text_style}>{props.città}</div>
                            </div>
                            <div className={styles.horizontal}>
                                <label className={styles.label_style}>DATA DI NASCITA:</label>
                                <div className={styles.content_text_style}>{props.datanascita}</div>
                            </div>
                            <div className={styles.horizontal}>
                                <label className={styles.label_style}>CODICE FISCALE:</label>
                                <div className={styles.content_text_style}>{props.codicefiscale}</div>
                            </div>
                            <div className={styles.horizontal}>
                                <label className={styles.label_style}>CREDENZIALI:</label>
                                {credentials !== null && credentials.length === 0 && (
                                    <>
                                        <div className={styles.content_text_style}>
                                            <GenericButton
                                                onClick={() => setCreateCredentials((prevBool) => !prevBool)}
                                                buttonText="Crea credenziali"
                                                generic_button
                                            />
                                        </div>
                                        {createCredentials && (
                                            <Modal centered show={createCredentials}>
                                                <Modal.Header style={{ fontWeight: "bold", fontSize: "18px" }}>Crea credenziali paziente</Modal.Header>
                                                <Modal.Body>
                                                    <label className={`${styles.tag_style} ${!validEmail ? styles.invalid : ''}`}>Email:</label>
                                                    <input
                                                        autoFocus
                                                        value={enteredEmail}
                                                        onChange={emailChangeHandler}
                                                        className={`${styles.input_style} ${!validEmail ? styles.invalid : ''}`}
                                                    />
                                                    {!validEmail && <div style={{ color: "red", textAlign: "center" }}>{errorEmailMsg}</div>}
                                                    <label className={`${styles.tag_style} ${!validPassword ? styles.invalid : ''}`}>Password:</label>
                                                    <input
                                                        value={enteredPassword}
                                                        onChange={passwordChangeHandler}
                                                        className={`${styles.input_style} ${!validPassword ? styles.invalid : ''}`}
                                                    />
                                                    {!validPassword && <div style={{ color: "red", textAlign: "center" }}>Inserisci una password con almeno 6 caratteri</div>}
                                                    <p className={styles.paragraph_style}><b>Attenzione! </b> Queste credenziali serviranno al paziente per potersi collegare alla piattaforma e svolgere attività.</p>
                                                    <div style={{ marginTop: "10px" }} className={styles.horizontal}>
                                                        <GenericButton
                                                            onClick={() => setCreateCredentials((prevBool) => !prevBool)}
                                                            buttonText="Chiudi"
                                                            generic_button
                                                            red_styling
                                                        />
                                                        <GenericButton
                                                            onClick={creaAccountPaziente}
                                                            buttonText="Crea account"
                                                            generic_button
                                                        />
                                                    </div>
                                                </Modal.Body>
                                            </Modal>
                                        )}
                                    </>
                                )}
                                {credentials !== null && credentials.length > 0 && (
                                    <>
                                        <div className={styles.content_text_style}>
                                            <GenericButton
                                                onClick={() => setShowCredentials((prevBool) => !prevBool)}
                                                buttonText={!showCredentials ? "Visualizza" : "Nascondi"}
                                                generic_button
                                            />
                                        </div>
                                        {showCredentials && (
                                            <Modal centered show={showCredentials}>
                                                <Modal.Header style={{ fontWeight: "bold", fontSize: "18px" }}>Credenziali paziente</Modal.Header>
                                                <Modal.Body>
                                                    <div style={{ justifyContent: "space-between" }} className={styles.horizontal}>
                                                        <div className={styles.wrapper_vertical}>
                                                            <label className={styles.tag_style}>Email:</label>
                                                            <div style={{ textAlign: "start" }} className={styles.content_text_style}>
                                                                {credentials?.email || "Non disponibile"}
                                                            </div>
                                                            <label className={styles.tag_style}>Password:</label>
                                                            <div style={{ textAlign: "start" }} className={styles.content_text_style}>
                                                                {credentials?.password || "Non disponibile"}
                                                            </div>
                                                        </div>
                                                        <div className={styles.wrapper_vertical}>
                                                            <label className={styles.tag_style}>QR Code:</label>
                                                            <QRCode value={`https://cognicare.altervista.org/QRCodeLogin/${credentials[0]?.UID}`} size={160} />
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer style={{ justifyContent: "center" }}>
                                                    <GenericButton
                                                        onClick={() => setShowCredentials((prevBool) => !prevBool)}
                                                        buttonText="Chiudi"
                                                        generic_button
                                                        red_styling
                                                    />
                                                </Modal.Footer>
                                            </Modal>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.section_dati}>
                            <h3 className={styles.text_dati_personali_title}>CONTATTI</h3>
                            <div className={styles.horizontal}>
                                <label className={styles.label_style}>EMAIL:</label>
                                <div className={styles.content_text_style}>{props.contattoEmail || "Non inserito"}</div>
                            </div>
                            <div className={styles.horizontal}>
                                <label className={styles.label_style}>CELLULARE:</label>
                                <div className={styles.content_text_style}>{props.contattoCellulare || "Non inserito"}</div>
                            </div>
                        </div>
                    </div>
                    <hr className={styles.horizontal_line} />
                </Tab>

                <Tab eventKey={"GIOCHI"} title={"Giochi"}>
    <>
        {listaGiochi?.length === 0 ? (
            <h4 style={{ textAlign: "center", marginTop: "20px" }}>
                Nessun gioco assegnato al paziente
            </h4>
        ) : (
            <div className={styles.wrapper_vertical}>
                <h3 className={styles.subtitle_text}>Elenco giochi assegnati:</h3>
                <div style={{ width: "80%" }}>
                    <Accordion>
                        {listaGiochi
                            ?.filter((gioco, index, self) =>
                                index === self.findIndex(g => g.gameID === gioco.gameID)
                            ) 
                            .map((objInfo, index) => (
                                <Accordion.Item
                                    className={styles.accordion_item}
                                    eventKey={`${objInfo.gameID}-${index}`} 
                                    key={`${objInfo.gameID}-${index}`} 
                                >
                                    <Accordion.Header>{objInfo.nomeGioco}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={styles.sintesiMedica_label_PATOLOGIA}>
                                                Nome gioco:
                                            </label>
                                            <p className={styles.sintesiMedica_content_PATOLOGIA}>
                                                {objInfo.nomeGioco}
                                            </p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={styles.sintesiMedica_label_TERAPIA}>
                                                Tipo gioco:
                                            </label>
                                            <p className={styles.sintesiMedica_content_TERAPIA}>
                                                {objInfo.tipoGioco}
                                            </p>
                                        </div>
                                        <div className={styles.wrapper_horizontal}>
                                            <label className={styles.sintesiMedica_label_DATA}>
                                                Livello gioco:
                                            </label>
                                            <p className={styles.sintesiMedica_content_DATA}>
                                                {objInfo.livelloGioco}
                                            </p>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                    </Accordion>
                </div>
            </div>
        )}
        <hr className={styles.horizontal_line} />
    </>
</Tab>


                <Tab eventKey={"STATISTICHE"} title={"Statistiche"}>
                    <h3 className={styles.subtitle_text}>Statistiche dei giochi:</h3>
                    <div className={styles.wrapper_vertical}>
                        <StatistichePaziente
                            pazienteID={props.id}
                            stats={props.statsPaziente}
                        ></StatistichePaziente>
                    </div>
                    
                </Tab>
            </Tabs>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <GenericButton
                    generic_button={true}
                    red_styling
                    onClick={props.goBackButton}
                    buttonText='Indietro'
                ></GenericButton>
            </div>
        </div>
    );
}

export default SchedaPaziente;
