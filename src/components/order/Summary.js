import React from 'react';

import InputButton from "../generic/InputButton";

const Summary = ({onClickConfirmation, sumRef, dishList, name, total, email, nbP}) => {

    return (
        <div className="summary-container" ref={sumRef}>
            <div className="summary-content">
                <div className="summary-items">
                    <p className="summary-title">Réservation effectuée ✅ !</p>
                    <p className="summary-name">{name}, voici le résumé de votre réservation pour {nbP > 1 ? nbP + " personnes" : nbP + " personne"} :</p>
                    <div className="summary-list">
                        {dishList.map(d => {
                            return (
                                <div className="list---box" key={d._id}>
                                    <p className="box---name">{d.name}</p>
                                </div>
                            );
                        })}                        
                    </div>
                    <div className="summary-confirmation">
                        {email && <p>Un email de confirmation vous a été envoyé.</p> }
                        
                        <p>En vous remerciant, passez une agréable journée !</p>
                    </div>
                    <div className="summary-total">
                        <p>Total : {total} €</p>
                    </div>

                    <InputButton type="button" value={"Ok"} onClick={onClickConfirmation}/>
                </div>
            </div>

            <div className="summary-background">
            </div>
        </div>
    );
}

export default Summary;