import { Link } from "react-router-dom";
import { Card} from "react-bootstrap";

const FurnitureCard = ({
    furniturePiece
}) => {
    
    return (
        <li> 
            <Card bg="dark" text="white" style={{ width: '18rem', height:'30rem', margin:"10px", textAlign:'center'}}>
             <Card.Img style={{ width: '18rem', height:'15rem'}} variant="top" src={furniturePiece.imageUrl} />
            <Card.Body>
              <Card.Title>Name:  {furniturePiece.name}</Card.Title>
              <Card.Text>
               Price: {furniturePiece.price} €
                 </Card.Text>
                 <Card.Text>
               Phone Number: {furniturePiece.phoneNumber} 
                 </Card.Text>
                 <Card.Text>
               Color: {furniturePiece.color} 
                 </Card.Text>
                <Card.Text>
               Description:  {furniturePiece.description}
                 </Card.Text>
                 <Link className="button" to={`/details/${furniturePiece._id}`}>Details</Link>
            </Card.Body>
        </Card>   

        </li>
    )
}

export default FurnitureCard;