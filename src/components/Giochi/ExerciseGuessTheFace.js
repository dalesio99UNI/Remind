import styles from './ExerciseGuessTheFace.module.css';
import GameButton from '../UI/GameButton';
import GenericAlternativeButton from '../UI/GenericAlternativeButton';
import { useContext, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

let counter_question_number = 0;
let counter_correct_answers = 0;
var arrayRisposte = [];
var arrayRisposteCorrette = [];
var arrayRisposteSbagliate = [];

var tipoQuiz;
var secondi;
var interval;

function ExerciseGuessTheFace(props){
    tipoQuiz = props.TIPOGIOCO;

    const [risposta1, setRisposta1] = useState('');
    const [risposta2, setRisposta2] = useState('');
    const [risposta3, setRisposta3] = useState('');
    const [risposta4, setRisposta4] = useState('');
    const [risposta5, setRisposta5] = useState('');
    const [risposta6, setRisposta6] = useState('');
    const [risposta7, setRisposta7] = useState('');
    const [risposta8, setRisposta8] = useState('');

    const [gameStarted, setGameStarted] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [messaggioRisposta, setMessaggioRisposta] = useState(null);

    const [rispCorretteMultiple, setRispCorretteMultiple] = useState(false);
    
    const [disableButton, setDisableButton] = useState(false);
    const [coloraRispostaCorretta_N1, setColoraRispostaCorretta_N1] = useState(false);
    const [coloraRispostaCorretta_N2, setColoraRispostaCorretta_N2] = useState(false);
    const [coloraRispostaCorretta_N3, setColoraRispostaCorretta_N3] = useState(false);
    const [coloraRispostaCorretta_N4, setColoraRispostaCorretta_N4] = useState(false);
    const [coloraRispostaCorretta_N5, setColoraRispostaCorretta_N5] = useState(false);
    const [coloraRispostaCorretta_N6, setColoraRispostaCorretta_N6] = useState(false);
    const [coloraRispostaCorretta_N7, setColoraRispostaCorretta_N7] = useState(false);
    const [coloraRispostaCorretta_N8, setColoraRispostaCorretta_N8] = useState(false);
    const [coloraRispostaSbagliata_N1, setColoraRispostaSbagliata_N1] = useState(false);
    const [coloraRispostaSbagliata_N2, setColoraRispostaSbagliata_N2] = useState(false);
    const [coloraRispostaSbagliata_N3, setColoraRispostaSbagliata_N3] = useState(false);
    const [coloraRispostaSbagliata_N4, setColoraRispostaSbagliata_N4] = useState(false);
    const [coloraRispostaSbagliata_N5, setColoraRispostaSbagliata_N5] = useState(false);
    const [coloraRispostaSbagliata_N6, setColoraRispostaSbagliata_N6] = useState(false);
    const [coloraRispostaSbagliata_N7, setColoraRispostaSbagliata_N7] = useState(false);
    const [coloraRispostaSbagliata_N8, setColoraRispostaSbagliata_N8] = useState(false);

    const [timer, setTimer] = useState(undefined);
    const questions = props.domandeGioco;

    const websiteUrl = "/immagini/";

    useEffect(() => {
        counter_question_number = 0;

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
            setColoraRispostaSbagliata_N1(true);
            setColoraRispostaSbagliata_N2(true);
            setColoraRispostaSbagliata_N3(true);
            setColoraRispostaSbagliata_N4(true);
            setColoraRispostaSbagliata_N5(true);
            setColoraRispostaSbagliata_N6(true);
            setColoraRispostaSbagliata_N7(true);
            setColoraRispostaSbagliata_N8(true);
            setDisableButton(true);
            setHasAnswered(true);
        }
    }, [timer]);

    useEffect(() => {
        arrayRisposteCorrette = [];
        arrayRisposteSbagliate = [];

        // SULLA LINEA DEL CICLO for SI è VERIFICATO UN BUG(solo una volta), NON RIESCO A RICREARLO---> MANTIENI QUESTO COMMENTO FINO A QUANDO NON OTTIENI INFO IN MERITO
        // for(var i=0; i < Object.keys(questions[counter_question_number].rispCorrette).length; i++){
               let currentQuestion = questions[counter_question_number];

     if (currentQuestion) {
      
         if (currentQuestion.rispCorrettaN1 && currentQuestion.rispCorrettaN1.trim().length > 0) {
             arrayRisposteCorrette.push(currentQuestion.rispCorrettaN1);
         }
         if (currentQuestion.rispCorrettaN2 && currentQuestion.rispCorrettaN2.trim().length > 0) {
             arrayRisposteCorrette.push(currentQuestion.rispCorrettaN2);
         }
         if (currentQuestion.rispCorrettaN3 && currentQuestion.rispCorrettaN3.trim().length > 0) {
             arrayRisposteCorrette.push(currentQuestion.rispCorrettaN3);
         }
         if (currentQuestion.rispCorrettaN4 && currentQuestion.rispCorrettaN4.trim().length > 0) {
             arrayRisposteCorrette.push(currentQuestion.rispCorrettaN4);
         }

         if (currentQuestion.rispSbagliataN1 && currentQuestion.rispSbagliataN1.trim().length > 0) {
             arrayRisposteSbagliate.push(currentQuestion.rispSbagliataN1);
         }
         if (currentQuestion.rispSbagliataN2 && currentQuestion.rispSbagliataN2.trim().length > 0) {
             arrayRisposteSbagliate.push(currentQuestion.rispSbagliataN2);
         }
         if (currentQuestion.rispSbagliataN3 && currentQuestion.rispSbagliataN3.trim().length > 0) {
             arrayRisposteSbagliate.push(currentQuestion.rispSbagliataN3);
         }
         if (currentQuestion.rispSbagliataN4 && currentQuestion.rispSbagliataN4.trim().length > 0) {
             arrayRisposteSbagliate.push(currentQuestion.rispSbagliataN4);
         }
     } else {
         console.log("La domanda corrente non esiste o non è definita");
     }
        // }
        console.log(arrayRisposteCorrette);
        console.log(arrayRisposteSbagliate);
        if(arrayRisposteCorrette.length > 1){
            setRispCorretteMultiple(true);
        }
        else{
            setRispCorretteMultiple(false);
        }
        shuffleAnswers();
    }, [counter_question_number]);

    function checkTheAnswer(answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, button){
        let risp1 = questions[counter_question_number].rispCorrettaN1;
        let risp2 = questions[counter_question_number].rispCorrettaN2;
        let risp3 = questions[counter_question_number].rispCorrettaN3;
        let risp4 = questions[counter_question_number].rispCorrettaN4;

        let numeroRisposteCorrette = arrayRisposteCorrette.length;
        console.log(numeroRisposteCorrette);

        console.log("INTERVAL dentro checktheanswer--->" + interval);

        if((answer1 === risp1 || answer1 === risp2 || answer1 === risp3 || answer1 === risp4) && button === "BOTTONE_1"){
            setColoraRispostaCorretta_N1(true);
            if(button === "BOTTONE_1"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer1 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_1"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N1(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }


        if((answer2 === risp1 || answer2 === risp2 || answer2 === risp3 || answer2 === risp4) && button === "BOTTONE_2"){
            setColoraRispostaCorretta_N2(true);
            if(button === "BOTTONE_2"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer2 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_2"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N2(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }

        if((answer3 === risp1 || answer3 === risp2 || answer3 === risp3 || answer3 === risp4) && button === "BOTTONE_3"){
            setColoraRispostaCorretta_N3(true);
            if(button === "BOTTONE_3"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer3 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_3"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N3(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }

        if((answer4 === risp1 || answer4 === risp2 || answer4 === risp3 || answer4 === risp4) && button === "BOTTONE_4"){
            setColoraRispostaCorretta_N4(true);
            if(button === "BOTTONE_4"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer4 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_4"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N4(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }
        if((answer5 === risp1 || answer5 === risp2 || answer5 === risp3 || answer5 === risp4) && button === "BOTTONE_5"){
            setColoraRispostaCorretta_N5(true);
            if(button === "BOTTONE_5"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer5 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_5"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N5(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }
        if((answer6 === risp1 || answer6 === risp2 || answer6 === risp3 || answer6 === risp4) && button === "BOTTONE_6"){
            setColoraRispostaCorretta_N6(true);
            if(button === "BOTTONE_6"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer6 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_6"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N6(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }
        if((answer7 === risp1 || answer7 === risp2 || answer7 === risp3 || answer7 === risp4) && button === "BOTTONE_7"){
            setColoraRispostaCorretta_N7(true);
            if(button === "BOTTONE_7"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer7 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_7"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N7(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }
        if((answer8 === risp1 || answer8 === risp2 || answer8 === risp3 || answer8 === risp4) && button === "BOTTONE_8"){
            setColoraRispostaCorretta_N8(true);
            if(button === "BOTTONE_8"){
                for(var i=0; i < arrayRisposteCorrette.length; i++){
                    if(answer8 === arrayRisposteCorrette[i]){
                        arrayRisposteCorrette.splice(i, 1);
                    }
                }
                if(arrayRisposteCorrette.length === 0){
                    counter_correct_answers++;
                    setMessaggioRisposta(true)
                    clearInterval(interval);
                    setDisableButton(true);
                    setHasAnswered(true);
                }
            }
        }
        else{
            if(button === "BOTTONE_8"){
                for(var x=0; x < arrayRisposteCorrette.length; x++){
                    arrayRisposteCorrette[x] === answer1 ? setColoraRispostaCorretta_N1(true) : arrayRisposteCorrette[x] === answer2 ? setColoraRispostaCorretta_N2(true) :
                    arrayRisposteCorrette[x] === answer3 ? setColoraRispostaCorretta_N3(true) : arrayRisposteCorrette[x] === answer4 ? setColoraRispostaCorretta_N4(true) :
                    arrayRisposteCorrette[x] === answer5 ? setColoraRispostaCorretta_N5(true) : arrayRisposteCorrette[x] === answer6 ? setColoraRispostaCorretta_N6(true) :
                    arrayRisposteCorrette[x] === answer7 ? setColoraRispostaCorretta_N7(true) : arrayRisposteCorrette[x] === answer8 ? setColoraRispostaCorretta_N8(true) :
                    setColoraRispostaCorretta_N8(false);
                }
                setMessaggioRisposta(false)
                setColoraRispostaSbagliata_N8(true);
                clearInterval(interval);
                setDisableButton(true);
                setHasAnswered(true);
            }
        }
    }

    function shuffleAnswers(){
        arrayRisposte.length = 0;
        var numeroTotaleRisposte_CORRETTE = arrayRisposteCorrette.length;
        var numeroTotaleRisposte_SBAGLIATE = arrayRisposteSbagliate.length;
        // console.log(numeroTotaleRisposte);

        for(var i=0; i < numeroTotaleRisposte_CORRETTE; i++){
            arrayRisposte.push(arrayRisposteCorrette[i]);
        }
        for(var j=0; j < numeroTotaleRisposte_SBAGLIATE; j++){
            arrayRisposte.push(arrayRisposteSbagliate[j]);
        }
        
        for(let i = arrayRisposte.length-1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i+1));
            const temp = arrayRisposte[i];
            arrayRisposte[i] = arrayRisposte[j];
            arrayRisposte[j] = temp;
        }
        // console.log(arrayRisposte);
        setRisposta1(arrayRisposte[0]);
        setRisposta2(arrayRisposte[1]);
        setRisposta3(arrayRisposte[2]);
        setRisposta4(arrayRisposte[3]);
        setRisposta5(arrayRisposte[4]);
        setRisposta6(arrayRisposte[5]);
        setRisposta7(arrayRisposte[6]);
        setRisposta8(arrayRisposte[7]);

        console.log(arrayRisposte);
    }

    function iniziaGioco(){
        setGameStarted(true);
        counter_correct_answers = 0;
        counter_question_number = 0;
        shuffleAnswers();
    }

    function aggiornaLogica(){
        if(counter_question_number < questions.length-1){
            counter_question_number++;
            arrayRisposte = [];
        }
        else{
            setGameStarted(false);
            counter_question_number = 0;
            props.giocoTerminato(counter_correct_answers, questions.length);
        }

        setColoraRispostaCorretta_N1(false);
        setColoraRispostaCorretta_N2(false);
        setColoraRispostaCorretta_N3(false);
        setColoraRispostaCorretta_N4(false);
        setColoraRispostaCorretta_N5(false);
        setColoraRispostaCorretta_N6(false);
        setColoraRispostaCorretta_N7(false);
        setColoraRispostaCorretta_N8(false);

        setColoraRispostaSbagliata_N1(false);
        setColoraRispostaSbagliata_N2(false);
        setColoraRispostaSbagliata_N3(false);
        setColoraRispostaSbagliata_N4(false);
        setColoraRispostaSbagliata_N5(false);
        setColoraRispostaSbagliata_N6(false);
        setColoraRispostaSbagliata_N7(false);
        setColoraRispostaSbagliata_N8(false);

        setDisableButton(false);
        setHasAnswered(false);

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

        shuffleAnswers();
    }

    return(
        <>
            {/* <hr className={styles.horizontal_line}></hr>
            <h2 className={styles.explanation}>Seleziona la risposta che ritieni corretta</h2>
            <hr className={styles.horizontal_line}></hr> */}
            
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
            
            {gameStarted && questions[counter_question_number] && (
  <div className={styles.wrapper_gioco}>
    {tipoQuiz === "QUIZ CON IMMAGINI" && (
      <>
        <h1 className={styles.domanda}>Domanda N.{counter_question_number + 1}</h1>
        <h1 className={styles.domanda}>{questions[counter_question_number].domanda}</h1>
        <img
          className={styles.resize_image}
          src={websiteUrl.concat(questions[counter_question_number].immagine)}
          alt="Face"
        />
      </>
    )}

    {tipoQuiz === "QUIZ CON SUONI" && (
      <>
        <h1 className={styles.domanda}>Domanda N.{counter_question_number + 1}</h1>
        <h1 className={styles.domanda}>{questions[counter_question_number].domanda}</h1>
        <audio
          controls={true}
          autoPlay={true}
          src={websiteUrl.concat(questions[counter_question_number].immagine)}
        />
      </>
    )}

{tipoQuiz === "QUIZ CON VIDEO" && (
  <>
    <h1 className={styles.domanda}>Domanda N.{counter_question_number + 1}</h1>
    <h1 className={styles.domanda}>{questions[counter_question_number].domanda}</h1>
    <video
      key={counter_question_number} 
      controls
      autoPlay
      width="640"
      height="360"
    >
      <source src={websiteUrl.concat(questions[counter_question_number].immagine)} type="video/mp4" />
      Il tuo browser non supporta il tag video.
    </video>
  </>
)}



    {tipoQuiz === "QUIZ" && (
      <>
        <h1 className={styles.domanda}>Domanda N.{counter_question_number + 1}</h1>
        <h1 className={styles.domanda}>{questions[counter_question_number].domanda}</h1>
      </>
    )}

    {rispCorretteMultiple && (
      <Badge bg="warning" text="dark" style={{ fontSize: "15px" }}>
        ! Questa domanda ha più risposte corrette !
      </Badge>
    )}

    <div className={styles.wrapper_horizontal_flex}>
      <p className={styles.risposte_corrette}>
        Indovinate: {counter_correct_answers}/{questions.length}
      </p>
      {/* {props.LIVELLOGIOCO !== "FACILE" && <p>TIMER: {timer}</p>} */}
    </div>

    {hasAnswered && (
      <>
        <GenericAlternativeButton onClick={aggiornaLogica} buttonText={"PROSSIMA"} />
        {messaggioRisposta && (
          <p style={{ color: "green" }} className={styles.messaggio_risposta}>
            😍 Complimenti! Hai indovinato
          </p>
        )}
        {!messaggioRisposta && (
          <p style={{ color: "red" }} className={styles.messaggio_risposta}>
            😔 Peccato. Risposta sbagliata
          </p>
        )}
      </>
    )}

    <div className={styles.wrapper_bottoni_risposte}>
    
      {arrayRisposte.length > 0 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_1');
          }}
          correct_answer={coloraRispostaCorretta_N1}
          wrong_answer={coloraRispostaSbagliata_N1}
          buttonText={risposta1}
          is_disabled={disableButton}
          game_button={true}
        />
      )}

      {arrayRisposte.length > 1 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_2');
          }}
          correct_answer={coloraRispostaCorretta_N2}
          wrong_answer={coloraRispostaSbagliata_N2}
          buttonText={risposta2}
          is_disabled={disableButton}
          game_button={true}
        />
      )}

      {arrayRisposte.length > 2 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_3');
          }}
          correct_answer={coloraRispostaCorretta_N3}
          wrong_answer={coloraRispostaSbagliata_N3}
          buttonText={risposta3}
          is_disabled={disableButton}
          game_button={true}
        />
      )}

      {arrayRisposte.length > 3 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_4');
          }}
          correct_answer={coloraRispostaCorretta_N4}
          wrong_answer={coloraRispostaSbagliata_N4}
          buttonText={risposta4}
          is_disabled={disableButton}
          game_button={true}
        />
      )}

      {arrayRisposte.length > 4 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_5');
          }}
          correct_answer={coloraRispostaCorretta_N5}
          wrong_answer={coloraRispostaSbagliata_N5}
          buttonText={risposta5}
          is_disabled={disableButton}
          game_button={true}
        />
      )}

      {arrayRisposte.length > 5 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_6');
          }}
          correct_answer={coloraRispostaCorretta_N6}
          wrong_answer={coloraRispostaSbagliata_N6}
          buttonText={risposta6}
          is_disabled={disableButton}
          game_button={true}
        />
      )}

      {arrayRisposte.length > 6 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_7');
          }}
          correct_answer={coloraRispostaCorretta_N7}
          wrong_answer={coloraRispostaSbagliata_N7}
          buttonText={risposta7}
          is_disabled={disableButton}
          game_button={true}
        />
      )}

      {arrayRisposte.length > 7 && (
        <GameButton
          onClick={() => {
            checkTheAnswer(risposta1, risposta2, risposta3, risposta4, risposta5, risposta6, risposta7, risposta8, 'BOTTONE_8');
          }}
          correct_answer={coloraRispostaCorretta_N8}
          wrong_answer={coloraRispostaSbagliata_N8}
          buttonText={risposta8}
          is_disabled={disableButton}
          game_button={true}
        />
      )}
    </div>
  </div>
)}

        </>
    );
}

export default ExerciseGuessTheFace;