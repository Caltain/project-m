import { Button,Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as furnitureService from '../../services/furnitureService';
import * as reactService from '../../services/reactService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useFurnitureState from '../../hooks/useFurnitureState';
import ConfirmDialog from '../Common/ConfirmDialog';


const Details = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const { furnitureId } = useParams();
    const [furniture, setFurniture] = useFurnitureState(furnitureId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

//Hook to get the number of likes
    useEffect(() => {
        reactService.getFurnitureLikes(furnitureId)
            .then(likes => {
                
                setFurniture(state => ({...state, likes}))
            })
    }, [furnitureId,setFurniture]);  

//Hook to get the number of loves
     useEffect(() => {
        reactService.getFurnitureLove(furnitureId)
            .then(love => {
                setFurniture(state => ({...state, love}))
            })
    }, [furnitureId,setFurniture]);

//Hook to get if the item is reserved
    useEffect(() => {
        reactService.getFurnitureReserve(furnitureId)
            .then(reserve => {
                setFurniture(state => ({...state, reserve}))
            })
    }, [furnitureId,setFurniture]);

//Handles the delete request
 const deleteHandler = (e) => {
        e.preventDefault();

        furnitureService.destroy(furnitureId, user.accessToken)
            .then(() => {
                addNotification('You succesfully deleted your listing!',types.info)

                navigate('/catalog');
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };

//Handles the modal 
 const deleteClickHandler = (e) => {
        e.preventDefault();
       
        setShowDeleteDialog(true);
    }

 const ownerButtons = (
        <>
            <Link className="button" to={`/edit/${furniture._id}`}>Edit</Link>
            <a className="button" href="/#" onClick={deleteClickHandler}>Delete</a>
        </>
    );
//Handles the like button interaction
const likeButtonClick = () => {
        if (user._id === furniture._ownerId) {
            return;
        }
       console.log(furniture.likes);
        if (furniture?.likes.includes(user._id)) {
            addNotification('You cannot like again')
            return;
        }
        reactService.like(user._id, furnitureId)
            .then(() => {
                setFurniture(state => ({...state, likes: [...state.likes, user._id]}));

                addNotification('Successfuly liked a furniture :)', types.info);
            });
    };

//Handles the love button interaction
const loveButtonClick = () => {
        if (user._id === furniture._ownerId) {
            return;
        }
        if (furniture.love.includes(user._id)) {
            addNotification('You cannot love it again')
            return;
        }
        
        reactService.love(user._id, furnitureId)
        .then(() => {
            
            setFurniture(state => ({...state, love: [...state.love, user._id]}));
            
                addNotification('Successfuly loved a furniture :)', types.info);
            });
    };

//Handles the reserve button interaction
 const reserveButtonClick = () => {
        if (user._id === furniture._ownerId) {
            return;
        }
        
        if (furniture.reserve?.length>1) {
            addNotification('This item has already been reserved!')
            return;
        } 
        
        reactService.reserve(user._id, furnitureId)
        .then(() => {

            setFurniture(state => ({...state, reserve: [...state.reserve, user._id]}));
   
            addNotification('Successfuly reserved a furniture!', types.info);
        });
       

    };
    const userButtons = (
        <>
         <Button onClick={likeButtonClick} disabled={furniture.likes?.includes(user._id)}>Like</Button>
         <span > <Button onClick={reserveButtonClick} variant="success" disabled={furniture.reserve?.includes(user._id)}>Reserve</Button></span>
         <Button style={{marginLeft:'5px'}} variant='danger' onClick={loveButtonClick} disabled={furniture.love?.includes(user._id)}>Love</Button>
        
        </>
    );
    
    const guestButtons = (
        <>
        <span > <Button variant="info">Liked ????: {furniture.likes?.length || 0}</Button>{" "}</span>
        <span > <Button variant="danger">Loved ???: {furniture.love?.length || 0}</Button>{" "}</span>
 
        </>

    )
    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />
            <Card id="detailsCard" style={{ width: '32rem',height: "46rem",position:'absolute', left:"650px"}} bg="black"   text="white">
            <Card.Title style={{paddingTop:"20px"}}>Name : {furniture.reserve?.length
               
               ? 'This item has already been reserved!'
               : furniture.name}
               </Card.Title>
            <Card.Img style={{height:"25rem"}} src={
                furniture.reserve?.length
               
                ? '/images/reservedimage.jpg'
                : furniture.imageUrl
            } />
          
                  <Card.Title>Price : {furniture.price}</Card.Title>
                  <Card.Text>  Phone Number : {furniture.phoneNumber} </Card.Text>
                 <Card.Text> Color : {furniture.color}</Card.Text>
                       
             <Card.Text>
                 Description : {furniture.description}
            </Card.Text>
             <Card.Body>
                        {user._id && (user._id == furniture._ownerId
                            ? ownerButtons
                            : userButtons 
                        )}
             
                        {guestButtons}   

             </Card.Body>
            
             </Card>         
           
        </>
    );
}

export default Details;