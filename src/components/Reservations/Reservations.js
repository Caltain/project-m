import { CardGroup} from 'react-bootstrap';


import { useState, useEffect } from 'react';

import * as furnitureService from '../../services/furnitureService';
import { useAuthContext } from '../../contexts/AuthContext';

import FurnitureReservationCard from './FurnitureReservationCard';


const Reservations = () => {
 

    const [furniture, setFurniture] = useState([]);
    const { user } = useAuthContext();
   
    

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
                <ul className="ulFurniture" style={{textAlign:'center',marginTop:'30px'}}>
                    <h1>My Reservations</h1>

                    <CardGroup>
                    {furniture.map(x=><FurnitureReservationCard key={x._id} furniturePiece={x} id={x._id} />)}
                    </CardGroup>
                </ul>
            )
            : <p style={{textAlign:'center',marginTop:"300px",fontSize:"30px" }}>You currently have no reservations!</p>
           }
     </>
    );
}

export default Reservations;