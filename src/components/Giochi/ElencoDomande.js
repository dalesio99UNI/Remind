import { useContext, useEffect, useState } from "react";
import GameContext from "../../context/game-context";
import styles from "./ElencoDomande.module.css";
import AuthContext from "../../context/auth-context";
import GenericButton from "../UI/GenericButton";
import { Link } from "react-router-dom";

var COUNT_DOMANDE = 0;
let domande_esistenti = 0;

function ElencoDomande(props){
    const game_ctx = useContext(GameContext);
    const auth_ctx = useContext(AuthContext);

    const [questionsList, setQuestionsList] = useState(game_ctx.domande);
  
    const [llll, setllll] = useState([...game_ctx.domandeDaModificare]);
    const [numeroDomandeSelezionate, setNumeroDomandeSelezionate] = useState(0);

  

    const websiteUrl = "/immagini/";

    //------- CREA QUI L'ARRAY CHE CONTIENE LE DOMANDE DENTRO verifyIsChecked
    useEffect(() => {
        if(!props.booleanForNotReset){
            console.log("DOMANDE PRE")
            console.log(llll)
            llll.splice(0);
            console.log("DOMANDE POST")
            console.log(llll)
            COUNT_DOMANDE = 0;
            setNumeroDomandeSelezionate(COUNT_DOMANDE);
            domande_esistenti = 0;
            props.domandeNuovoGioco(llll);
        }
    }, [props.tipoGioco])
    useEffect(() => {
        // setllll([...game_ctx.domandeDaModificare]);
        setNumeroDomandeSelezionate(game_ctx.domandeDaModificare.length);
        COUNT_DOMANDE = game_ctx.domandeDaModificare.length;
        console.log("Appena entrato queste sono le domande")
        console.log(llll);
        props.domandeNuovoGioco(llll);

    }, [game_ctx.domandeDaModificare.length]);


    

    function changingCategoryMakesQuestionsReset(){
        llll.splice(0);
        COUNT_DOMANDE = 0;
        setNumeroDomandeSelezionate(COUNT_DOMANDE);
        props.domandeNuovoGioco(llll);
    }

    function verifyIsChecked(event, domanda){
        console.log(domanda);
        if (event.target.checked) {
            console.log('✅ Checkbox is checked');
            COUNT_DOMANDE++;
            llll.unshift(
                domanda.ID,
                // categoria: domanda.categoria,
                // domanda: domanda.domanda,
                // rispCorrettaN1: domanda.rispCorrettaN1,
                // rispCorrettaN2: domanda.rispCorrettaN2,
                // rispCorrettaN3: domanda.rispCorrettaN3,
                // rispCorrettaN4: domanda.rispCorrettaN4,
                // rispSbagliataN1: domanda.rispSbagliataN1,
                // rispSbagliataN2: domanda.rispSbagliataN2,
                // rispSbagliataN3: domanda.rispSbagliataN3,
                // rispSbagliataN4: domanda.rispSbagliataN4
            );
        }
        else{
            console.log('⛔️ Checkbox is NOT checked');
            COUNT_DOMANDE--;
            for(var i=0; i < llll.length; i++){
                if(domanda.ID === llll[i]){
                    llll.splice(i, 1);
                    break;
                }
            }
        }

        // console.log(llll.question);
        console.log(llll);
        setNumeroDomandeSelezionate(COUNT_DOMANDE);
        props.domandeNuovoGioco(llll);
    }

   
        
    

    function recuperaTutteLeDomande(singleQuestion){
        var checkboxInputChecked;
        
        console.log(singleQuestion.tipoGioco === props.tipoGioco);

        if(singleQuestion.tipoGioco === props.tipoGioco){
            domande_esistenti += 1;
            // console.log("AOOOO")
        }

        if(singleQuestion.tipoGioco === props.tipoGioco){
            if(llll.length <= 0){
                checkboxInputChecked =
                    <input className={styles.checkbox_style} type="checkbox" onChange={(event)=>{
                        verifyIsChecked(event, singleQuestion)
                        }}
                    >
                    </input>
            }
            else{
                for(var i=0; i < llll.length; i++){
                    if(singleQuestion.ID === llll[i]){
                        checkboxInputChecked =
                            <input checked className={styles.checkbox_style} type="checkbox" onChange={(event)=>{
                                verifyIsChecked(event, singleQuestion)
                                }}
                            >
                            </input>
                        break;
                    }
                    else{
                        checkboxInputChecked =
                            <input className={styles.checkbox_style} type="checkbox" onChange={(event)=>{
                                verifyIsChecked(event, singleQuestion)
                                }}
                            >
                            </input>
                    }
                }
            }

            return(
                <li className={styles.LIST_ITEM_STYLE}>

                    {props.tipoGioco === "QUIZ" &&
                        <div className={styles.flex_list_container}>
                            <h5 className={styles.subtitle_style}>Domanda:</h5>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }

                    {props.tipoGioco === "QUIZ CON IMMAGINI" &&
                        <div className={styles.flex_list_container}>
                            <h5 className={styles.subtitle_style}>Immagine:</h5>
                            <img className={styles.preview_image} src={websiteUrl.concat(singleQuestion.immagine)}></img>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }
                    {props.tipoGioco === "QUIZ CON SUONI" &&
                        <div className={styles.flex_list_container}>
                            <h5 className={styles.subtitle_style}>Audio:</h5>
                            <audio controls={true} src={websiteUrl.concat(singleQuestion.immagine)}></audio>
                            <h4 className={styles.subtitle_style}>Domanda:</h4>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                    }


{props.tipoGioco === "QUIZ CON VIDEO" &&
    <div className={styles.flex_list_container}>
        <h5 className={styles.subtitle_style}>Video:</h5>
        <video controls width="320" height="240">
            <source src={websiteUrl.concat(singleQuestion.immagine)} type="video/mp4" />
            Your browser does not support the video element.
        </video>
        <h4 className={styles.subtitle_style}>Domanda:</h4>
        <p className={styles.question_style}>{singleQuestion.domanda}</p>
    </div>
}


                    {props.tipoGioco === "COMPLETA LA PAROLA" &&
                    <>
                        <div className={styles.flex_list_container}>
                            <h5 className={styles.subtitle_style}>Parola da indovinare:</h5>
                            <p className={styles.question_style}>{singleQuestion.domanda}</p>
                        </div>
                        <div className={styles.flex_list_container}>
                            <h4 className={styles.subtitle_style}>Aiuto:</h4>
                            <p className={styles.question_style}>{singleQuestion.suggerimento}</p>
                            {console.log("stampo il suggerimento",singleQuestion.suggerimento)}
                        </div>
                    </>
                    }

{(props.tipoGioco === "QUIZ" || props.tipoGioco === "QUIZ CON IMMAGINI" || props.tipoGioco === "QUIZ CON SUONI" || props.tipoGioco === "QUIZ CON VIDEO") && (
    <div className={styles.flex_list_container}>
        <h5 className={styles.subtitle_style}>Risposte:</h5>

        <div className={styles.separa_corrette_sbagliate}>
            <span className={styles.buttons_space}>
                <p style={{ marginBottom: "0" }}>CORRETTA</p>
                <p className={styles.correct_answ}>{singleQuestion.rispCorrettaN1}</p>

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
                <p style={{ marginBottom: "0" }}>SBAGLIATE</p>
                <p className={styles.wrong_answ}>{singleQuestion.rispSbagliataN1}</p>

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
    </div>
)}


                    <div className={styles.flex_list_container}>
                        <h5 className={styles.subtitle_style}>Inserisci nel quiz:</h5>
                        {checkboxInputChecked}
                    </div>

                </li>
            );
        }
        else{
            return null;
        }
    }

    return (
        <>
            <h5>Seleziona le domande per il gioco:</h5>
            <div className={styles.wrapper_generico}>
                <h3 className={styles.domande_disponibili}>{"DOMANDE SELEZIONATE: " + numeroDomandeSelezionate}</h3>

                <Link to={`/domande/creaDomanda/${auth_ctx.utenteLoggatoUID}`} style={{textDecoration: "none"}}>
                    <GenericButton
                        buttonText={"Crea una domanda"}
                        generic_button
                    ></GenericButton>
                </Link>
                
               
            </div>
            
            <ul className={styles.wrapper_lista_domande}>
                {questionsList.map(recuperaTutteLeDomande)}
                {domande_esistenti === 0 && <p className={styles.crea_una_domanda}>Non ci sono domande salvate per questo gioco. Usa il pulsante qui sopra per creare una domanda</p>}
            </ul>
            
        </>
    );
}

export default ElencoDomande;