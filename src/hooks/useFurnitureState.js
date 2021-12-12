import { useState, useEffect } from 'react';

import * as furnitureService from '../services/furnitureService';

const useFurnitureState = (furnitureId) => {
    const [furniture, setFurniture] = useState({});

    useEffect(() => {
        furnitureService.getOne(furnitureId)
            .then(furnitureResult => {
                console.log(furnitureResult);
                setFurniture(furnitureResult);
            })
    }, [furnitureId]);

    return [
        furniture,
        setFurniture
    ]
};

export default useFurnitureState;