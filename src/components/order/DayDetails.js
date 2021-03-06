import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import moment from "moment";
import "moment/locale/fr";

import Table from '../order/Table';


const DayDetails = ({date, dishByDateList, nbR, price}) => {

    const [isAvailable, setIsAvailable] = useState(false);
    const [haveDesc, setHaveDesc] = useState(false);

    useEffect(() => {

        async function getNb() {
            setIsAvailable(false);
            setHaveDesc(false);
            
            dishByDateList.forEach(d => {
                if (nbR > 0 && nbR !== "") setIsAvailable(true);
                if (d.description !== "") setHaveDesc(true);
            });

            if(new Date(new Date(date)) < new Date(new Date().toDateString())) setIsAvailable(false);
        }

        getNb();
    
    }, [dishByDateList, nbR]);


    return ( 
        <div className="day-details">
            <h1 className="day-details__title">{moment(date).locale('fr').format('LL')}</h1>

            { (nbR >= 0 && nbR !== "") &&
                <div className="right__places-price">
                    <div className="right__places-available">
                        <p>Places disponibles : {nbR}</p>
                    </div>

                    <div className="right__price">
                        <p>Prix : {price} €</p>
                    </div>

                </div>
               
                
            }

            <Table dishByDateList={dishByDateList}/>
            
            { isAvailable ?

            <>
                { haveDesc &&
                    <div className="right__tip">
                        <p>Passez la souris sur le nom du plat pour avoir sa description.</p>
                    </div>
                }

                <div className="day-details__button">
                    <div className="btn">
                        <Link to={`passer-reservation/${date}`} onClick={() => localStorage.removeItem('date')}>
                            Réserver
                        </Link>               
                    </div>
                </div>
            </>

            :

            <>
                <div className="day-details__button" style={{color:'white'}}>
                    Vous ne pouvez pas réserver à cette date.
                </div>
            </>

            }
            
        </div>
     );
}

export default DayDetails;