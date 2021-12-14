import { useEffect,useState } from "react";
import FurnitureCard from "./FurnitureCard";
import * as furnitureService from '../../services/furnitureService.js'
import { CardGroup,Form,Row,Col,Button} from "react-bootstrap";


const FurnitureList = () =>{
    const [furniture, setFurniture] = useState([]);
    const [searchTerm, setSearchTerm] = useState('')
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
                <ul className="ulFurniture" style={{margin:'auto'}}>
                    <h1>Furniture listings</h1>
             <Form onChange={(e)=>{setSearchTerm(e.target.value)}} style={{margin:"auto", width:"19%"}}>
                 <Row className="align-items-center">
                     <Col sm={13.5} className="my-1">
                      
                       <Form.Control id="inlineFormInputName" placeholder="Search..." />
                     </Col>
                 </Row>
            </Form>
                    <CardGroup>
                    {furniture.filter((x)=>{
           if(searchTerm==""){
               return x
           }else if(x.name.toLowerCase().includes(searchTerm.toLowerCase())){
               return x
           }
                  }).map(x=><FurnitureCard key={x._id} furniturePiece={x} />)}
                    </CardGroup>
                </ul>
            )
            : <p style={{textAlign:'center',marginTop:"300px",fontSize:"30px" }}>No furniture listings available at this very moment!</p>
           }
                
        
            </>
  
    )

}
export default FurnitureList;