import { useState, useEffect } from 'react';

import * as furnitureService from '../services/furnitureService';
//Setting up the current state of the furniture 
const useFurnitureState = (furnitureId) => {
    const [furniture, setFurniture] = useState({});

    useEffect(() => {
        furnitureService.getOne(furnitureId)
            .then(furnitureResult => {
               
                setFurniture(furnitureResult);
            })
            
    },[furnitureId])

    return [
        furniture,
        setFurniture
    ]
};

export default useFurnitureState;