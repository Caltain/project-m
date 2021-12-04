import { useEffect,useState } from "react";
import FurnitureCard from "./FurnitureCard";
import * as furnitureService from '../../services/furnitureService.js'

const FurnitureList = () =>{
    const [furniture, setFurniture] = useState([]);

    useEffect(()=>{
            furnitureService.getAll()
            .then(result=>{
                setFurniture(result)
            })

    },[])

    return(
     <>
        {furniture.length> 0
        ?(
            <ul>
                {furniture.map(x=><FurnitureCard key={x._id} furniturePiece={x} />)}
            </ul>
        )
        : <p>No furniture available at this very moment. Sorry for the inconvinionce!</p>
       }
    </>
    )

}
export default FurnitureList;