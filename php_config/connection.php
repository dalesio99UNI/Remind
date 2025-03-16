<?php



	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Credentials: true");
	header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
	header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

	$request_service = "";
    if(isset($_POST)) {
      $data = file_get_contents("php://input");
      $dataJson = json_decode($data, true);
      $request_service = $dataJson["service"];
    }
    
    $conn = getConnection();
    
    $rows = array();
    $query_result;

    switch ($request_service) {
    case "getLogin":
    	$query_result = getLogin($conn);
        break;
    case "getAccount":
    	$query_result = getAccount($conn);
        break;
        case "getAccountByEmail":
            $query_result = getAccountByEmail($conn);
            break;
            case "getBoxByUID":
                $query_result=getBoxByUID($conn);
                break;
     case "deleteBoxByID":
     $query_result=deleteBoxByID($conn);
     break;    
     case "getPatientsListArray":
        $query_result=getPatientsListArray($conn);
        break;       
    case "addAccount":
        $query_result = addAccount($conn);
        break;
        case "getPatientCredentials":
            $query_result=getPatientCredentials($conn);
            break;
            case "getPatientByCodiceFiscale":
                $query_result=getPatientByCodiceFiscale($conn);
                break;
        case "getRicordoById":
            $query_result=getRicordoById($conn);
            break;
            case "updateRicordo":
                $query_result=updateRicordo($conn);
                break;
                case "getPatientMedia":
                    $query_result=getPatientMedia($conn);
                    break;

        case "insertRicordo":
            $query_result=insertRicordo($conn);
            break;
            case "deleteRicordoById":
                $query_result=deleteRicordoById($conn);
                break;
    case "getPatientsList":
        $query_result = getPatientsList($conn);
        break;
        case "updatePatientWithProfileID":
        $query_result=updatePatientWithProfileID($conn);
        break;
        case "keepUserLoggedIn":
        $query_result=keepUserLoggedIn($conn);
        break;
        case "CreateBoxPatient":
        $query_result=CreateBoxPatient($conn);
        break;
        case "updateBox":
        $query_result=updateBox($conn);
        break;
    case "addPaziente":
        $query_result = addPaziente($conn);
        break;
    case "updatePaziente":
        $query_result = updatePaziente($conn);
        break;
     
    case "getRicordiByBoxId":
        $query_result=getRicordiByBoxId($conn);
        break;    
    case "deletePaziente":
        $query_result = deletePaziente($conn);
        break;
    case "getQuestionsList":
        $query_result = getQuestionsList($conn);
        break;
    case "addQuestion":
        $query_result = addQuestion($conn);
        break;
    case "updateQuestion":
        $query_result = updateQuestion($conn);
        break;
    case "deleteQuestion":
        $query_result = deleteQuestion($conn);
        break;
    case "getGamesList":
        $query_result = getGamesList($conn);
        break;
    case "addGame":
        addGame($conn);
        break;
    case "updateGame":
        $query_result = updateGame($conn);
        break;
    case "deleteGame":
        $query_result = deleteGame($conn);
        break;
    case "listaGiochiPaziente":
        $query_result = listaGiochiPaziente($conn);
        break;
    case "patientsListForSingleGame":
        $query_result = patientsListForSingleGame($conn);
        break;
    case "saveGameToPatients":
        $query_result = saveGameToPatients($conn);
        break;
    case "pswRecovery_checkEmail":
        $query_result = pswRecovery_checkEmail($conn);
        break;
        case "getGamesListForPatientAccount":
            $query_result=getGamesListForPatientAccount($conn);
    case "pswRecovery_code":
        $query_result = pswRecovery_code($conn);
        break;
    case "pswRecovery_reset":
        $query_result = pswRecovery_reset($conn);
        break;
        case "getBoxPazienteByID":
            $query_result=getBoxPazienteByID($conn);
            break;
    case "insertFirstCode":
        $query_result = insertFirstCode($conn);
        break;
    case "updateCode":
        $query_result = updateCode($conn);
        break;
    case "getQuestionsFromGame":
        $query_result = getQuestionsFromGame($conn);
        break;
    case "addBridgeQuestions":
        $query_result = addBridgeQuestions($conn);
        break;
    case "updateBridgeQuestions":
        $query_result = updateBridgeQuestions($conn);
        break;
    case "saveGameResults":
        $query_result = saveGameResults($conn);
        break;
    case "getPatientStatistics":
        $query_result = getPatientStatistics($conn);
        break;
 
    
    default:
    	break;
	}
    
    // if($query_result){
    //     echo parseResultToJson($query_result);
    // }
    if(is_string($query_result) || is_numeric($query_result) || is_null($query_result)){
        echo $query_result;
    } else {
        echo parseResultToJson($query_result);
    }
    
    $conn->close();
    function parseResultToJson($result) {
       
        if (!($result instanceof mysqli_result)) {
            return json_encode(["error" => "Invalid result type"]);
        }
    
        $returnRows = []; 
    
        while ($r = mysqli_fetch_assoc($result)) {
            $returnRows[] = $r;
        }
    
        return json_encode($returnRows);
    }
    
    
   
    
    function getConnection() {
		$servername = "localhost";
        $username = "DvdLocalhost";
        $password = "Davide99@";
        $database = "cognicare";
        
        $o_conn = new mysqli($servername, $username, $password, $database);
        if ($o_conn -> connect_errno) {
        	echo "Failed to connect to MySQL: " . $o_conn -> connect_error;
        	exit();
		} 
        return $o_conn;
    }
    
    function getLogin($i_conn) {
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        $password = $dataJson["password"];
    
    	$insertCommentQuery = $i_conn->prepare("SELECT accounts.UID, accounts.titolo, accounts.nome, accounts.cognome FROM `accounts` WHERE email = ? AND password = ?"); 
      	$insertCommentQuery->bind_param("ss", $email, $password);

      	$insertCommentQuery->execute();
        $result = $insertCommentQuery->get_result();
        
        return $result;
    }
    function keepUserLoggedIn($i_conn) {
       
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
       
        $UID = $dataJson["UID"];
        
      
        $selectQuery = $i_conn->prepare("SELECT * FROM `accounts` WHERE UID = ?");
        
       
        $selectQuery->bind_param("i", $UID);
        
       
        $selectQuery->execute();
        
       
        $result = $selectQuery->get_result();
        
       
        if ($result->num_rows > 0) {
           
            $userData = $result->fetch_assoc();
            echo json_encode($userData);  
        } else {
           
            echo json_encode(['error' => 'User not found']);  
        }
    }
    
    
    
    function getAccount($i_conn) {
    	$result = $i_conn->query("SELECT accounts.UID, accounts.nome, accounts.cognome, accounts.email, accounts.password, types.tipoAccount FROM `accounts` JOIN accountsTypes AS types ON accounts.titolo = types.id;");
        return $result;
    }

    function getAccountByEmail($i_conn) {
    	
           
            $data = file_get_contents("php://input");
            $dataJson = json_decode($data, true);
            
          
            $email = $dataJson["email"];
            
            
            $selectQuery = $i_conn->prepare("SELECT * FROM `accounts` WHERE email = ?");
            
            
            $selectQuery->bind_param("s", $email); 
            
            
            $selectQuery->execute();
            
           
            $result = $selectQuery->get_result();
            
           
            if ($result->num_rows > 0) {
               
                $userData = $result->fetch_assoc();
                echo json_encode($userData);  
            } else {
                
                echo json_encode(['error' => 'User not found']);  
            }
        }

        function getPatientByCodiceFiscale($i_conn) {
           
            $data = file_get_contents("php://input");
            $dataJson = json_decode($data, true);
        
           
            $codiceFiscale = $dataJson["codiceFiscale"];
        
         
            $selectQuery = $i_conn->prepare("SELECT * FROM `accounts` a 
                                             JOIN `patients` p ON a.UID = p.ID 
                                             WHERE p.codiceFiscale = ?");
        
            
            $selectQuery->bind_param("s", $codiceFiscale); 
        
            
            $selectQuery->execute();
        
            
            $result = $selectQuery->get_result();
        
            
            if ($result->num_rows > 0) {
                
                $userData = $result->fetch_assoc();
                echo json_encode($userData);  
            } else {
              
                echo json_encode(['error' => 'Account not found']);  
            }
        }
        

        function getPatientCredentials($i_conn) {
           
            $data = file_get_contents("php://input");
            $dataJson = json_decode($data, true);
            
           
            $accountID = $dataJson["patientID"];
            
            
            $selectQuery = $i_conn->prepare("
                SELECT a.*, p.*
                FROM `accounts` a
                LEFT JOIN `patients` p ON a.UID = p.ID
                WHERE a.UID = ?
            ");
            
           
            $selectQuery->bind_param("i", $accountID);
            
           
            $selectQuery->execute();
            
           
            $result = $selectQuery->get_result();
            
           
            if ($result->num_rows > 0) {
               
                $userData = $result->fetch_assoc();
                echo json_encode($userData);  
            } else {
               
                echo json_encode(['error' => 'User not found']);  
            }
        }
        
        
    



        function addAccount($i_conn) {
            $data = file_get_contents("php://input");
            $dataJson = json_decode($data, true);
            
            $email = $dataJson["email"];
            $password = $dataJson["password"];
            $nome = $dataJson["nome"];
            $cognome = $dataJson["cognome"];
            $titolo = $dataJson["titolo"];
            $patientID = $dataJson["patientID"];  
        
            error_log("Titolo passato: " . $titolo);
        
          
            if ($titolo == 2) {
                $checkPatient = $i_conn->prepare("SELECT ID FROM `patients` WHERE ID = ?");
                $checkPatient->bind_param("i", $patientID);
                $checkPatient->execute();
                $result = $checkPatient->get_result();
                
                if ($result->num_rows === 0) {
                    echo json_encode(['error' => 'Paziente non trovato']);
                    return false;
                }
        
              
                $insertNewAccount = $i_conn->prepare("INSERT INTO `accounts` (`UID`, `nome`, `cognome`, `titolo`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?)");
                $insertNewAccount->bind_param("isssss", $patientID, $nome, $cognome, $titolo, $email, $password);
            } else {
               
                $insertNewAccount = $i_conn->prepare("INSERT INTO `accounts` (`nome`, `cognome`, `titolo`, `email`, `password`) VALUES (?, ?, ?, ?, ?)");
                $insertNewAccount->bind_param("sssss", $nome, $cognome, $titolo, $email, $password);
            }
        
            if ($insertNewAccount->execute()) {
                return ($titolo == 2) ? $patientID : $i_conn->insert_id;
            } else {
                return false;
            }
        }
        

    

   function CreateBoxPatient($i_conn) {
   
    $data = file_get_contents("php://input");
    $dataJson = json_decode($data, true);
    
    
    $id_paziente = $dataJson["id_paziente"];
    $nome = $dataJson["nome"];
    $cognome = $dataJson["cognome"];
    $citta = $dataJson["citta"];
    $eta = $dataJson["eta"]; 
    
  
  

    

   
    $insertNewBox = $i_conn->prepare("INSERT INTO `BoxDeiRicordi` (`id_paziente`, `nome`, `cognome`, `citta`, `eta`) VALUES (?, ?, ?, ?, ?)");
    
   
    $insertNewBox->bind_param("isssi", $id_paziente, $nome, $cognome, $citta, $eta); 
    
    
    if ($insertNewBox->execute()) {
       
        return $i_conn->insert_id;
    } else {
       
        return false;
    }
}
    
    function getBoxByUID($i_conn) {
       
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        
        if (!isset($dataJson['uid'])) {
            echo json_encode(['error' => 'UID non fornito']);
            return;
        }
    
        $doct_UID = $dataJson['uid'];  
        
        $isDoctor = isset($dataJson['isDoctor']) ? (bool)$dataJson['isDoctor'] : false;
    

        
        if ($isDoctor) {
            $query = "SELECT 
                        b.id_box,  
                        b.nome AS nome_box,
                        b.cognome AS cognome_box,
                        b.citta AS citta,
                        b.eta AS eta_box
                      FROM 
                        boxdeiricordi b
                      JOIN 
                        patients p ON b.id_paziente = p.ID
                      WHERE 
                        p.doct_UID = ?;";
        } else {
            $query = "SELECT 
                        b.id_box,  
                        b.nome AS nome_box,
                        b.cognome AS cognome_box,
                        b.citta AS citta,
                        b.eta AS eta_box
                      FROM 
                        boxdeiricordi b
                      WHERE 
                        b.id_paziente = ?;";
        }
      
        $stmt = $i_conn->prepare($query);
        
        if (!$stmt) {
            echo json_encode(['error' => 'Errore nella preparazione della query: ' . $i_conn->error]);
            return;
        }
        
       
        $stmt->bind_param("s", $doct_UID);
        
       
        $stmt->execute();
        
       
        $result = $stmt->get_result();
        
       
        if ($result->num_rows > 0) {
            $boxes = [];
            while ($row = $result->fetch_assoc()) {
                $boxes[] = $row;
            }
            echo json_encode($boxes);
        } else {
            echo json_encode(['error' => 'Nessun box trovato per il medico con UID: ' . $doct_UID]);
        }
        
        
        $stmt->close();
    }
    
    function getPatientMedia($i_conn) {
        
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
       
       
        
        
        $id_paziente = $dataJson['patient_ID'];  

        error_log("ID paziente ricevuto: " . $id_paziente);
        
        $query = "
            SELECT 
    m.id_multimedia, 
    m.tipo AS tipo_multimedia,
    m.url AS url_multimedia,
    r.titolo AS titolo_ricordo
FROM 
    boxdeiricordi AS b
JOIN 
    ricordi AS r ON b.id_box = r.id_box
JOIN 
    multimedia AS m ON r.id_ricordo = m.id_ricordo
WHERE 
    b.id_paziente = ?;

        ";
        
       
        $stmt = $i_conn->prepare($query);
        
        if (!$stmt) {
            echo json_encode(['error' => 'Errore nella preparazione della query: ' . $i_conn->error]);
            return;
        }
        
       
        $stmt->bind_param("i", $id_paziente);
        
        
        $stmt->execute();
        
       
        $result = $stmt->get_result();
      
        
        if ($result->num_rows > 0) {
            $multimediaList = [];
            while ($row = $result->fetch_assoc()) {
                $multimediaList[] = $row;
            }
          
            echo json_encode($multimediaList);  
        } else {
            echo json_encode(['error' => 'Nessun multimedia trovato per id_paziente: ' . $id_paziente]);
        }
        
        
        $stmt->close();
    }
    


    function getBoxPazienteByID($i_conn) {
        
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        
        if (!isset($dataJson['id'])) {
            echo json_encode(['error' => 'ID non fornito']);
            return;
        }
        
        
        $id_box = $dataJson['id'];  
        
       
        $query = "SELECT 
            b.id_box,  
            b.nome AS nome_box,
            b.cognome AS cognome_box,
            b.citta,
            b.eta AS eta_box
        FROM 
            boxdeiricordi b
        WHERE 
            b.id_box = ?;  
        ";
        
       
        $stmt = $i_conn->prepare($query);
        
        if (!$stmt) {
            echo json_encode(['error' => 'Errore nella preparazione della query: ' . $i_conn->error]);
            return;
        }
        
       
        $stmt->bind_param("i", $id_box);
        
       
        $stmt->execute();
        
       
        $result = $stmt->get_result();
        
       
        if ($result->num_rows > 0) {
            $boxes = [];
            while ($row = $result->fetch_assoc()) {
                $boxes[] = $row;
            }
            echo json_encode($boxes);  
        } else {
            echo json_encode(['error' => 'Nessun box trovato per id_box: ' . $id_box]);
        }
        
       
        $stmt->close();
    }

    function getRicordoById($i_conn) {
       
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
       
        if (!isset($dataJson['id_ricordo'])) {
            echo json_encode(['error' => 'ID non fornito']);
            return;
        }
        
       
        $id_ricordo = $dataJson['id_ricordo'];
        
       
        $query = "SELECT 
                    r.id_ricordo, 
                    r.titolo, 
                    r.descrizione, 
                    r.latitudine, 
                    r.longitudine, 
                    r.tipo, 
                    m.tipo AS multimedia_tipo, 
                    m.url AS multimedia_url
                  FROM 
                    ricordi r
                  LEFT JOIN 
                    multimedia m ON r.id_ricordo = m.id_ricordo
                  WHERE 
                    r.id_ricordo = ?;";  
        
       
        $stmt = $i_conn->prepare($query);
        
        if (!$stmt) {
            echo json_encode(['error' => 'Errore nella preparazione della query: ' . $i_conn->error]);
            return;
        }
        
       
        $stmt->bind_param("i", $id_ricordo);
        
       
        $stmt->execute();
        
       
        $result = $stmt->get_result();
        
       
        if ($result->num_rows > 0) {
            $ricordo = null;
    
           
            while ($row = $result->fetch_assoc()) {
               
                if (!$ricordo) {
                    $ricordo = [
                        'id_ricordo' => $row['id_ricordo'],
                        'titolo' => $row['titolo'],
                        'descrizione' => $row['descrizione'],
                        'latitudine' => $row['latitudine'],
                        'longitudine' => $row['longitudine'],
                        'tipo' => $row['tipo'],
                        'multimedia' => [] 
                    ];
                }
                
                
                if ($row['multimedia_url']) {
                    $ricordo['multimedia'][] = [
                        'url' => $row['multimedia_url'],
                        'tipo' => $row['multimedia_tipo']
                    ];
                }
            }
            
           
            echo json_encode($ricordo);
        } else {
            echo json_encode(['error' => 'Ricordo non trovato']);  
        }
        
       
        $stmt->close();
    }

    function deleteRicordoById($i_conn) {
       
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
      
        if (!isset($dataJson['id_ricordo'])) {
            echo json_encode(['error' => 'ID non fornito']);
            return;
        }
        
       
        $id_ricordo = $dataJson['id_ricordo'];
    
        
        $i_conn->begin_transaction();
        
        try {
            
            $deleteMultimediaQuery = "DELETE FROM multimedia WHERE id_ricordo = ?";
            $stmtMultimedia = $i_conn->prepare($deleteMultimediaQuery);
            
            if (!$stmtMultimedia) {
                throw new Exception('Errore nella preparazione della query per i multimedia: ' . $i_conn->error);
            }
            
            
            $stmtMultimedia->bind_param("i", $id_ricordo);
            $stmtMultimedia->execute();
            
            
            $deleteRicordoQuery = "DELETE FROM ricordi WHERE id_ricordo = ?";
            $stmtRicordo = $i_conn->prepare($deleteRicordoQuery);
            
            if (!$stmtRicordo) {
                throw new Exception('Errore nella preparazione della query per il ricordo: ' . $i_conn->error);
            }
            
           
            $stmtRicordo->bind_param("i", $id_ricordo);
            $stmtRicordo->execute();
            
          
            $i_conn->commit();
    
           
            echo json_encode(['success' => 'Ricordo eliminato con successo']);
            
           
            $stmtMultimedia->close();
            $stmtRicordo->close();
            
        } catch (Exception $e) {
           
            $i_conn->rollback();
            echo json_encode(['error' => 'Errore nell\'eliminazione del ricordo: ' . $e->getMessage()]);
        }
    }
    
    
    
    function getRicordiByBoxId($i_conn) {
       
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
      
        if (!isset($dataJson['id_box'])) {
            echo json_encode(['error' => 'ID non fornito']);
            return;
        }
        
       
        $id_box = $dataJson['id_box'];
        
       
        $query = "SELECT 
                    r.id_ricordo, 
                    r.titolo, 
                    r.descrizione, 
                    r.latitudine, 
                    r.longitudine, 
                    r.tipo, 
                    m.tipo AS multimedia_tipo, 
                    m.url AS multimedia_url
                  FROM 
                    ricordi r
                  LEFT JOIN 
                    multimedia m ON r.id_ricordo = m.id_ricordo
                  WHERE 
                    r.id_box = ?;";  
        
       
        $stmt = $i_conn->prepare($query);
        
        if (!$stmt) {
            echo json_encode(['error' => 'Errore nella preparazione della query: ' . $i_conn->error]);
            return;
        }
        
       
        $stmt->bind_param("i", $id_box);
        
       
        $stmt->execute();
        
       
        $result = $stmt->get_result();
        
        
        if ($result->num_rows > 0) {
            $ricordi = [];
            
           
            while ($row = $result->fetch_assoc()) {
                
                if (!isset($ricordi[$row['id_ricordo']])) {
                    $ricordi[$row['id_ricordo']] = [
                        'id_ricordo' => $row['id_ricordo'],
                        'titolo' => $row['titolo'],
                        'descrizione' => $row['descrizione'],
                        'latitudine' => $row['latitudine'],
                        'longitudine' => $row['longitudine'],
                        'tipo' => $row['tipo'],
                        'multimedia' => [] 
                    ];
                }
                
              
                if ($row['multimedia_url']) {
                    $ricordi[$row['id_ricordo']]['multimedia'][] = [
                        'url' => $row['multimedia_url'],
                        'tipo' => $row['multimedia_tipo']
                    ];
                }
            }
            
          
            echo json_encode(array_values($ricordi));
        } else {
            echo json_encode([]);  
        }
        
       
        $stmt->close();
    }
    
    
    


    function insertRicordo($i_conn) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            
            $inputData = json_decode(file_get_contents('php://input'), true);
     
          
            if ($inputData === null) {
                echo json_encode(['error' => 'Errore nella decodifica dei dati JSON']);
                return;
            }
    
           

            $titolo = $inputData['titolo'] ?? null;
            $tipo = $inputData['tipo'] ?? null;
            $descrizione = $inputData['descrizione'] ?? null;
            $latitudine = $inputData['latitudine'] ?? null;
            $longitudine = $inputData['longitudine'] ?? null;
            $multimedia = $inputData['multimedia'] ?? [];
            $id_box=$inputData['id_box'] ?? null;
    
            
            if (!$titolo || !$tipo) {
                echo json_encode(['error' => 'Titolo o tipo mancante']);
                return;
            }
    
          
            error_log("Tipo di ricordo: " . $tipo);
            error_log("Titolo: " . $titolo);
            error_log("Descrizione: " . $descrizione);
            error_log("Latitudine: " . $latitudine);
            error_log("Longitudine: " . $longitudine);
            error_log("Multimedia: " . print_r($multimedia, true));
            error_log("id_box: " . $id_box);
    
          
            $i_conn->begin_transaction();
    
            try {
               
                $queryRicordo = "INSERT INTO ricordi (titolo, tipo, descrizione, latitudine, longitudine,id_box) 
                                 VALUES (?, ?, ?, ?, ?,?)";
    
                $stmtRicordo = $i_conn->prepare($queryRicordo);
                if (!$stmtRicordo) {
                    throw new Exception("Errore nella preparazione della query per i ricordi: " . $i_conn->error);
                }
    
                $stmtRicordo->bind_param("sssssi", $titolo, $tipo, $descrizione, $latitudine, $longitudine,$id_box);
                if (!$stmtRicordo->execute()) {
                    throw new Exception("Errore durante l'inserimento del ricordo: " . $stmtRicordo->error);
                }
    
              
                $idRicordo = $stmtRicordo->insert_id;
                $stmtRicordo->close();
    
               
                if (!empty($multimedia)) {
                    $queryMultimedia = "INSERT INTO multimedia (id_ricordo, tipo, url) VALUES (?, ?, ?)";
                    $stmtMultimedia = $i_conn->prepare($queryMultimedia);
    
                    if (!$stmtMultimedia) {
                        throw new Exception("Errore nella preparazione della query per i multimedia: " . $i_conn->error);
                    }
    
                   
                    foreach ($multimedia as $file) {
                        $fileUrl = 'immagini/' . basename($file);  
                        $fileTipo = $tipo; 
    
                       
                        $stmtMultimedia->bind_param("iss", $idRicordo, $fileTipo, $fileUrl);
                        if (!$stmtMultimedia->execute()) {
                            throw new Exception("Errore durante l'inserimento del multimedia: " . $stmtMultimedia->error);
                        }
                    }
    
                    $stmtMultimedia->close();
                }
    
                $i_conn->commit();
                echo json_encode(['success' => 'Ricordo inserito correttamente']);
            } catch (Exception $e) {
                $i_conn->rollback();
                echo json_encode(['error' => 'Errore durante l\'inserimento: ' . $e->getMessage()]);
            }
        }
    }



    function updateRicordo($i_conn) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $inputData = json_decode(file_get_contents('php://input'), true);
    
            if ($inputData === null) {
                echo json_encode(['error' => 'Errore nella decodifica dei dati JSON']);
                return;
            }
    
            $idRicordo = $inputData['id_ricordo'] ?? null;
            $titolo = $inputData['titolo'] ?? null;
            $tipo = $inputData['tipo'] ?? null;
            $descrizione = $inputData['descrizione'] ?? null;
            $latitudine = $inputData['latitudine'] ?? null;
            $longitudine = $inputData['longitudine'] ?? null;
            $multimedia = $inputData['multimedia'] ?? [];
    
            if (!$idRicordo || !$titolo || !$tipo) {
                echo json_encode(['error' => 'Dati mancanti: id_ricordo, titolo o tipo']);
                return;
            }
    
            error_log("Multimedia ricevuto: " . print_r($multimedia, true));
    
            $i_conn->begin_transaction();
            try {
               
                $queryRicordo = "UPDATE ricordi SET titolo = ?, tipo = ?, descrizione = ?, latitudine = ?, longitudine = ? WHERE id_ricordo = ?";
                $stmtRicordo = $i_conn->prepare($queryRicordo);
                if (!$stmtRicordo) {
                    throw new Exception("Errore nella query per l'aggiornamento del ricordo: " . $i_conn->error);
                }
                $stmtRicordo->bind_param("sssssi", $titolo, $tipo, $descrizione, $latitudine, $longitudine, $idRicordo);
                $stmtRicordo->execute();
    
              
                if (!empty($multimedia)) {
                   
                    $queryDeleteMultimedia = "DELETE FROM multimedia WHERE id_ricordo = ?";
                    $stmtDeleteMultimedia = $i_conn->prepare($queryDeleteMultimedia);
                    if (!$stmtDeleteMultimedia) {
                        throw new Exception("Errore nella query DELETE multimedia: " . $i_conn->error);
                    }
                    $stmtDeleteMultimedia->bind_param("i", $idRicordo);
                    $stmtDeleteMultimedia->execute();
    
                    
                    $queryMultimedia = "INSERT INTO multimedia (id_ricordo, tipo, url) VALUES (?, ?, ?)";
                    $stmtMultimedia = $i_conn->prepare($queryMultimedia);
                    if (!$stmtMultimedia) {
                        throw new Exception("Errore nella query INSERT multimedia: " . $i_conn->error);
                    }
    
                    foreach ($multimedia as $file) {
                        if (!isset($file['url'])) {
                            throw new Exception("Errore: file senza URL ricevuto.");
                        }
                        $fileUrl = $file['url']; 
                        $stmtMultimedia->bind_param("iss", $idRicordo, $tipo, $fileUrl);
                        $stmtMultimedia->execute();
                    }
    
                    $stmtMultimedia->close();
                }
    
                $i_conn->commit();
                echo json_encode(['success' => 'Ricordo aggiornato correttamente']);
            } catch (Exception $e) {
                $i_conn->rollback();
                echo json_encode(['error' => 'Errore durante l\'aggiornamento: ' . $e->getMessage()]);
            }
        }
    }
    
    
    
    
    
    
    
    


    function updateBox($i_conn) {
  
    $data = file_get_contents("php://input");
    $dataJson = json_decode($data, true);

    

   

    $boxID = $dataJson['id']; 
    $boxData = $dataJson['data']; 

   
    $nome = $boxData['nome_box'] ?? null;
    $cognome = $boxData['cognome_box'] ?? null;
    $citta = $boxData['citta'] ?? null;
    $eta = $boxData['eta_box'] ?? null;

    error_log("Dati ricevuti: " . print_r($dataJson, true));

   
    $query = "UPDATE boxdeiricordi 
              SET nome = ?, cognome = ?, citta = ?, eta = ? 
              WHERE id_box = ?";

    
    $stmt = $i_conn->prepare($query);

    if (!$stmt) {
        echo json_encode(['error' => 'Errore nella preparazione della query: ' . $i_conn->error]);
        return;
    }

    
    $stmt->bind_param("sssii", $nome, $cognome, $citta, $eta, $boxID);

   
    if ($stmt->execute()) {
        echo json_encode(['success' => 'Box aggiornato correttamente']);
    } else {
        echo json_encode(['error' => 'Errore durante l\'aggiornamento: ' . $stmt->error]);
    }

   
    $stmt->close();
}

function deleteBoxByID($i_conn) {
   
    $data = file_get_contents("php://input");
    $dataJson = json_decode($data, true);
    
   
    $boxID = $dataJson['id']; 

    error_log("Dati ricevuti per l'eliminazione: " . print_r($dataJson, true));

   
    $query1 = "DELETE FROM multimedia WHERE id_ricordo IN (SELECT id_ricordo FROM ricordi WHERE id_box = ?)";
    $stmt1 = $i_conn->prepare($query1);
    if (!$stmt1) {
        echo json_encode(['error' => 'Errore nella preparazione della query1: ' . $i_conn->error]);
        return;
    }
    $stmt1->bind_param("i", $boxID);
    $stmt1->execute();
    $stmt1->close();

   
    $query2 = "DELETE FROM ricordi WHERE id_box = ?";
    $stmt2 = $i_conn->prepare($query2);
    if (!$stmt2) {
        echo json_encode(['error' => 'Errore nella preparazione della query2: ' . $i_conn->error]);
        return;
    }
    $stmt2->bind_param("i", $boxID);
    $stmt2->execute();
    $stmt2->close();

    
    $query3 = "DELETE FROM boxdeiricordi WHERE id_box = ?";
    $stmt3 = $i_conn->prepare($query3);
    if (!$stmt3) {
        echo json_encode(['error' => 'Errore nella preparazione della query3: ' . $i_conn->error]);
        return;
    }
    $stmt3->bind_param("i", $boxID);
    if ($stmt3->execute()) {
        echo json_encode(['success' => 'Box eliminato correttamente']);
    } else {
        echo json_encode(['error' => 'Errore durante l\'eliminazione: ' . $stmt3->error]);
    }
    $stmt3->close();
}




function updatePatientWithProfileID($i_conn) {
    
    $data = file_get_contents("php://input");
    $dataJson = json_decode($data, true);
    
   
    $accountID = $dataJson["accountID"];
    $patientID = $dataJson["patientID"];
    $email = $dataJson["email"];  

   
    $updateQuery = $i_conn->prepare("UPDATE patients SET ID = ?, contattoEmail = ? WHERE ID = ?");
    $updateQuery->bind_param("isi", $accountID, $email, $patientID); 
    
   
    if ($updateQuery->execute()) {
        echo json_encode(["success" => true, "message" => "Paziente aggiornato con successo"]);
    } else {
        echo json_encode(["success" => false, "error" => "Errore durante l'aggiornamento del paziente"]);
    }
}

    
    
    

    function getPatientsList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doct_UID = $dataJson["doct_UID"];
        
        $retrievePatientsList = $i_conn->prepare("SELECT * FROM `patients` WHERE doct_UID = ?");
        $retrievePatientsList->bind_param("i", $doct_UID);
        
        $retrievePatientsList->execute();
        $result = $retrievePatientsList->get_result();
        return $result;
    }



    function getPatientsListArray($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
    
        if (!isset($dataJson["doct_UID"])) {
            echo json_encode(["error" => "doct_UID non fornito"]);
            return;
        }
    
        $doct_UID = $dataJson["doct_UID"];
        
        $retrievePatientsList = $i_conn->prepare("SELECT ID, nome, cognome FROM `patients` WHERE doct_UID = ?");
        $retrievePatientsList->bind_param("i", $doct_UID);
        
        $retrievePatientsList->execute();
        $result = $retrievePatientsList->get_result();
        
        $patients = [];
        while ($row = $result->fetch_assoc()) {
            $patients[] = $row;
        }
    
        echo json_encode($patients);
    }
    
    
    
    function addPaziente($i_conn){
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doct_UID = $dataJson["doct_UID"];
        $nome = $dataJson["nome"];
        $cognome = $dataJson["cognome"];
        $city = $dataJson["city"];
        $codiceFiscale = $dataJson["codiceFiscale"];
        $dataNascita = $dataJson["dataNascita"];
        $informazioniMediche = $dataJson["informazioniMediche"];
        
        
        $insertNewPatient = $i_conn->prepare(
            "INSERT INTO `patients` (`doct_UID`, `nome`, `cognome`, `city`, `codiceFiscale`, `dataNascita`) 
            VALUES (?, ?, ?, ?, ?, ?)"
        );
        $insertNewPatient->bind_param("isssss", $doct_UID, $nome, $cognome, $city, $codiceFiscale, $dataNascita);
        
       
        if ($insertNewPatient->execute()) {
            $patientID = $i_conn->insert_id;  
        } else {
            echo json_encode(["error" => "Errore nell'inserimento del paziente"]);
            return;
        }
    
       
        echo json_encode(["pazienteID" => $patientID]);
    }
    

    function updatePaziente($i_conn) {
        
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
       
        $nome = $dataJson["nome"];
        $cognome = $dataJson["cognome"];
        $city = $dataJson["city"];
        $codiceFiscale = $dataJson["codiceFiscale"];
        $dataNascita = $dataJson["dataNascita"];
        $informazioniMediche = $dataJson["informazioniMediche"];
        $listaGiochi = $dataJson["listaGiochi"];
        error_log("Lista Giochi ricevuta: " . print_r($dataJson["listaGiochi"], true));

        $ID = $dataJson["ID"];
        $contattoCellulare = $dataJson["contattoCellulare"];  
        $contattoEmail = $dataJson["contattoEmail"];  
        
       
        $updatePatient = $i_conn->prepare(
            "UPDATE `patients` SET 
                `nome` = ?, 
                `cognome` = ?, 
                `city` = ?, 
                `codiceFiscale` = ?, 
                `dataNascita` = ?, 
                `contattoCellulare` = ?, 
                `contattoEmail` = ? 
            WHERE `patients`.`ID` = ?"
        );
        $updatePatient->bind_param("sssssssi", $nome, $cognome, $city, $codiceFiscale, $dataNascita, $contattoCellulare, $contattoEmail, $ID);  // Aggiunto contattoEmail
        $updatePatient->execute();
    
        
        $updateAccount = $i_conn->prepare(
            "UPDATE `accounts` SET 
                `email` = ? 
            WHERE `accounts`.`UID` = ?"
        );
        $updateAccount->bind_param("si", $contattoEmail, $ID); 
        $updateAccount->execute();
        $updateAccount->close();

       
        $deleteOldGames = $i_conn->prepare(
            "DELETE FROM `bridgeGamesPatients` WHERE `patient_ID` = ?"
        );
        $deleteOldGames->bind_param("i", $ID);
        $deleteOldGames->execute();
        $deleteOldGames->close();
    
        
        if (!empty($listaGiochi)) {
            foreach ($listaGiochi as $gioco) {
                if (!isset($gioco['gameID']) || !is_numeric($gioco['gameID'])) {
                    error_log("Errore: gameID non valido -> " . print_r($gioco, true));
                    continue;
                }
    
                $insertNewGame = $i_conn->prepare(
                    "INSERT INTO `bridgeGamesPatients` (`game_ID`, `patient_ID`) VALUES (?, ?)"
                );
                $insertNewGame->bind_param("ii", $gioco['gameID'], $ID);
                $insertNewGame->execute();
                $insertNewGame->close();
            }
        } else {
            error_log("Lista giochi vuota o non valida.");
        }
        
        return true;  
    }
    
    

    function deletePaziente($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $ID = $dataJson["ID"];
        
       
        $deleteResults = $i_conn->prepare("DELETE FROM `resultsgames` WHERE `pazienteID` = ?");
        $deleteResults->bind_param("i", $ID);
        $deleteResults->execute();
        
        
        $deleteBridge = $i_conn->prepare("DELETE FROM `bridgegamespatients` WHERE `game_ID` IN (SELECT gameID FROM `games` WHERE `patient_ID` = ?)");
        $deleteBridge->bind_param("i", $ID);
        $deleteBridge->execute();
        
       
        $deleteAccount = $i_conn->prepare("DELETE a FROM accounts a
                                             JOIN patients p ON p.ID = a.UID
       WHERE p.ID = ?;
    ");
        $deleteAccount->bind_param("i", $ID);
        $deleteAccount->execute();
        
        
        $deletePatient = $i_conn->prepare("DELETE FROM `patients` WHERE `patients`.`ID` = ?");
        $deletePatient->bind_param("i", $ID);
        
        if ($deletePatient->execute()) {
            return ["success" => true, "message" => "Paziente e account eliminati con successo."];
        } else {
            return ["success" => false, "message" => "Errore nell'eliminazione del paziente e dell'account.", "error" => $deletePatient->error];
        }
    }
    
    
    

    function getQuestionsList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $doctor_UID = $dataJson["doctor_UID"];
        
        $retrieveQuestionsList = $i_conn->prepare("SELECT * FROM `gamesQuestions` WHERE doctor_UID = ?");
        $retrieveQuestionsList->bind_param("i", $doctor_UID);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }

    function addQuestion($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
    
       
        $doctor_UID = isset($dataJson["doctor_UID"]) ? $dataJson["doctor_UID"] : null;
        $tipoGioco = isset($dataJson["tipoGioco"]) ? $dataJson["tipoGioco"] : null;
        $categoria = isset($dataJson["categoria"]) ? $dataJson["categoria"] : null;
        $domanda = isset($dataJson["domanda"]) ? $dataJson["domanda"] : null;
        $rispCorrettaN1 = isset($dataJson["rispCorrettaN1"]) ? $dataJson["rispCorrettaN1"] : null;
        $rispCorrettaN2 = isset($dataJson["rispCorrettaN2"]) ? $dataJson["rispCorrettaN2"] : null;
        $rispCorrettaN3 = isset($dataJson["rispCorrettaN3"]) ? $dataJson["rispCorrettaN3"] : null;
        $rispCorrettaN4 = isset($dataJson["rispCorrettaN4"]) ? $dataJson["rispCorrettaN4"] : null;
        $rispSbagliataN1 = isset($dataJson["rispSbagliataN1"]) ? $dataJson["rispSbagliataN1"] : null;
        $rispSbagliataN2 = isset($dataJson["rispSbagliataN2"]) ? $dataJson["rispSbagliataN2"] : null;
        $rispSbagliataN3 = isset($dataJson["rispSbagliataN3"]) ? $dataJson["rispSbagliataN3"] : null;
        $rispSbagliataN4 = isset($dataJson["rispSbagliataN4"]) ? $dataJson["rispSbagliataN4"] : null;
        $immagine = isset($dataJson["immagine"]) ? $dataJson["immagine"] : null;
        $suggerimento=isset($dataJson["suggerimento"]) ? $dataJson["suggerimento"] : null;
    
      
        $insertNewQuestion = $i_conn->prepare(
            "INSERT INTO `gamesQuestions` 
            (`doctor_UID`, `tipoGioco`, `categoria`, `domanda`, `rispCorrettaN1`, `rispCorrettaN2`, `rispCorrettaN3`, `rispCorrettaN4`,
             `rispSbagliataN1`, `rispSbagliataN2`, `rispSbagliataN3`, `rispSbagliataN4`, `immagine`,`suggerimento`) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)"
        );
    
        if (!$insertNewQuestion) {
            error_log("Errore prepare(): " . $i_conn->error);
            return json_encode(["success" => false, "error" => $i_conn->error]);
        }
    
       
        $insertNewQuestion->bind_param(
            "isssssssssssss", 
            $doctor_UID, $tipoGioco, $categoria, $domanda, 
            $rispCorrettaN1, $rispCorrettaN2, $rispCorrettaN3, $rispCorrettaN4,
            $rispSbagliataN1, $rispSbagliataN2, $rispSbagliataN3, $rispSbagliataN4, 
            $immagine,$suggerimento
        );
    
      
        if (!$insertNewQuestion->execute()) {
            error_log("Errore execute(): " . $insertNewQuestion->error);
            return json_encode(["success" => false, "error" => $insertNewQuestion->error]);
        }
    
       
        return json_encode([
            "success" => true, 
            "message" => "Domanda inserita con successo", 
            "question_id" => $insertNewQuestion->insert_id
        ]);
    }
    
    function updateQuestion($i_conn) {
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
    
        $domanda = $dataJson["domanda"];
        $rispCorrettaN1 = $dataJson["rispCorrettaN1"];
        $rispCorrettaN2 = $dataJson["rispCorrettaN2"];
        $rispCorrettaN3 = $dataJson["rispCorrettaN3"];
        $rispCorrettaN4 = $dataJson["rispCorrettaN4"];
        $rispSbagliataN1 = $dataJson["rispSbagliataN1"];
        $rispSbagliataN2 = $dataJson["rispSbagliataN2"];
        $rispSbagliataN3 = $dataJson["rispSbagliataN3"];
        $rispSbagliataN4 = $dataJson["rispSbagliataN4"];
        $immagine = $dataJson["immagine"];
        $suggerimento=$dataJson["suggerimento"];
        $ID = $dataJson["ID"];
    
       
        $updateQuestion = $i_conn->prepare(
            "UPDATE `gamesQuestions` SET `domanda` = ?, `rispCorrettaN1` = ?, `rispCorrettaN2` = ?, `rispCorrettaN3` = ?, `rispCorrettaN4` = ?,
             `rispSbagliataN1` = ?, `rispSbagliataN2` = ?, `rispSbagliataN3` = ?, `rispSbagliataN4` = ?, `immagine` = ?,`suggerimento`= ?
            WHERE `gamesQuestions`.`ID` = ?"
        );
    
       
        $updateQuestion->bind_param("sssssssssssi", $domanda, $rispCorrettaN1, $rispCorrettaN2, $rispCorrettaN3, $rispCorrettaN4,
                                            $rispSbagliataN1, $rispSbagliataN2, $rispSbagliataN3, $rispSbagliataN4, $immagine,$suggerimento, $ID);
    
      
        $updateQuestion->execute();
    
       
        if ($updateQuestion->affected_rows > 0) {
            return ["success" => true, "message" => "Domanda aggiornata con successo."];
        } else {
            return ["success" => false, "message" => "Errore nell'aggiornamento della domanda o nessuna modifica effettuata."];
        }
    }
    

    function deleteQuestion($i_conn){
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $ID = $dataJson["ID"];
        
        
        $deleteQuestion = $i_conn->prepare("DELETE FROM `gamesQuestions` WHERE `gamesQuestions`.`ID` = ?");
        $deleteQuestion->bind_param("i", $ID);
        
        
        $deleteQuestion->execute();
        
        
        if ($deleteQuestion->affected_rows > 0) {
            return ["success" => true, "message" => "Domanda eliminata con successo."];
        } else {
            return ["success" => false, "message" => "Errore nell'eliminazione della domanda o domanda non trovata."];
        }
    }
    

    function getGamesList($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $creatorID = $dataJson["creatorID"];
        
        $retrieveGamesList = $i_conn->prepare("SELECT * FROM `games` LEFT JOIN `bridgeToQuestionsGames` ON `games`.`gameID` = `bridgeToQuestionsGames`.`IDgame` WHERE creatorID = ?");
        $retrieveGamesList->bind_param("i", $creatorID);
        
        $retrieveGamesList->execute();
        $result = $retrieveGamesList->get_result();
        return $result;
    }

    function addGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $creatorID = $dataJson["creatorID"];
        $nomeGioco = $dataJson["nomeGioco"];
        $tipoGioco = $dataJson["tipoGioco"];
        $livelloGioco = $dataJson["livelloGioco"];
        $categoriaGioco = $dataJson["categoriaGioco"];
        // $domande = $dataJson["domande"];
        $numeroRound = $dataJson["numeroRound"];
        
        $insertNewGame = $i_conn->prepare("INSERT INTO `games` (`creatorID`, `nomeGioco`, `tipoGioco`, `livelloGioco`, `categoriaGioco`, `numero`) VALUES (?, ?, ?, ?, ?, ?)");
        $insertNewGame->bind_param("issssi", $creatorID, $nomeGioco, $tipoGioco, $livelloGioco, $categoriaGioco, $numeroRound);
        $insertNewGame->execute();
        
        $result = $insertNewGame->insert_id;
        echo $result;

        return $result;
    }

    function updateGame($i_conn){
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $nomeGioco = $dataJson["nomeGioco"];
        $livelloGioco = $dataJson["livelloGioco"];
        $categoriaGioco = $dataJson["categoriaGioco"];
        $numeroRound = $dataJson["numero"]; 
        $gameID = $dataJson["gameID"];
    
        
        if (empty($gameID)) {
            return json_encode(["error" => "gameID mancante"]);
        }
    
      
        $updateGame = $i_conn->prepare("UPDATE `games` SET `nomeGioco` = ?, `livelloGioco` = ?, `categoriaGioco` = ?, `numero` = ? WHERE `gameID` = ?");
        $updateGame->bind_param("sssii", $nomeGioco, $livelloGioco, $categoriaGioco, $numeroRound, $gameID);
        
        $updateGame->execute();
    
        
        if ($updateGame->affected_rows > 0) {
            return json_encode(["success" => "Gioco aggiornato correttamente"]);
        } else {
            return json_encode(["warning" => "Nessuna modifica effettuata"]);
        }
    }
    

    function deleteGame($i_conn){
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        
      
        $deleteQuestionsGame = $i_conn->prepare("DELETE FROM `bridgetoquestionsgames` WHERE `IDgame` = ?");
        $deleteQuestionsGame->bind_param("i", $gameID);
        $deleteQuestionsGame->execute();
    
        
        $deleteGamePatients = $i_conn->prepare("DELETE FROM `bridgegamespatients` WHERE `game_ID` = ?");
        $deleteGamePatients->bind_param("i", $gameID);
        $deleteGamePatients->execute();
    
      
        $deleteGame = $i_conn->prepare("DELETE FROM `games` WHERE `gameID` = ?");
        $deleteGame->bind_param("i", $gameID);
        $deleteGame->execute();
        
      
        if ($deleteGame->affected_rows > 0) {
            return json_encode(["success" => "Gioco eliminato correttamente"]);
        } else {
            return json_encode(["error" => "Gioco non trovato o non eliminato"]);
        }
    }
    
    function getGamesListForPatientAccount($i_conn) {
        
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
    
        
        if (!isset($dataJson["patientID"])) {
            return json_encode(['error' => 'patientID non fornito']);
        }
        $patientID = $dataJson["patientID"];
    
        
        $query = "SELECT games.gameID, games.creatorID, games.nomeGioco, games.tipoGioco, 
       games.livelloGioco, games.categoriaGioco, games.numero
FROM bridgegamespatients 
JOIN games ON bridgegamespatients.game_ID = games.gameID 
WHERE bridgegamespatients.patient_ID = ?;
";
    
       
        if ($stmt = $i_conn->prepare($query)) {
           
            $stmt->bind_param("i", $patientID);
    
            
            $stmt->execute();
    
            
            $result = $stmt->get_result();
            error_log(json_encode($result));
           
            if ($result->num_rows > 0) {
                $gamesList = [];
                while ($row = $result->fetch_assoc()) {
                    $gamesList[] = $row;
                }
    
                
                return json_encode($gamesList);
            } else {
                
                return json_encode(['error' => 'Nessun gioco trovato per questo paziente']);
            }
        } else {
           
            return json_encode(['error' => 'Errore nella preparazione della query']);
        }
    }
    
    
    
    
    function listaGiochiPaziente($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $patientID = $dataJson["patientID"];
  
        $listGamesPatient = $i_conn->prepare(
            "SELECT 
    games.gameID, 
    games.creatorID, 
    games.nomeGioco, 
    games.tipoGioco, 
    games.livelloGioco, 
    games.categoriaGioco,
    games.numero,
    bridgetoquestionsgames.IDquestion
FROM bridgeGamesPatients 
JOIN games ON bridgeGamesPatients.game_ID = games.gameID 
JOIN patients ON bridgeGamesPatients.patient_ID = patients.ID 
LEFT JOIN bridgetoquestionsgames ON games.gameID = bridgetoquestionsgames.IDgame
WHERE patients.ID = ?
"
        );
        $listGamesPatient->bind_param("i", $patientID);
        $listGamesPatient->execute();
        
        $result = $listGamesPatient->get_result();
        return $result;
    }
    function patientsListForSingleGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        
        $gamePatientsList = $i_conn->prepare("SELECT patient_ID FROM `bridgeGamesPatients` WHERE `game_ID` = ?");
        $gamePatientsList->bind_param("i", $gameID);
        $gamePatientsList->execute();
        
        $result = $gamePatientsList->get_result();
        return $result;
    }
    
    function saveGameToPatients($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        $patientsList  = $dataJson["patientsList"];
        
        // $gamePatientsList = $i_conn->prepare("SELECT patient_ID FROM `bridgeGamesPatients` WHERE `game_ID` = ?");
        // $gamePatientsList->bind_param("i", $gameID);
        // $gamePatientsList->execute();

        foreach($patientsList as $pazGame){
            $insertPatientGame = $i_conn->prepare(
                "INSERT INTO `bridgeGamesPatients` (`game_ID`, `patient_ID`) VALUES (?, ?)"
            );
            $insertPatientGame->bind_param("ii", $gameID, $pazGame['patient_ID']);
            $insertPatientGame->execute();
        }
        
        // $result = $gamePatientsList->get_result();
        return $result;
    }

    function generateRandomString() {
        return substr(md5(rand()), 0, 10);
    }

    function pswRecovery_checkEmail($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        
        $emailExist = $i_conn->prepare("SELECT `UID` FROM `accounts` WHERE email = ?");
        $emailExist->bind_param("s", $email);
        $emailExist->execute();

        $result = $emailExist->get_result();

        return $result;
    }

    function pswRecovery_code($i_conn) {
      
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        $newPassword = $dataJson["password"]; 
    
       
        $checkUser = $i_conn->prepare("SELECT `UID` FROM `accounts` WHERE email = ?");
        $checkUser->bind_param("s", $email);
        $checkUser->execute();
        $result = $checkUser->get_result();
    
        if ($result->num_rows > 0) {
           
            $hashedPassword = $newPassword;
    
            $updatePassword = $i_conn->prepare("UPDATE `accounts` SET `password` = ? WHERE `email` = ?");
            $updatePassword->bind_param("ss", $hashedPassword, $email);
            $updatePassword->execute();
    
            if ($updatePassword->affected_rows > 0) {
                echo json_encode(["success" => true, "message" => "Password aggiornata con successo"]);
            } else {
                echo json_encode(["success" => false, "message" => "Errore durante l'aggiornamento della password"]);
            }
        } else {
         
            echo json_encode(["success" => false, "message" => "Nessun account associato a questa email"]);
        }
    }
    

    function pswRecovery_reset($i_conn){
        echo "INIZIO";
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $psw = $dataJson["psw"];
        $codiceUnico = $dataJson["codiceUnico"];

        echo $codiceUnico;
        echo $psw;
        
        $checkEmail = $i_conn->prepare("SELECT `email` FROM `recuperoPsw` WHERE codiceUnico = ?");
        $checkEmail->bind_param("s", $codiceUnico);
        $checkEmail->execute();
        
        // $checkEmail->bind_result($result);
        $result = $checkEmail->get_result();

        $row = $result->fetch_array(MYSQLI_NUM);

        echo $row[0];

        if($result != null){
            
            $resetPsw = $i_conn->prepare("UPDATE `accounts` SET `password` = ? WHERE `email` = ?");
            $resetPsw->bind_param("ss", $psw, $row[0]);
            $resetPsw->execute();
            
            $resetPsw->bind_result($result);
        }
        return $result;
    }
    
    function insertFirstCode($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];
        $variabile = generateRandomString();

        $codeRecovery = $i_conn->prepare("INSERT INTO `recuperoPsw` (`codiceUnico`, `email`) VALUES (?, ?)");
        $codeRecovery->bind_param("ss", $variabile, $email);
        $codeRecovery->execute();
        $codeRecovery->bind_result($result);

        $subject = 'Reset Password';
        $message = 'https://myks.altervista.org/psw_recovery?code='.$variabile;
        $headers = array(
            'From' => 'webmaster@example.com',
            'X-Mailer' => 'PHP/' . phpversion()
        );
        
        mail($email, $subject, $message, $headers);

        return $result;
    }

    function updateCode($i_conn){
      
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
    
        
        $email = $dataJson["email"];
    
       
        $variabile = generateRandomString();
    
       
        $codeRecovery = $i_conn->prepare("UPDATE `recuperoPsw` SET `codiceUnico` = ? WHERE email = ?");
        $codeRecovery->bind_param("ss", $variabile, $email);
        $codeRecovery->execute();  
    
       
        $subject = 'Reset Password';
        $message = 'https://myks.altervista.org/psw_recovery?code=' . $variabile;
        $headers = array(
            'From' => 'webmaster@example.com',
            'X-Mailer' => 'PHP/' . phpversion()
        );
    
       
        mail($email, $subject, $message, $headers);
    
        
        return true;  
    }
    

    function getQuestionsFromGame($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $email = $dataJson["email"];

        $variabile = generateRandomString();

        $codeRecovery = $i_conn->prepare("UPDATE `recuperoPsw` SET `codiceUnico` = ? WHERE email = ?");
        $codeRecovery->bind_param("ss", $variabile, $email);
        $codeRecovery->execute();
        $codeRecovery->bind_result($result);

        $subject = 'Reset Password';
        $message = 'https://myks.altervista.org/psw_recovery?code='.$variabile;
        $headers = array(
            'From' => 'webmaster@example.com',
            'X-Mailer' => 'PHP/' . phpversion()
        );
        
        mail($email, $subject, $message, $headers);

        return $result;
    }

    function addBridgeQuestions($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        $domande = $dataJson["domande"];

        foreach($domande as $qstn) {
            echo $qstn;
           
            $bridgeQuestQuery = $i_conn->prepare("INSERT INTO `bridgeToQuestionsGames` (`IDgame`, `IDquestion`) VALUES (?, ?)");
            $bridgeQuestQuery->bind_param("ii", $gameID, $qstn);

            $bridgeQuestQuery->execute();
        }

        return $result;
    }

    function updateBridgeQuestions($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $gameID = $dataJson["gameID"];
        // $domande = $dataJson["domande"];
        
        // echo $qstn;
       
        $bridgeQuestQuery = $i_conn->prepare("DELETE FROM `bridgeToQuestionsGames` WHERE IDgame = ?");
        $bridgeQuestQuery->bind_param("i", $gameID);

        $bridgeQuestQuery->execute();
        

        return $result;
    }

    function saveGameResults($i_conn){
        $data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $pazienteID = $dataJson["pazienteID"];
        $giocoID = $dataJson["giocoID"];
        $rispTotali = $dataJson["rispTotali"];
        $rispCorrette = $dataJson["rispCorrette"];
        $rispSbagliate = $dataJson["rispSbagliate"];
        $dataSvolgimento = $dataJson["dataSvolgimento"];
        
       
        $insertGameResultQuery = $i_conn->prepare(
            "INSERT INTO `resultsGames` (`pazienteID`, `giocoID`, `rispTotali`, `rispCorrette`, `rispSbagliate`, `dataSvolgimento`)
            VALUES (?, ?, ?, ?, ?, ?)"
        );
        $insertGameResultQuery->bind_param("iiiiis", $pazienteID, $giocoID, $rispTotali, $rispCorrette, $rispSbagliate, $dataSvolgimento);
    
        $insertGameResultQuery->execute();
    
       
        if ($insertGameResultQuery->affected_rows > 0) {
            return json_encode(["success" => "Risultato del gioco salvato correttamente"]);
        } else {
            return json_encode(["error" => "Errore nel salvataggio del risultato del gioco"]);
        }
    }
    
    

    function getPatientStatistics($i_conn){
    	$data = file_get_contents("php://input");
        $dataJson = json_decode($data, true);
        
        $pazienteID = $dataJson["pazienteID"];
        
        $retrieveQuestionsList = $i_conn->prepare("SELECT * FROM `resultsGames` WHERE pazienteID = ?");
        $retrieveQuestionsList->bind_param("i", $pazienteID);
        
        $retrieveQuestionsList->execute();
        $result = $retrieveQuestionsList->get_result();
        return $result;
    }


                                    
    
?>
