import { Form, Button, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import * as furnitureService from '../../services/furnitureService';
import { useAuthContext } from '../../contexts/AuthContext';





const Create = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();


  const onCreateListing = (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    let name = formData.get('name');
    let price = formData.get('price');
    let year = formData.get('year');
    let color = formData.get('color');
    let imageUrl = formData.get('imageUrl');
    let description = formData.get('description');
    
    furnitureService.create({
        name,
        price,
        year,
        color,
        imageUrl,
        description     
    },user.accessToken)
        .then(result => {
            navigate('/catalog');
        })
}





  
    return (
       <div className="create-page">
           <Form onSubmit={onCreateListing} method="POST">
  <Row className="mb-3">
    <Form.Group  controlId="formGridName">
      <Form.Label>Name of furniture</Form.Label>
      <Form.Control type="text" name="name" placeholder="Enter name of furniture" />
    </Form.Group>
  <Form.Group className="mb-3" controlId="formGridPrice">
    <Form.Label>Price</Form.Label>
    <Form.Control placeholder="Enter the price of your item? " name="price" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGridYear">
    <Form.Label>Year</Form.Label>
    <Form.Control placeholder="Enter the year of production of your item" name = "year" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGridColor">
    <Form.Label>Color</Form.Label>
    <Form.Control placeholder="Enter the color of your item" name="color" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGridImage">
    <Form.Label>ImageURL</Form.Label>
    <Form.Control placeholder="Copy image URL here" name ="imageUrl" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control placeholder="Enter description here" as="textarea" rows={3} name="description" />
  </Form.Group>      
  </Row>
  <Button variant="secondary" type="submit">
    Submit
  </Button>
</Form>

       </div>
        
    );
}

export default Create;