import { Link } from "react-router-dom";

const FurnitureCard = ({
    furniturePiece
}) => {
    return (
        <li>
            <h2>Name: {furniturePiece.name}</h2>
            <h2>Manufacturer: {furniturePiece.manufacturer}</h2>
            <p>Year : {furniturePiece.year}</p>
            <p>Color : {furniturePiece.color}</p>
            <p className="img"><img src={furniturePiece.imageUrl} /></p>
            <Link className="button" to={`/details/${furniturePiece._id}`}>Details</Link>


        </li>
    )
}

export default FurnitureCard;