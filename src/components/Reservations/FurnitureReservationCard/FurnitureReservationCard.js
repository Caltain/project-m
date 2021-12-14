import { Link } from "react-router-dom";
import { Card} from "react-bootstrap";
import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

import * as furnitureService from '../../../services/furnitureService';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNotificationContext,types } from "../../../contexts/NotificationContext";
import ConfirmDialog from '../../Common/ConfirmDialog';


const FurnitureReservationCard = ({
    furniturePiece, id
}) => {

const [furniture, setFurniture] = useState([]);
const navigate = useNavigate();
const { user } = useAuthContext();
const { addNotification } = useNotificationContext();
const [showCancelDialog, setShowCancelDialog] = useState(false);


useEffect(() => {
    furnitureService.getOne(furniturePiece.furnitureId)
        .then(furnitureResult => {
            setFurniture(furnitureResult);
      
        })
       
        
}, [furniturePiece.furnitureId]);
const cancelHandler  = (e) => {
    e.preventDefault();
    furnitureService.cancel(id, user.accessToken)
    .then(() => {
        navigate('/catalog');
        addNotification('SuccessfulL cancelation!', types.success)

    })
    .finally(() => {
        setShowCancelDialog(false);
        
    });
}
const cancelClickHandler = (e) => {
    e.preventDefault();
   
    setShowCancelDialog(true);
}

    return (
       <div>

       
        <ConfirmDialog show={showCancelDialog} onClose={() => setShowCancelDialog(false)} onSave={cancelHandler} />
        <li className="reservertionCard"> 
           <Card bg="dark" text="white" style={{ width: '18rem', height:'30rem', margin:"10px"}}>
           <Card.Img style={{ width: '18rem', height:'16rem'}} variant="top" src={furniture.imageUrl} />
           <Card.Body>
                  <Card.Title>Name:  {furniture.name}</Card.Title>
                  <Card.Text>
                   Price: {furniture.price} €
                 </Card.Text>
                 <Card.Text>
                  PhoneNumber:  {furniture.phoneNumber} 
                 </Card.Text>
                 <Card.Text>
                  Color:   {furniture.color} 
                 </Card.Text>
                    <Card.Text>
                   Description:  {furniture.description}
                     </Card.Text>
                     <Link className="button" to={`/details/${furniture._id}`}>Details</Link>
                     <Link className="button" style={{marginLeft:"50px"}} to="#" onClick={cancelClickHandler}>Cancel</Link>
                </Card.Body>
            </Card>   
            
          </li>
          </div>
        
    )
}

export default FurnitureReservationCard;