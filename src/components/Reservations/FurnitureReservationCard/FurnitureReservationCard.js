import { Link } from "react-router-dom";
import { Card} from "react-bootstrap";
import { useState, useEffect } from 'react';
import * as furnitureService from '../../../services/furnitureService';

const FurnitureReservationCard = ({
    furniturePiece
}) => {

const [furniture, setFurniture] = useState([]);


useEffect(() => {
    furnitureService.getOne(furniturePiece.furnitureId)
        .then(furnitureResult => {
            setFurniture(furnitureResult);
      
        })
       
        
}, []);


    return (
        <li> 
            <Card bg="dark" text="white" style={{ width: '18rem', height:'25rem', margin:"10px"}}>
             <Card.Img style={{ width: '18rem', height:'12rem'}} variant="top" src={furniture.imageUrl} />
            <Card.Body>
              <Card.Title>{furniture.name}</Card.Title>
              <Card.Text>
                 {furniture.price} €
                 </Card.Text>
                <Card.Text>
                 {furniture.description}
                 </Card.Text>
                 <Link className="button" to={`/details/${furniture._id}`}>Details</Link>
            </Card.Body>
        </Card>   

        </li>
    )
}

export default FurnitureReservationCard;