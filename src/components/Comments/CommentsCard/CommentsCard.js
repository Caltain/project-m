import {Card} from "react-bootstrap";

const CommentsCard = ({
    comment
}) => {

    return (
    <div className="commentsCard">
        <li > 
          <Card bg="light" style={{ width: '18rem',marginRight:'20px',marginTop:"10px" }}>
          <Card.Header>From</Card.Header>
            <Card.Body>
             <Card.Title>{comment.comment}</Card.Title>
              
               <Card.Text>
                {comment.comment}
               </Card.Text>
    
             </Card.Body>
          </Card>
            
        </li>
    </div>       
    )
}

export default CommentsCard;