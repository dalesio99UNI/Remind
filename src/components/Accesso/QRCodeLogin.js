import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import AuthContext from "../../context/auth-context";

function QRCodeLogin(){
    const params = useParams();
    const auth_ctx = useContext(AuthContext);

    useEffect(() => {
        if(params.UID){
            loginWithQR();
        }
        else{
            alert("ERRORE! Riprova a scannerizzare il QR code")
        }
    }, [])

    const navigate = useNavigate();

    async function loginWithQR(){
        let result = await getServerMgr().loginWithQR(params.UID)
        console.log(result);

        if(result !== undefined && result !== null){
            console.log("Tento login tramite QR code");
            auth_ctx.login(result[0].email, result[0].UID, result[0].titolo, result[0].nome, result[0].cognome, result[0].patientID)
            localStorage.setItem('UID', params.UID);
            if(result[0].titolo === 3){
                navigate(`/giochi/${params.UID}`);
            }
            else{
                navigate(`/pazienti/${params.UID}`);
            }
        }
    }

    return(
        <>
            <div style={{fontSize: "30px"}}>Ciao! Login con QR Code</div>
            <div style={{fontSize: "30px"}}>{params.UID}</div>
        </>
    );
}

export default QRCodeLogin;