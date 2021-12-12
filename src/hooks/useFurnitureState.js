import { useState, useEffect,useMemo } from 'react';

import * as furnitureService from '../services/furnitureService';

const useFurnitureState = (furnitureId) => {
    const [furniture, setFurniture] = useState({});
    const controller = useMemo(() => {
        const controller = new AbortController();

        return controller;
    }, [])
    useEffect(() => {
        furnitureService.getOne(furnitureId, controller.signal)
            .then(furnitureResult => {
                
                setFurniture(furnitureResult);
            })
            return () => {
                controller.abort();     
            }
    }, [furnitureId, controller])

    return [
        furniture,
        setFurniture
    ]
};

export default useFurnitureState;