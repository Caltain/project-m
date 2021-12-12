import { CardGroup} from 'react-bootstrap';


import { useState, useEffect } from 'react';

import * as furnitureService from '../../services/furnitureService';
import { useAuthContext } from '../../contexts/AuthContext';


import FurnitureCard from '../FurnitureList/FurnitureCard';

const Reservations = () => {
    const [furniture, setFurniture] = useState([]);
    const { user } = useAuthContext();
   

     const [reservationsList, setReservationsList] = useState([]);


 
    useEffect(async() => {
      await  furnitureService.getReservations(user._id)
            .then(furnitureResult => {
                setFurniture(furnitureResult);
                console.log(furniture);
             
            })
            .finally(res=>{
                console.log(furniture);
            })
            
    }, [user._id]);
    useEffect(() => {
        console.log(furniture);
        furnitureService.getOne(furniture[3]?.furnitureId)
            .then(furnitureResult => {
                console.log(furnitureResult);
                setReservationsList(furnitureResult);
             
            })
            
    }, [user._id]);
    console.log(furniture[3]?.furnitureId);

    console.log(furniture);

  

    return (
        <>
        {reservationsList?.length > 0 
            ? (
                <ul className="ulFurniture">
                    <CardGroup>

                    {reservationsList.map(x=><FurnitureCard key={x._id} furniturePiece={x} />)}
                    </CardGroup>
                </ul>
            )
            : <p>No furniture available at this very moment. Sorry for the inconvinionce!</p>
           }
     </>
    );
}

export default Reservations;