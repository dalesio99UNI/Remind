import { useContext, useState } from "react";
import GenericButton from "../UI/GenericButton";
import styles from "./Domande.module.css";
import ElencoDomandeModificabili from "./ElencoDomandeModificabili";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import EditDomanda from "./EditDomanda";

let modifica_domanda;

function Domande(){
    const auth_ctx = useContext(AuthContext);

    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showAddNewQuestion, setShowAddNewQuestion] = useState(false);
    const [showQuestionsList, setShowQuestionsList] = useState(true);

    const [showEditQuestion, setShowEditQuestion] = useState(false);

    function formCreateNewQuestion(){
        setShowSearchBoxAndButton(false);
        setShowQuestionsList(false);
        setShowAddNewQuestion(true);
    }

    function formEditQuestion(tipoGioco, singleQuestion, ID){
        if(tipoGioco === "QUIZ"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }
        if(tipoGioco === "QUIZ CON IMMAGINI" || tipoGioco === "QUIZ CON SUONI" || tipoGioco === "QUIZ CON VIDEO" ){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                immagine={singleQuestion.immagine}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }

        if(tipoGioco === "COMPLETA LA PAROLA"){
            modifica_domanda =
            <EditDomanda
                ID={ID}
                tipoGioco={tipoGioco}
                categoriaDomanda={singleQuestion.categoria}
                domanda={singleQuestion.domanda}
                correttaN1={singleQuestion.rispCorrettaN1}
                correttaN2={singleQuestion.rispCorrettaN2}
                correttaN3={singleQuestion.rispCorrettaN3}
                correttaN4={singleQuestion.rispCorrettaN4}
                sbagliataN1={singleQuestion.rispSbagliataN1}
                sbagliataN2={singleQuestion.rispSbagliataN2}
                sbagliataN3={singleQuestion.rispSbagliataN3}
                sbagliataN4={singleQuestion.rispSbagliataN4}
                suggerimento={singleQuestion.suggerimento}
                chiudiFormModificaDomanda={closeFormEditQuestion}
            >
            </EditDomanda>
        }
        
        setShowQuestionsList(false);
        setShowEditQuestion(true);
    }

    function closeFormEditQuestion(){
        setShowEditQuestion(false);
        setShowQuestionsList(true);
        // setShowAddNewQuestion(true);
    }

    return(
        <>
            {showSearchBoxAndButton &&
                <div className={styles.wrap_boxes}>
                    {/* <select className={styles.select_style} onChange={tipoGiocoChangeHandler}>
                        <option hidden>Tipo Gioco</option>
                        <option>TUTTI</option>
                        <option>QUIZ</option>
                        <option>QUIZ CON IMMAGINI</option>
                        <option>COMPLETA LA PAROLA</option>
                        
                    </select> */}
                    <Link to={`/domande/creaDomanda/${auth_ctx.utenteLoggatoUID}`} style={{textDecoration: "none"}}>
                        <GenericButton
                            // onClick={formCreateNewQuestion}
                            generic_button={true}
                            buttonText={"Crea domanda"}
                        >
                        </GenericButton>
                    </Link>
                    
        
                    {/* <GenericButton
                        onClick={() => {
                            formCreateNewGame();
                            //LA SEGUENTE FUNZIONE SERVE PER RESETTARE L'OGGETTO CHE SI OCCUPA DI MODIFICARE LE DOMANDE DI UN GIOCO
                            game_ctx.formCreaNuovoGioco();
                        }}
                        generic_button={true}
                        buttonText={"Crea Gioco"}
                    >
                    </GenericButton> */}
                </div>
            }
            {!showEditQuestion && <h1 className={styles.page_title}>Lista domande</h1>}
            {showQuestionsList && 
                <ElencoDomandeModificabili
                    modificaSingolaDomanda={formEditQuestion}
                ></ElencoDomandeModificabili>
            }

            {showEditQuestion && modifica_domanda}
        </>
    );
}

export default Domande;