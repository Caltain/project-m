import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as furnitureService from '../../services/furnitureService';
import * as likeService from '../../services/likeService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useFurnitureState from '../../hooks/useFurnitureState';

import { Button,ListGroup,Card } from 'react-bootstrap';
import ConfirmDialog from '../Common/ConfirmDialog';

const Details = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const { addNotification } = useNotificationContext();
    const { furnitureId } = useParams();
    const [furniture, setFurniture] = useFurnitureState(furnitureId);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        likeService.getFurnitureLikes(furnitureId)
            .then(likes => {
                setFurniture(state => ({...state, likes}))
            })
    }, []);  
     useEffect(() => {
        likeService.getFurnitureLove(furnitureId)
            .then(love => {
                setFurniture(state => ({...state, love}))
            })
    }, []);
    useEffect(() => {
        likeService.getFurnitureReserve(furnitureId)
            .then(reserve => {
                setFurniture(state => ({...state, reserve}))
            })
    }, []);

    const deleteHandler = (e) => {
        e.preventDefault();

        furnitureService.destroy(furnitureId, user.accessToken)
            .then(() => {
                navigate('/catalog');
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();
       
        setShowDeleteDialog(true);
    }

    const ownerButtons = (
        <>
            <Link className="button" to={`/edit/${furniture._id}`}>Edit</Link>
            <a className="button" href="#" onClick={deleteClickHandler}>Delete</a>
        </>
    );

    const likeButtonClick = () => {
        if (user._id === furniture._ownerId) {
            return;
        }
        console.log(furniture);
        if (furniture.likes.includes(user._id)) {
            addNotification('You cannot like again')
            return;
        }

        likeService.like(user._id, furnitureId)
            .then(() => {
                setFurniture(state => ({...state, likes: [...state.likes, user._id]}));

                addNotification('Successfuly liked a furniture :)', types.success);
            });
    };

    const loveButtonClick = () => {
        if (user._id === furniture._ownerId) {
            return;
        }
        if (furniture.love.includes(user._id)) {
            addNotification('You cannot love it again')
            return;
        }
        
        likeService.love(user._id, furnitureId)
        .then(() => {
            

            setFurniture(state => ({...state, love: [...state.love, user._id]}));
            console.log(furniture);

                addNotification('Successfuly loved a furniture :)', types.success);
            });
    };
    const reserveButtonClick = () => {
       
        console.log(furniture)
        if (furniture.reserve?.length>1) {
            addNotification('This item has already been reserved!')
            return;
        }
        
        likeService.reserve(user._id, furnitureId)
        .then(() => {
            

            setFurniture(state => ({...state, reserved: user._id}));
        
           

            addNotification('Successfuly reserved a furniture!', types.success);
        });
    };
  
    const userButtons = (
        <>
         <Button onClick={likeButtonClick} disabled={furniture.likes?.includes(user._id)}>Like</Button>
         <Button style={{marginLeft:'5px'}} variant='danger' onClick={loveButtonClick} disabled={furniture.love?.includes(user._id)}>Love</Button>
         <span > <Button onClick={reserveButtonClick} variant="success" disabled={furniture.reserve?.includes(user._id)}>Reserve</Button></span>
        </>
    );
    
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
                  <Card.Text>  Year : {furniture.year} </Card.Text>
                 <Card.Text> Color : {furniture.color}</Card.Text>
                 
        
             <Card.Text>
                 Description : {furniture.description}
            </Card.Text>
             <Card.Body>
                        {user._id && (user._id == furniture._ownerId
                            ? ownerButtons
                            : userButtons 
                        )}
             


             <span style={{}}> <Button variant="info">Likes 👍: {furniture.likes?.length || 0}</Button>{" "}</span>
             <span style={{}}> <Button variant="danger">Loved ♥: {furniture.love?.length || 0}</Button>{" "}</span>
             </Card.Body>
            
             </Card>
            
          
                
           
        </>
    );
}

export default Details;