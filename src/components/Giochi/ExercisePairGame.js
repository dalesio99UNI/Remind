import ReactCardFlip from "react-card-flip";
import styles from "./ExercisePairGame.module.css";
import { useEffect, useState } from "react";
import star from "../Images-Giochi/star.png";
import fish from "../Images-Giochi/fish.png";
import leaf from "../Images-Giochi/leaf.png";
import heart from "../Images-Giochi/favorite.png";
import cat from "../Images-Giochi/kitty.png"
import questionMark from "../Images-Giochi/question-sign.png";
import GenericAlternativeButton from "../UI/GenericAlternativeButton";

function ExercisePairGame(props){
    let secondi = 5;
    let interval;

    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [carteGirate, setCarteGirate] = useState(0);
    const [arrayCarte, setArrayCarte] = useState([]);
    const [firstCardSelected, setFirstCardSelected] = useState();
    const [secondCardSelected, setSecondCardSelected] = useState();

    const [numeroCoppie, setNumeroCoppie] = useState(0);
    const [punteggio, setPunteggio] = useState(0);
    const [errori, setErrori] = useState(0);

    const [timer, setTimer] = useState(undefined);

    useEffect(() => {
        console.log(props.numeroCoppie)
    }, [])

    useEffect(() => {
        let countCard = 1;
        let arrayIniziale = []
        let numero;
        if(Number(props.numeroCoppie) === 2){
            numero = 4
        }
        if(Number(props.numeroCoppie) === 3){
            numero = 6
        }
        if(Number(props.numeroCoppie) === 4){
            numero = 8
        }
        if(Number(props.numeroCoppie)  === 5){
            numero = 10
        }

        //CREA CARTE
        for(var i=0; i < numero; i++){
            if(countCard <= 2){
                arrayIniziale.push({carta: "stella", id: i, girata: true, bloccaPunti: false})
            }
            if(countCard > 2 && countCard <= 4){
                arrayIniziale.push({carta: "pesce", id: i, girata: true, bloccaPunti: false})
            }
            if(countCard > 4 && countCard <= 6){
                arrayIniziale.push({carta: "foglia", id: i, girata: true, bloccaPunti: false})
            }
            if(countCard > 6 && countCard <= 8){
                arrayIniziale.push({carta: "cuore", id: i, girata: true, bloccaPunti: false})
            }
            if(countCard > 8){
                arrayIniziale.push({carta: "gatto", id: i, girata: true, bloccaPunti: false})
            }
            console.log(i)
            countCard++;
        }

        setNumeroCoppie(arrayIniziale.length/2);

        //MISCHIA CARTE
        for(let i = arrayIniziale.length-1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            const temp = arrayIniziale[i];
            arrayIniziale[i] = arrayIniziale[j];
            arrayIniziale[j] = temp;
        }
        console.log(arrayIniziale)
        setArrayCarte(arrayIniziale)
    }, [])

    useEffect(() => {
        if(timer <=0){
            clearInterval(interval);
            setArrayCarte(arrayCarte.map((carta) => ({...carta, girata: false})))
        }
    }, [timer]);

    useEffect(() => {
        if(firstCardSelected && secondCardSelected){
            if(firstCardSelected.carta === secondCardSelected.carta){
                setArrayCarte(arrayCarte.map((carta) => (carta.id === firstCardSelected.id ? {...carta, bloccaPunti: true} : carta.id === secondCardSelected.id ? {...carta, bloccaPunti: true} : carta)))
                if(!firstCardSelected.bloccaPunti && !secondCardSelected.bloccaPunti){
                    setPunteggio((punti) => punti + 1);
                }
            }
            else{
                setArrayCarte(arrayCarte.map((carta) => (! carta.bloccaPunti ? {...carta, girata: false} : carta)))
                if(errori < numeroCoppie){
                    setErrori((errore) => errore + 1);
                }
            }
            setFirstCardSelected();
            setSecondCardSelected();
        }
        aggiornaLogica();
    }, [firstCardSelected, secondCardSelected])

    useEffect(() => {
        if(gameFinished){
            setGameStarted(false);
            props.giocoTerminato((punteggio - errori), numeroCoppie);
        }
    }, [gameFinished])

    function iniziaGioco(){
        setGameStarted(true);
        setTimer(secondi);

        interval = setInterval(() => {
            if(secondi > 0){
                secondi = secondi - 1;
                setTimer(secondi);
            }
        }, 1000);
    }

    function giraCarta(cartaCliccata){
        if(timer <= 0){
            if(!firstCardSelected && !secondCardSelected && !cartaCliccata.bloccaPunti){
                setFirstCardSelected(cartaCliccata);
                setArrayCarte(arrayCarte.map((carta) => (carta.id === cartaCliccata.id ? {...carta, girata: true} : carta)))
            }
            if(firstCardSelected && !secondCardSelected && !cartaCliccata.bloccaPunti && (firstCardSelected.id !== cartaCliccata.id)){
                setSecondCardSelected(cartaCliccata);
                setArrayCarte(arrayCarte.map((carta) => (carta.id === cartaCliccata.id ? {...carta, girata: true} : carta)))
            }
        }
    }

    function aggiornaLogica(){
        let contaCarteGirate = 0;

        if(timer <=0){
            for(let i=0; i < arrayCarte.length; i++){
                if(arrayCarte[i].bloccaPunti === false){
                    break
                }
                else{
                    contaCarteGirate++;
                    // setCarteGirate(contaCarteGirate);
                }
            }
    
            if(contaCarteGirate === arrayCarte.length){
                setGameFinished(true)
            }
        }
    }

    return(
        <>
            {!gameStarted &&
                <div className={styles.wrap_generico}>
                    <h1 className={styles.pre_game}>Quando sei pronto, clicca su Inizia</h1>
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
                    {timer > 0 &&
                    <>
                        <p className={styles.domanda}>Memorizza le carte!</p>
                        <p className={styles.domanda}>{timer}</p>
                    </> 
                    }
                    {timer <= 0 &&
                    <>
                        <p className={styles.domanda}>Trova le coppie</p>
                    </> 
                    }
                    <div className={styles.wrapper_bottoni_risposte}>
                        {arrayCarte.map((carta) => (
                            <ReactCardFlip isFlipped={carta.girata}>
                                <div style={carta.bloccaPunti ? {borderColor: "green"} : {}} className={styles.card_wrapper} onClick={() => {giraCarta(carta)}}>
                                    <img className={styles.card_image_style} src={questionMark}></img>
                                </div>

                                <div style={carta.bloccaPunti ? {borderColor: "green"} : {}} className={styles.card_wrapper} onClick={() => {giraCarta(carta)}}>
                                    {carta.carta === "stella" && <img className={styles.card_image_style} src={star}></img>}
                                    {carta.carta === "pesce" && <img className={styles.card_image_style} src={fish}></img>}
                                    {carta.carta === "foglia" && <img className={styles.card_image_style} src={leaf}></img>}
                                    {carta.carta === "cuore" && <img className={styles.card_image_style} src={heart}></img>}
                                    {carta.carta === "gatto" && <img className={styles.card_image_style} src={cat}></img>}
                                </div>
                            </ReactCardFlip>
                        ))}
                    </div>
                    <div>Punteggio: {punteggio}</div>
                    <div>Errori: {errori}</div>
                </div>
            }
        </>
    );
}

export default ExercisePairGame;