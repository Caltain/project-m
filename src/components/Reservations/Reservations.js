import { CardGroup} from 'react-bootstrap';


import { useState, useEffect } from 'react';

import * as furnitureService from '../../services/furnitureService';
import { useAuthContext } from '../../contexts/AuthContext';

import FurnitureReservationCard from './FurnitureReservationCard';

const Reservations = () => {
    const [furniture, setFurniture] = useState([]);
    const { user } = useAuthContext();
   
     const [reservationsList, setReservationsList] = useState([]);

    useEffect(() => {
        furnitureService.getReservations(user._id)
            .then(furnitureResult => {
                setFurniture(furnitureResult);
          
            })
           
            
    }, [user._id]);
 

  

    return (
        <>
        {furniture?.length > 0 
            ? (
                <ul className="ulFurniture">
                    <CardGroup>
                    {furniture.map(x=><FurnitureReservationCard key={x._id} furniturePiece={x} />)}
                    </CardGroup>
                </ul>
            )
            : <p style={{textAlign:'center',marginTop:"300px",fontSize:"30px" }}>You currently have no reservations!</p>
           }
     </>
    );
}

export default Reservations;