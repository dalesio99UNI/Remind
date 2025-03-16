import styles from "./ListaGiochi.module.css";
import { useContext, useEffect } from "react";
import GameContext from "../../context/game-context";
import GameCard from "../UI/GameCard";
import GenericButton from "../UI/GenericButton";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import { Badge } from "react-bootstrap";
import AuthContext from "../../context/auth-context";

function ListaGiochi(props){
    const auth_ctx = useContext(AuthContext)
    const game_ctx = useContext(GameContext);
    var lista = game_ctx.listaGiochi;

    useEffect(() => {
        lista = game_ctx.listaGiochi;
        console.log(lista)
    }, [lista]);

    function fromArrayToGameList(lista){
        if((lista.tipoGioco === props.tipoGioco) || (props.tipoGioco === "TUTTI") || (props.tipoGioco === ""))
            if(game_ctx.stringSearched.length === 0 || lista.nomeGioco.toUpperCase().includes(game_ctx.stringSearched.toUpperCase())){
                return(
                    <ul className={styles.lista_giochi} key={lista.gameID}>
                        <GameCard
                            children={
                                <>
                                    <div className={styles.horizontal}>
                                        <div className={styles.wrap_body_card}>
                                            <div className={styles.wrap_title_play_button}>
                                                <h1 className={styles.game_title}>{lista.nomeGioco}</h1>
                                                <GenericButton
                                                    onClick={()=> {
                                                        props.iniziaGioco(lista.tipoGioco, lista.gameID, lista.livelloGioco)
                                                    }}
                                                    buttonText={"Gioca"}
                                                    is_disabled={lista.domandeID.length === 0  && lista.tipoGioco !== "GIOCO DELLE COPPIE" ? true : false}
                                                    small_button
                                                ></GenericButton>
                                            </div>
                                            
                                            <h3 className={styles.game_subtitle}>Tipo gioco: <span className={styles.game_type}>{lista.tipoGioco}</span></h3>
                                            <h3 className={styles.game_subtitle}>Difficoltà: <span className={styles.game_type}>{lista.livelloGioco}</span></h3>
                                            {/* <h3 className={styles.game_subtitle}>CODICE DEL GIOCO: <span className={styles.game_type}>{lista.codiceGioco}</span></h3> */}
                                        </div>
                                        
                                        <div className={styles.buttons_wrap}>
                                            {auth_ctx.tipoAccount !== "Paziente" && 
                                                <GenericAlternativeButton
                                                    onClick={()=> {
                                                        props.mostraSchedaAssegnazione(lista.gameID);
                                                        game_ctx.prendiPazientiPerUnSingoloGioco(lista.gameID)
                                                    }}
                                                    // alternative_button={true}
                                                    buttonText='Assegna'>
                                                </GenericAlternativeButton>
                                            }

                                            {auth_ctx.tipoAccount !== "Paziente" && 
                                                <GenericAlternativeButton
                                                    onClick={() => {
                                                        game_ctx.modificaGioco(lista)
                                                        props.mostraFormModificaGioco(lista);
                                                    }}
                                                    // alternative_button={true}
                                                    buttonText='Modifica'>
                                                </GenericAlternativeButton>
                                            }
                                            
                                            {auth_ctx.tipoAccount !== "Paziente" && 
                                                <GenericAlternativeButton
                                                    onClick={() => {
                                                        game_ctx.eliminaGioco(lista.gameID)
                                                    }}
                                                    // alternative_button={true}
                                                    colore_rosso={true}
                                                    buttonText='Elimina'>
                                                </GenericAlternativeButton>
                                            }
                                            
                                        </div>
                                    </div>

                                    {lista.domandeID.length === 0 && lista.tipoGioco !== "GIOCO DELLE COPPIE"
                                    ? 
                                    <>
                                        <hr className={styles.horizontal_line}></hr>
                                        <div className={styles.warning_wrapper}>
                                            <Badge bg="warning" text="dark">Attenzione!</Badge>
                                            <div className={styles.warning_text}>Questo gioco è vuoto. Puoi modificarlo per aggiungere domande oppure eliminarlo</div>
                                        </div>
                                    </>
                                    : 
                                    <></>
                                    }
                                    
                                </>
                            }>
                        </GameCard>
                    </ul>
                );
            }
    }

    return(
        
        <>
            {game_ctx.showModale && game_ctx.modale}
            {lista.length === 0 && <h2>Non hai ancora creato nessun gioco</h2>}
            {lista.length > 0 && lista.map(fromArrayToGameList)}
            {/* {lista.map(fromArrayToGameList)} */}
        </>
    
    );
}

export default ListaGiochi;