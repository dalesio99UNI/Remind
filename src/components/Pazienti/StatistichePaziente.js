import { useEffect, useState } from "react";
import styles from "./StatistichePaziente.module.css";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import { ProgressBar } from "react-bootstrap";

function StatistichePaziente(props){
    // let fillCorrect = "0%";
    // let fillWrong = "0%";
    const [today, setToday] = useState();
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const [fillCorrect, setFillCorrect] = useState(0);
    const [fillWrong, setFillWrong] = useState(0);

    const [risultatiTotali, setRisultatiTotali] = useState(props.stats);

    const [risposteTotali, setRisposteTotali] = useState(0);
    const [risposteCorrette, setRisposteCorrette] = useState(0);
    const [risposteSbagliate, setRisposteSbagliate] = useState(0);

    const [filtroStatistiche, setFiltroStatistiche] = useState("Totali");

    const patientID = props.pazienteID;

    useEffect(() => {
        var today = new Date();
        var day = parseInt(today.toLocaleString('it-IT', {day: '2-digit'}))
        var month = parseInt(today.toLocaleString('it-IT', {month: '2-digit'}))
        var year = parseInt(today.getFullYear());

        setToday(Date.parse(today));
        setDay(day);
        setMonth(month);
        setYear(year);

        console.log(Date.parse(today))
        
    }, [])

    useEffect(() => {
        // setRisposteTotali(0);
        // setRisposteCorrette(0);
        // setRisposteSbagliate(0);
        filtraRisultatiTotali();
        // calculatePercentage();
    }, [filtroStatistiche])

    // async function getPatientLifetimeStatistics(){
    //     let result;

    //     result = await getServerMgr().getPatientStatistics(patientID);

    //     risultatiTotali = result;
        
    // }

    function filtraRisultatiTotali(){
        let risposte_TOT = 0;
        let risposte_CORR = 0;
        let risposte_SBAG = 0;

        if(risultatiTotali){
            switch(filtroStatistiche){
                case "Totali":
                    risultatiTotali.forEach((item) => {
                        risposte_TOT += item.rispTotali;
                        risposte_CORR += item.rispCorrette;
                        risposte_SBAG += item.rispSbagliate;
                        // setRisposteTotali((prevRispTot) => (prevRispTot + item.rispTotali));
                        // setRisposteCorrette((prevRispCorr) => (prevRispCorr + item.rispCorrette));
                        // setRisposteSbagliate((prevRispSbag) => (prevRispSbag + item.rispSbagliate));
                    });
                    // setFillCorrect((risposte_CORR / risposte_TOT) * 100)
                    // setFillWrong((risposte_SBAG / risposte_TOT) * 100)
                    setRisposteTotali(risposte_TOT);
                    setRisposteCorrette(risposte_CORR);
                    setRisposteSbagliate(risposte_SBAG);
                    // console.log(risposte_TOT)
                    break;
                case "ultime 48 ore":
                    risultatiTotali.forEach((item) => {
                        var dataEsecuzioneGioco = new Date(item.dataSvolgimento);
                        // console.log(today - Date.parse(dataEsecuzioneGioco))

                        // console.log(dataEsecuzioneGioco.getFullYear() === year);
                        // console.log((dataEsecuzioneGioco.getMonth() + 1) === month);
                        // console.log((dataEsecuzioneGioco.getDate() + 1) === day);
                        // console.log(dataEsecuzioneGioco.getDate() === day);
                        
                        if(today - Date.parse(dataEsecuzioneGioco) < 172800000){
                            risposte_TOT += item.rispTotali;
                            risposte_CORR += item.rispCorrette;
                            risposte_SBAG += item.rispSbagliate;
                        }
                        
                    });
                    setRisposteTotali(risposte_TOT);
                    setRisposteCorrette(risposte_CORR);
                    setRisposteSbagliate(risposte_SBAG);
                    break;
                case "ultima settimana":
                    risultatiTotali.forEach((item) => {
                        var dataEsecuzioneGioco = new Date(item.dataSvolgimento);

                        // console.log((dataEsecuzioneGioco.getMonth() + 1) === month);
                        // console.log((dataEsecuzioneGioco.getDate() + 1) === day);
                        // console.log(dataEsecuzioneGioco.getDate() === day);
                        
                        if(today - Date.parse(dataEsecuzioneGioco) < 604800000){
                            risposte_TOT += item.rispTotali;
                            risposte_CORR += item.rispCorrette;
                            risposte_SBAG += item.rispSbagliate;
                        }
                        
                    });
                    setRisposteTotali(risposte_TOT);
                    setRisposteCorrette(risposte_CORR);
                    setRisposteSbagliate(risposte_SBAG);
                    break;
                case "ultimi 30 giorni":
                    risultatiTotali.forEach((item) => {
                        var dataEsecuzioneGioco = new Date(item.dataSvolgimento);
                        console.log(today - Date.parse(dataEsecuzioneGioco) < 604800000);

                        // console.log(dataEsecuzioneGioco.getFullYear() === year);
                        // console.log((dataEsecuzioneGioco.getMonth() + 1) === month);
                        // console.log((dataEsecuzioneGioco.getDate() + 1) === day);
                        // console.log(dataEsecuzioneGioco.getDate() === day);
                        
                        if(today - Date.parse(dataEsecuzioneGioco) < 2600640000){
                            risposte_TOT += item.rispTotali;
                            risposte_CORR += item.rispCorrette;
                            risposte_SBAG += item.rispSbagliate;
                        }
                        
                    });
                    setRisposteTotali(risposte_TOT);
                    setRisposteCorrette(risposte_CORR);
                    setRisposteSbagliate(risposte_SBAG);
                    break;
                default:
                    break;
            }
            
        }
        // calculatePercentage();
    }

    function filtroStatisticheChangeHandler(event){
        setFiltroStatistiche(event.target.value);
        console.log(event.target.value)
    }

    function calculatePercentage(){
        if(risposteTotali > 0){
            setFillCorrect(Math.round((risposteCorrette / risposteTotali) * 100));
            setFillWrong(Math.round((risposteSbagliate / risposteTotali) * 100));
        }
        else{
            setFillCorrect(0)
            setFillWrong(0)
        }
    }
    

    return(
        <>
            <div className={styles.vertical}>
                <h4 className={styles.subtitle}>Periodo temporale:</h4>
                <select value={filtroStatistiche} onChange={filtroStatisticheChangeHandler} className={styles.select_style}>
                    <option>Totali</option>
                    <option>ultime 48 ore</option>
                    <option>ultima settimana</option>
                    <option>ultimi 30 giorni</option>
                </select>
            </div>
            
            {/* <h1>CIAOO</h1> */}
            <div className={styles.wrapper_statistiche}>
                <div className={styles.wrapper_barre}>
                    <h3 style={{width: "90%", textAlign: "left", color: "#163172"}}>Percentuali</h3>
                    <div style={{width: "90%", margin: "5px"}}>
                        <ProgressBar animated now={risposteTotali === 0 ? 0 : (risposteCorrette/risposteTotali) * 100} variant="success"
                        ></ProgressBar>
                        <div style={{color: "darkgreen"}}>Percentuale risposte corrette: {risposteTotali === 0 ? '0%' : `${((risposteCorrette/risposteTotali) * 100).toFixed(2)}%`}</div>
                    </div>
                    <div style={{width: "90%", margin: "5px"}}>
                        <ProgressBar animated now={risposteTotali === 0 ? 0 : (risposteSbagliate/risposteTotali) * 100} variant="danger"
                        ></ProgressBar>
                        <div style={{color: "darkred"}}>Percentuale risposte sbagliate: {risposteTotali === 0 ? '0%' : `${((risposteSbagliate/risposteTotali) * 100).toFixed(2)}%`}</div>
                    </div>

                    {/* <div className={styles.barra}>
                        <div style={{width: fillWrong}} className={styles.riempimento_barra_sbagliate}></div>
                    </div> */}
                </div>
                <div className={styles.wrapper_numeri}>
                    <h3 style={{width: "90%", textAlign: "left", color: "#163172"}}>Numeri</h3>
                    <label className={styles.content_style}>Numero totale di domande svolte: {risposteTotali}</label>
                    <label className={styles.content_style}>Totale risposte corrette: {risposteCorrette}</label>
                    <label className={styles.content_style}>Totale risposte sbagliate: {risposteSbagliate}</label>
                </div>
                
            </div>
        </>
    );
}

export default StatistichePaziente;