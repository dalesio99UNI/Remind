import styles from "./GuessTheWord.module.css";
import { useContext, useEffect, useState } from "react";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import GameContext from "../../context/game-context";
import { Badge } from "react-bootstrap";

let counter_question_number = 0;
let counter_correct_answers = 0;
var parolaDaMostrare = [];

var secondi;
var interval;

function GuessTheWord(props){
    const [gameStarted, setGameStarted] = useState(false);
    const [indiceLetteraRimossa, setIndiceLetteraRimossa] = useState();
    const [letteraInseritaDaUtente, setLetteraInseritaDaUtente] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [rispostaCorretta, setRispostaCorretta] = useState(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    const [timer, setTimer] = useState(undefined);
    
    const questions = props.domandeGioco;
    
    var parolaDaIndovinare = questions[counter_question_number].domanda;

    useEffect(() => {
        if(props.LIVELLOGIOCO === "NORMALE"){
            secondi = 15;
            setTimer(secondi);
        }
        if(props.LIVELLOGIOCO === "DIFFICILE"){
            secondi = 10;
            setTimer(secondi);
        }
        interval = setInterval(() => {
            if(secondi > 0){
                secondi = secondi - 1;
                setTimer(secondi);
            }
        }, 1000);

        console.log("INTERVAL in useEffect--->" + interval);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if(timer <=0){
            clearInterval(interval);
            setHasAnswered(true);
            setDisableButton(true);
            verificaRisposta();
        }
        console.log(props.domandeGioco)
    }, [timer]);

    function iniziaGioco(){
        setGameStarted(true);
        parolaDaMostrare = [];
        counter_correct_answers = 0;
        counter_question_number = 0;
        dividiParolaInLettere();
    }

    function letteraInseritaHandler(event){
        setLetteraInseritaDaUtente(event.target.value.toUpperCase());
    }

    function dividiParolaInLettere(){
        var min=0;
        var max=parolaDaIndovinare.length - 1;
        var letteraRandomDaTogliere = Math.floor(Math.random() * (max - min));

        for(var i=0; i < parolaDaIndovinare.length; i++){
            if(i === letteraRandomDaTogliere){
                // parolaDaMostrare.push(<input autoFocus className={styles.prova_rettangoli_lettera_mancante} type="text" maxLength="1" onChange={letteraInseritaHandler}></input>)
                parolaDaMostrare.push({lettera: "", indice: letteraRandomDaTogliere})
            }
            else{
                // parolaDaMostrare.push(<span className={styles.prova_rettangoli_lettere}>{parolaDaIndovinare[i].toUpperCase()}</span>);
                parolaDaMostrare.push({lettera: parolaDaIndovinare[i].toUpperCase(), indice: -1});
            }
            // console.log(parolaDaIndovinare[i]);
        }

        console.log(parolaDaIndovinare);
        setIndiceLetteraRimossa(letteraRandomDaTogliere);
    }

    function verificaRisposta(){
        var rispostaFINALE = "";
        setHasAnswered(true);
        setDisableButton(true);
        clearInterval(interval);

        for(var i=0; i < parolaDaIndovinare.length; i++){
            if(i === indiceLetteraRimossa){
                // console.log(rispostaFINALE);
                rispostaFINALE = rispostaFINALE + letteraInseritaDaUtente;
            }
            else{
                rispostaFINALE = rispostaFINALE + parolaDaIndovinare[i];
            }
            // console.log(rispostaFINALE);
        }

        console.log(rispostaFINALE);
        console.log(rispostaFINALE === parolaDaIndovinare);

        if(rispostaFINALE === parolaDaIndovinare){
            setRispostaCorretta(true);
            counter_correct_answers++;
        }
        else{
            setRispostaCorretta(false);
        }
    }

    function aggiornaLogica(){
        if(counter_question_number < questions.length-1){
            counter_question_number++;
        }
        else{
            setGameStarted(false);
            counter_question_number = 0;
            props.giocoTerminato(counter_correct_answers, questions.length);
        }
        setLetteraInseritaDaUtente("");
        setRispostaCorretta(null);
        parolaDaIndovinare = questions[counter_question_number].domanda;
        parolaDaMostrare = [];
        dividiParolaInLettere();
        setHasAnswered(false);
        setDisableButton(false);

        if(props.LIVELLOGIOCO === "NORMALE"){
            secondi = 15;
            setTimer(secondi);
        }
        if(props.LIVELLOGIOCO === "DIFFICILE"){
            secondi = 10;
            setTimer(secondi);
        }
        interval = setInterval(() => {
            if(secondi > 0){
                secondi = secondi - 1;
                setTimer(secondi);
            }
        }, 1000);
    }

    return(
        <>

            {!gameStarted &&
                <div className={styles.wrap_generico}>
                    <h1 className={styles.pre_game}>Quando sei pronto, clicca sul bottone</h1>
                    <GenericAlternativeButton
                        onClick={iniziaGioco}
                        buttonText={"INIZIA"}
                    >
                    </GenericAlternativeButton>
                    <GenericAlternativeButton
                        onClick={props.giocoAnnullato}
                        buttonText={"INDIETRO"}
                        colore_rosso
                    >
                    </GenericAlternativeButton>
                </div>
            }

            {gameStarted && 
                <div className={styles.wrapper_gioco}>
                    <h2 className={styles.domanda}>Completa la seguente parola:</h2>
                    <div className={styles.wrapper_horizontal_flex}>
                        {parolaDaMostrare.map((lettera) => (
                            lettera.indice === -1
                            ?
                            <span className={styles.prova_rettangoli_lettere}>{lettera.lettera}</span>
                            :
                            <input autoFocus className={styles.prova_rettangoli_lettera_mancante} type="text" maxLength="1" value={letteraInseritaDaUtente} onChange={letteraInseritaHandler}></input>
                        ))}
                    </div>
                    <Badge bg="primary" className={styles.suggerimento_style}>Aiuto: {questions[counter_question_number].suggerimento}</Badge>

                    <div className={styles.wrapper_horizontal_flex}>
                        <p className={styles.risposte_corrette}>Risposte corrette: {counter_correct_answers}/{questions.length}</p>
                        {props.LIVELLOGIOCO !== "FACILE" && <p>TIMER: {timer}</p>}
                    </div>

                    {rispostaCorretta !== null && !rispostaCorretta && <h2 className={styles.WRONG}>Peccato, hai sbagliato.</h2>}
                    {rispostaCorretta !== null && rispostaCorretta && <h2 className={styles.CORRECT}>RISPOSTA CORRETTA!</h2>}

                    <div className={styles.wrapper_horizontal_flex}>
                        
                        <GenericAlternativeButton
                            is_disabled={disableButton}
                            onClick={verificaRisposta}
                            buttonText={"Verifica risposta"}
                        >
                        </GenericAlternativeButton>

                        {hasAnswered &&
                            <GenericAlternativeButton
                                onClick={aggiornaLogica}
                                buttonText={"Prossima parola"}
                            >
                            </GenericAlternativeButton>
                        }
                        
                    </div>
                    
                </div>
            }
        </>
    );
}

export default GuessTheWord;