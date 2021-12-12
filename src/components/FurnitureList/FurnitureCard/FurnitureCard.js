import { Link } from "react-router-dom";
import { Card} from "react-bootstrap";

const FurnitureCard = ({
    furniturePiece
}) => {
    console.log(furniturePiece)
    return (
        <li> 
            <Card bg="dark" text="white" style={{ width: '18rem'}}>
             <Card.Img variant="top" src={furniturePiece.imageUrl} />
            <Card.Body>
              <Card.Title>{furniturePiece.name}</Card.Title>
                <Card.Text>
                 {furniturePiece.description}
                 </Card.Text>
                 <Link className="button" to={`/details/${furniturePiece._id}`}>Details</Link>
            </Card.Body>
        </Card>   

        </li>
    )
}

export default FurnitureCard;