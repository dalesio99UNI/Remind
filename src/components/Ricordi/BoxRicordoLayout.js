import React from "react";
import styles from "./BoxRicordoLayout.module.css"; 

function BoxRicordo({ nome, cognome, citta, eta, onView, onEdit, onDelete, isDoctor }) {
    return (
        <div className={styles.box}>
            <div className={styles.info}>
                <h1>{nome} {cognome}</h1> 
                <p><strong>Città:</strong> {citta}</p>
                <p><strong>Età:</strong> {eta}</p>
            </div>

            <div className={styles.actions}>
               
                <button className={styles.viewButton} onClick={onView}>Visualizza Ricordi</button>

              
                {isDoctor && (
                    <>
                        <button className={styles.editButton} onClick={onEdit}>Modifica</button>
                        <button className={styles.deleteButton} onClick={onDelete}>Elimina</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default BoxRicordo;


