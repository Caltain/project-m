import { useEffect, useState } from 'react';
import { CardGroup } from 'react-bootstrap';
import CommentsCard from './CommentsCard';
import * as commentService from '../../services/commentService'
const Comments = () => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        commentService.getAllComments()
            .then(commentsResult => {
                setComments(commentsResult);
          
            })
           
            
    }, []);

    return (
            <>
        {comments?.length > 0 
            ? (
                <ul className="ulComments">
                    <CardGroup>
                    {comments.map(x=><CommentsCard key={x._id} comment={x}  />)}
                    </CardGroup>
                </ul>
            )
            : <p style={{textAlign:'center',marginTop:"300px",fontSize:"30px" }}>You currently have no comments!</p>
           }
     </>
        
    );
}

export default Comments;