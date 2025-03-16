let serverMgr = null;

export function getServerMgr(cb) {
    if(serverMgr === null) {
        initServerMgr(() => {
            serverMgr.init(cb);
           
        })
    } else {        
        return serverMgr;
    }
}

function initServerMgr(cb) {
    serverMgr = {};

    serverMgr.init = (cb) => {
        if (cb) cb();
    }

    serverMgr.requestFetchData = async (service, args) => {
        let prova = args
        ?
        JSON.stringify({
            "service": service,
            ...args 
        })
        :
        JSON.stringify({
            "service": service
        })

        try{
            const response = await fetch("http://localhost:8000/connection.php", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: prova
            })
            const data = await response.text();
            console.log("requestFetchData: " + data)
            return JSON.parse(data); 
        }
        catch (error) {
            console.log("ERROR requestFetchData: " + error)
        }
    }

    serverMgr.getLogin = async (email, password, cb) => {
        let result = await serverMgr.requestFetchData("getLogin", {email: email, password: password})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.keepUserLoggedIn = async (UID, cb) => {
        let result = await serverMgr.requestFetchData("keepUserLoggedIn", {UID: UID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.loginWithQR = async (UID, cb) => {
        let result = await serverMgr.requestFetchData("loginWithQR", {UID: UID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getAccount = async (email, cb) => {
        let result = await serverMgr.requestFetchData("getAccount", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getAccountByEmail = async (email, cb) => {
        let result = await serverMgr.requestFetchData("getAccountByEmail", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addAccount = async (nome, cognome, titolo, email, password, patientID, cb) => {
        let result = await serverMgr.requestFetchData("addAccount", {nome: nome, cognome: cognome, titolo: titolo, email: email, password: password, patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.CreateBoxPatient = async (id_paziente,nome, cognome, citta, eta, cb) => {
      
        let result = await serverMgr.requestFetchData("CreateBoxPatient", {
            id_paziente:id_paziente,
            nome: nome,
            cognome: cognome,
            citta: citta,
            eta: eta
            
            
        });    
      
        if (cb) {
            cb(result);
        } else {
           
            return result;
        }
    };


    
    

    serverMgr.updatePatientWithProfileID = async (accountID, patientID, email, cb) => {
       
        let result = await serverMgr.requestFetchData("updatePatientWithProfileID", { accountID: accountID, patientID: patientID, email: email });
    
        if (cb) {
          
            cb(result);
        } else {
            
            return result;
        }
    }
    

    serverMgr.getBoxByUID = async (uid, isDoctor, cb) => {
      
        let result = await serverMgr.requestFetchData("getBoxByUID", { uid: uid, isDoctor: isDoctor });
    
        if (cb) {
            cb(result);
        } else {
         
            return result;
        }
    };
    

    serverMgr.getBoxPazienteByID = async (id, cb) => {
        try {
           
            let result = await serverMgr.requestFetchData("getBoxPazienteByID", {id: id});
            
         
            if (cb) {
                cb(result);
            } else {
               
                return result;
            }
        } catch (error) {
            console.error("Errore durante il recupero della box per ID:", error);
            throw error;  
        }
    };
    


    serverMgr.updateBox = async (id, boxData, cb) => {
       
        let result = await serverMgr.requestFetchData("updateBox", { id: id, data: boxData });
    console.log("dati inviati al backend",id,boxData);
        
        if (cb) {
            cb(result);
        } else {
          
            return result;
        }
    };
    
    serverMgr.getRicordiByBoxId = async (boxID, cb) => {
        try {
           
            let result = await serverMgr.requestFetchData("getRicordiByBoxId", { id_box: boxID });
            
            console.log("Ricordi recuperati dal backend per il box:", boxID, result);
    
            
            if (cb) {
                cb(result);
            } else {
               
                return result;
            }
        } catch (error) {
            console.error("Errore nel recupero dei ricordi:", error);
            throw new Error("Errore nel recupero dei ricordi.");
        }
    };

    serverMgr.getRicordoById = async (idRicordo, cb) => {
        try {
            
            let result = await serverMgr.requestFetchData("getRicordoById", { id_ricordo: idRicordo });
    
            console.log("Dettagli del ricordo recuperati dal backend:", idRicordo, result);
    
            
            if (cb) {
                cb(result);
            } else {
              
                return result;
            }
        } catch (error) {
            console.error("Errore nel recupero del ricordo:", error);
            throw new Error("Errore nel recupero del ricordo.");
        }
    };
    
    
    serverMgr.updateRicordo = async (idRicordo, ricordo, cb) => {
        try {
           
            const multimediaFormatted = ricordo.multimedia.map(file => {
                if (file && file.name) {
                  
                    return { url: "immagini/" + file.name }; 
                } else if (file && file.url) {
                 
                    return { url: file.url }; 
                }
                return null; 
            }).filter(item => item !== null); 
    
           
            const updatedRicordo = {
                id_ricordo: idRicordo,
                titolo: ricordo.titolo,
                descrizione: ricordo.descrizione,
                tipo: ricordo.tipo,
                latitudine: ricordo.latitudine,
                longitudine: ricordo.longitudine,
                multimedia: multimediaFormatted, 
            };
    
            console.log("Questi sono i multimedia passati al backend:", updatedRicordo);
    
           
            let result = await serverMgr.requestFetchData("updateRicordo", updatedRicordo, "PUT");
    
            console.log("Ricordo aggiornato con successo:", idRicordo, result);
    
          
            if (cb) {
                cb(result);
            } else {
                return result;
            }
        } catch (error) {
            console.error("Errore nell'aggiornamento del ricordo:", error);
            throw new Error("Errore nell'aggiornamento del ricordo.");
        }
    };
    
    
    

    serverMgr.deleteRicordoById = async (idRicordo, cb) => {
        try {
          
            const dataToDelete = {
                id_ricordo: idRicordo  
            };
        
           
            let result = await serverMgr.requestFetchData("deleteRicordoById", dataToDelete, "DELETE");
        
            console.log("Ricordo eliminato con successo:", idRicordo, result);
        
           
            if (cb) {
                cb(result);
            } else {
               
                return result;
            }
        } catch (error) {
            console.error("Errore nell'eliminazione del ricordo:", error);
            throw new Error("Errore nell'eliminazione del ricordo.");
        }
    };
    


    serverMgr.insertRicordo = async (ricordoData, cb) => {
        try {
            
            let result = await serverMgr.requestFetchData("insertRicordo", ricordoData);
    
           
            const formDataObject = {};
            
           
            Object.entries(ricordoData).forEach(([key, value]) => {
                formDataObject[key] = value;
            });
    
            console.log("Dati inviati al backend:", formDataObject);
    
            
            if (cb) {
                cb(result);
            } else {
                return result;
            }
        } catch (error) {
            console.error("Errore durante l'inserimento del ricordo:", error);
            return { success: false, error: error.message };
        }
    };
    
    



    serverMgr.deleteBoxByID = async (id, cb) => {
        try {
           
            let result = await serverMgr.requestFetchData("deleteBoxByID", { id: id });
            console.log("Box eliminato, ID:", id, "Risultato:", result);
            
           
            if (cb) {
                cb(result);
            } else {
              
                return result;
            }
        } catch (error) {
            console.error("Errore durante l'eliminazione del box:", error);
            throw error;  
        }
    };
    
    serverMgr.getPatientByCodiceFiscale = async (codiceFiscale, cb) => {
        let result = await serverMgr.requestFetchData("getPatientByCodiceFiscale", { codiceFiscale: codiceFiscale });
        
        if (cb) {
            cb(result);
        } else {
            return result;
        }
    };
    


    serverMgr.getPatientCredentials = async (patientID, cb) => {
        let result = await serverMgr.requestFetchData("getPatientCredentials", {patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getGamesListForPatientAccount = async (patientID, cb) => {
        let result = await serverMgr.requestFetchData("getGamesListForPatientAccount", {patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getPatientsList = async (UID, cb) => {
        let result = await serverMgr.requestFetchData("getPatientsList", {doct_UID: UID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getPatientMedia = async (patient_ID, cb) => {
       
        let result = await serverMgr.requestFetchData("getPatientMedia", { patient_ID: patient_ID });
        
        
        if (cb) {
            cb(result);
        } else {
           
            return result;
        }
    };
    



    serverMgr.getPatientsListArray = async (UID, cb) => {
        let result = await serverMgr.requestFetchData("getPatientsListArray", {doct_UID: UID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    

    serverMgr.infoMedicine = async (ID, cb) => {
        let result = await serverMgr.requestFetchData("infoMedicine", {ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addPaziente = async (doct_UID, nome, cognome, city, codiceFiscale, dataNascita, contattoEmail, contattoCellulare, informazioniMediche, cb) => {
        let result = await serverMgr.requestFetchData("addPaziente", {
            doct_UID: doct_UID,
            nome: nome,
            cognome: cognome,
            city: city,
            codiceFiscale: codiceFiscale,
            dataNascita: dataNascita,
            contattoEmail: contattoEmail,
            contattoCellulare: contattoCellulare,
            informazioniMediche: informazioniMediche
            // statistiche: statistiche
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.insertCredentialsPatient = async (patientID, cb) => {
        let result = await serverMgr.requestFetchData("insertCredentialsPatient", {patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updatePaziente = async (nome, cognome, city, codiceFiscale, dataNascita, contattoEmail, contattoCellulare, informazioniMediche, listaGiochi, ID, cb) => {
        let result = await serverMgr.requestFetchData("updatePaziente", {
            nome: nome,
            cognome: cognome,
            city: city,
            codiceFiscale: codiceFiscale,
            dataNascita: dataNascita,
            contattoEmail: contattoEmail,
            contattoCellulare: contattoCellulare,
            informazioniMediche: informazioniMediche,
            listaGiochi: listaGiochi,
            ID: ID
            // statistiche: statistiche
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.deletePaziente = async (ID, cb) => {
        let result = await serverMgr.requestFetchData("deletePaziente", {ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getQuestionsList = async (doctor_UID, cb) => {
        let result = await serverMgr.requestFetchData("getQuestionsList", {doctor_UID: doctor_UID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addQuestion = async (doctor_UID, tipoGioco, categoria, domanda, rispCorrettaN1, rispCorrettaN2, rispCorrettaN3, rispCorrettaN4, rispSbagliataN1, rispSbagliataN2, rispSbagliataN3, rispSbagliataN4, immagine, suggerimento, cb) => {
        let result = await serverMgr.requestFetchData("addQuestion", {
            doctor_UID: doctor_UID,
            tipoGioco: tipoGioco,
            categoria: categoria,
            domanda: domanda,
            rispCorrettaN1: rispCorrettaN1,
            rispCorrettaN2: rispCorrettaN2,
            rispCorrettaN3: rispCorrettaN3,
            rispCorrettaN4: rispCorrettaN4,
            rispSbagliataN1: rispSbagliataN1,
            rispSbagliataN2: rispSbagliataN2,
            rispSbagliataN3: rispSbagliataN3,
            rispSbagliataN4: rispSbagliataN4,
            immagine: immagine,
            suggerimento: suggerimento
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updateQuestion = async (domanda, rispCorrettaN1, rispCorrettaN2, rispCorrettaN3, rispCorrettaN4, rispSbagliataN1, rispSbagliataN2, rispSbagliataN3, rispSbagliataN4, immagine, suggerimento, ID, cb) => {
        let result = await serverMgr.requestFetchData("updateQuestion", {
            domanda: domanda,
            rispCorrettaN1: rispCorrettaN1,
            rispCorrettaN2: rispCorrettaN2,
            rispCorrettaN3: rispCorrettaN3,
            rispCorrettaN4: rispCorrettaN4,
            rispSbagliataN1: rispSbagliataN1,
            rispSbagliataN2: rispSbagliataN2,
            rispSbagliataN3: rispSbagliataN3,
            rispSbagliataN4: rispSbagliataN4,
            immagine: immagine,
            suggerimento: suggerimento,
            ID: ID
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.deleteQuestion = async (ID, cb) => {
        let result = await serverMgr.requestFetchData("deleteQuestion", {ID: ID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getGamesList = async (creatorID, cb) => {
        let result = await serverMgr.requestFetchData("getGamesList", {creatorID: creatorID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.addGame = async (creatorID, nomeGioco, tipoGioco, livelloGioco, domande, numero, cb) => {
        let result = await serverMgr.requestFetchData("addGame", {
            creatorID: creatorID,
            nomeGioco: nomeGioco,
            tipoGioco: tipoGioco,
            livelloGioco: livelloGioco,
            // domande: domande
            numero: numero
        })

        await serverMgr.requestFetchData("addBridgeQuestions", {gameID: result, domande: domande});

        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updateGame = async (nomeGioco, livelloGioco, domande, numero, gameID, cb) => {
        let result = await serverMgr.requestFetchData("updateGame", {
            nomeGioco: nomeGioco,
            livelloGioco: livelloGioco,
            // categoriaGioco: categoriaGioco,
            // domande: domande,
            numero: numero,
            gameID: gameID
        })

        await serverMgr.requestFetchData("updateBridgeQuestions", {gameID: gameID});

        await serverMgr.requestFetchData("addBridgeQuestions", {gameID: gameID, domande: domande});

        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.deleteGame = async (gameID, cb) => {
        let result = await serverMgr.requestFetchData("deleteGame", {gameID: gameID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.listaGiochiPaziente = async (patientID, cb) => {
        let result = await serverMgr.requestFetchData("listaGiochiPaziente", {patientID: patientID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }
    serverMgr.patientsListForSingleGame = async (gameID, cb) => {
        let result = await serverMgr.requestFetchData("patientsListForSingleGame", {gameID: gameID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.saveGameToPatients = async (gameID, patientsList, cb) => {
        let result = await serverMgr.requestFetchData("saveGameToPatients", {gameID: gameID, patientsList: patientsList})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.pswRecovery_checkEmail = async (email, cb) => {
        let result = await serverMgr.requestFetchData("pswRecovery_checkEmail", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.pswRecovery_code = async (email, password, cb) => {
        let result = await serverMgr.requestFetchData("pswRecovery_code", {
            email: email,
            password: password  
        });
    
        if (cb) {
            cb(result);
        } else {
            return result;
        }
    };
    

    serverMgr.pswRecovery_reset = async (psw, codiceUnico, cb) => {
        let result = await serverMgr.requestFetchData("pswRecovery_reset", {psw: psw, codiceUnico: codiceUnico})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.insertFirstCode = async (email, cb) => {
        let result = await serverMgr.requestFetchData("insertFirstCode", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.updateCode = async (email, cb) => {
        let result = await serverMgr.requestFetchData("updateCode", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getQuestionsFromGame = async (email, cb) => {
        let result = await serverMgr.requestFetchData("getQuestionsFromGame", {email: email})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getBridge = async (cb) => {
        let result = await serverMgr.requestFetchData("getBridge")
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.saveGameResults = async (pazienteID, giocoID, rispTotali, rispCorrette, rispSbagliate, dataSvolgimento, cb) => {
        let result = await serverMgr.requestFetchData("saveGameResults", {
            pazienteID: pazienteID,
            giocoID: giocoID,
            rispTotali: rispTotali,
            rispCorrette: rispCorrette,
            rispSbagliate: rispSbagliate,
            dataSvolgimento: dataSvolgimento
        })
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

    serverMgr.getPatientStatistics = async (pazienteID, cb) => {
        let result = await serverMgr.requestFetchData("getPatientStatistics", {pazienteID: pazienteID})
        if(cb) {
            // console.log("getInventory: " + result)
            cb(result)
        }
        else {
            // console.log("getInventory: " + result)
            return result
        }
    }

   
    
    
   
   
    

    if (cb) cb();
}