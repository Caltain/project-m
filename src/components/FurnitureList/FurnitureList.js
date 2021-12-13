import { useEffect,useState } from "react";
import FurnitureCard from "./FurnitureCard";
import * as furnitureService from '../../services/furnitureService.js'
import { CardGroup} from "react-bootstrap";


const FurnitureList = () =>{
    const [furniture, setFurniture] = useState([]);

    useEffect(()=>{
            furnitureService.getAll()
            .then(result=>{
                setFurniture(result)
            })

    },[])
       
    return (
            <>
            
            {furniture?.length > 0 
            ? (
                <ul className="ulFurniture">
                    <h1>Furniture listings</h1>
                    <CardGroup>

                    {furniture.map(x=><FurnitureCard key={x._id} furniturePiece={x} />)}
                    </CardGroup>
                </ul>
            )
            : <p style={{textAlign:'center',marginTop:"300px",fontSize:"30px" }}>No furniture listings available at this very moment!</p>
           }
                
        
            </>
  
    )

}
export default FurnitureList;