import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as furnitureService from '../../services/furnitureService';
import * as likeService from '../../services/likeService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNotificationContext, types } from '../../contexts/NotificationContext';
import useFurnitureState from '../../hooks/useFurnitureState';

import { Button } from 'react-bootstrap';
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
        console.log(process.env.NODE_ENV);
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

        if (furniture.likes.includes(user._id)) {
            addNotification('You cannot like again')
            return;
        }

        likeService.like(user._id, furnitureId)
            .then(() => {
                setFurniture(state => ({...state, likes: [...state.likes, user._id]}));

                addNotification('Successfuly liked a cat :)', types.success);
            });
    };

    const userButtons = <Button onClick={likeButtonClick} disabled={furniture.likes?.includes(user._id)}>Like</Button>;

    return (
        <>
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler} />
            <section id="details-page" className="details">
                <div className="furniture-information">
                    <h3>Name: {furniture.name}</h3>
                    <p className="type">Type: {furniture.type}</p>
                    <p className="img"><img src={furniture.imageUrl} /></p>
                    <div className="actions">
                        {user._id && (user._id == furniture._ownerId
                            ? ownerButtons
                            : userButtons
                        )}

                        <div className="likes">
                            <img className="hearts" src="/images/heart.png" />
                            <span id="total-likes">Likes: {furniture.likes?.length || 0}</span>
                        </div>
                    </div>
                </div>
                <div className="furniture-description">
                    <h3>Description:</h3>
                    <p>{furniture.description}</p>
                </div>
            </section>
        </>
    );
}

export default Details;