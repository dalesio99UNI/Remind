import styles from "./ElencoDomandeModificabili.module.css";
import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import GenericButton from "../UI/GenericButton";
import AuthContext from "../../context/auth-context";

let domande_esistenti = 0;

function ElencoDomandeModificabili(props) {
    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext);

    const [questionsList, setQuestionsList] = useState(game_ctx.domande);
    const [imagesList, setImagesList] = useState([]);
    const [gameType, setGameType] = useState("QUIZ");

    const [domande_esistenti, set_domande_esistenti] = useState(false);
    
    const [categoryFilter, setCategoryFilter] = useState("Tutte");

    const websiteUrl = "/immagini/";

    useEffect(() => {
        set_domande_esistenti(false)
    }, [gameType])

    function gameTypeChangeHandler(event) {
        setCategoryFilter("Tutte");
        setGameType(event.target.value);
    }

    function recuperaTutteLeDomande(singleQuestion) {
        console.log("log della domanda".singleQuestion);
        if (singleQuestion.tipoGioco === gameType && !domande_esistenti) {
            set_domande_esistenti(true);
        }
        if (singleQuestion.tipoGioco === gameType) {
            return (
                <li className={styles.LIST_ITEM_STYLE}>

                    {gameType === "QUIZ" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {gameType === "QUIZ CON IMMAGINI" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Immagine:</h4>
                            <img className={styles.preview_image} src={websiteUrl.concat(singleQuestion.immagine)} alt="Immagine domande" />
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {gameType === "QUIZ CON SUONI" &&
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Audio:</h4>
                            <audio controls src={websiteUrl.concat(singleQuestion.immagine)}></audio>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {gameType === "QUIZ CON VIDEO" && 
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Video:</h4>
                            <video className={styles.preview_video} controls>
                                <source src={websiteUrl.concat(singleQuestion.immagine)} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {gameType === "COMPLETA LA PAROLA" &&
                        <>
                            <div className={styles.flex_list_container}>
                                <h4 className={styles.subtitle_style}>Parola:</h4>
                                <p className={styles.question_style}>{singleQuestion.domanda}</p>
                            </div>
                            <div className={styles.flex_list_container}>
                                <h4 className={styles.subtitle_style}>Aiuto:</h4>
                                <p className={styles.question_style}>{singleQuestion.suggerimento}</p>
                            </div>
                        </>
                    }

                    {(gameType === "QUIZ" || gameType === "QUIZ CON IMMAGINI" || gameType === "QUIZ CON SUONI" || gameType === "QUIZ CON VIDEO") &&
                        <div className={styles.separa_corrette_sbagliate}>
                            <span className={styles.buttons_space}>
                                <p style={{ margin: "0" }}>CORRETTE</p>
                                {singleQuestion.rispCorrettaN1 && singleQuestion.rispCorrettaN1.trim().length > 0 && (
                                    <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN1.toString()}</p>
                                )}
                                {singleQuestion.rispCorrettaN2 && singleQuestion.rispCorrettaN2.trim().length > 0 && (
                                    <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN2.toString()}</p>
                                )}
                                {singleQuestion.rispCorrettaN3 && singleQuestion.rispCorrettaN3.trim().length > 0 && (
                                    <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN3.toString()}</p>
                                )}
                                {singleQuestion.rispCorrettaN4 && singleQuestion.rispCorrettaN4.trim().length > 0 && (
                                    <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN4.toString()}</p>
                                )}
                            </span>

                            <span className={styles.buttons_space}>
                                <p style={{ margin: "0" }}>SBAGLIATE</p>
                                {singleQuestion.rispSbagliataN1 && singleQuestion.rispSbagliataN1.trim().length > 0 && (
                                    <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN1.toString()}</p>
                                )}
                                {singleQuestion.rispSbagliataN2 && singleQuestion.rispSbagliataN2.trim().length > 0 && (
                                    <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN2.toString()}</p>
                                )}
                                {singleQuestion.rispSbagliataN3 && singleQuestion.rispSbagliataN3.trim().length > 0 && (
                                    <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN3.toString()}</p>
                                )}
                                {singleQuestion.rispSbagliataN4 && singleQuestion.rispSbagliataN4.trim().length > 0 && (
                                    <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN4.toString()}</p>
                                )}
                            </span>
                        </div>
                    }

                    <div className={styles.flex_list_container}>
                        <h4 className={styles.subtitle_style}>Opzioni:</h4>
                        <div className={styles.option_buttons}>
                            <GenericButton
                                onClick={() => {
                                    props.modificaSingolaDomanda(gameType, singleQuestion, singleQuestion.ID);
                                }}
                                generic_button={true}
                                buttonText={"Modifica domanda"}
                            />
                            <GenericButton
                                onClick={() => {
                                    game_ctx.eliminaDomanda(singleQuestion.ID);
                                }}
                                generic_button={true}
                                red_styling
                                buttonText={"Elimina domanda"}
                            />
                        </div>
                    </div>
                </li>
            );
        }
        else {
            return null;
        }
    }

    return (
        <>
            {game_ctx.showModale && game_ctx.modale}

            <div className={styles.wrap_flex_generico}>
                <div className={styles.vertical}>
                    <label className={styles.label_style}>Tipo gioco</label>
                    <select className={styles.select_style} defaultValue={gameType} onChange={gameTypeChangeHandler}>
                        <option>QUIZ</option>
                        <option>QUIZ CON IMMAGINI</option>
                        <option>QUIZ CON SUONI</option>
                        <option>QUIZ CON VIDEO</option>
                        <option>COMPLETA LA PAROLA</option>
                    </select>
                </div>
            </div>

            <hr style={{ width: "100%" }} />

            {!domande_esistenti && <h2 style={{ textAlign: "center" }}>Non hai creato domande per questo tipo di gioco</h2>}

            {game_ctx.domande?.length > 0 &&
                <ul className={styles.wrapper_lista_domande}>
                    {console.log(game_ctx.domande)}

                    {game_ctx.domande.map(recuperaTutteLeDomande)}
                </ul>
            }
        </>
    );
}

export default ElencoDomandeModificabili;
