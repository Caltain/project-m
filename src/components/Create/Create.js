import { Form, Button, Row, Alert } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as furnitureService from '../../services/furnitureService';
import { useAuthContext } from '../../contexts/AuthContext';
import { validateString,validateNumber,validateImageUrl } from "../../helpers/FormValidationHelper";


const Create = () => {

  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [errors, setErrors] = useState({
    name: false, 
    price : false, 
    year : false, 
    color : false, 
    imageUrl:false, 
    description:false
  })


  const onCreateListing = (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    let name = formData.get('name');
    let price = formData.get('price');
    let year = formData.get('year');
    let color = formData.get('color');
    let imageUrl = formData.get('imageUrl');
    let description = formData.get('description');

    try {
        if(
            errors.name== false 
          &&errors.price== false
          &&errors.year== false
          &&errors.color== false
          &&errors.imageUrl== false
          &&errors.description== false 
          ){
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

    }else{
      return
    }
      } catch (error) {
        console.log(error)
      }
    
}

const changeHandler = (e) => {
  let currentValue = e.target.value;
  let field = e.target.name
  if(field==="name"){
  if (validateString(currentValue) ) {
    setErrors(state => ({...state, name: false}))     
  } else {
    setErrors(state => ({...state, name: 'This field should have between 3 and 20 characters!'}))
    }
  }else if(field==="price"){
    if (validateNumber(currentValue)) {
      setErrors(state => ({...state, price: false}))
    } else {
      setErrors(state => ({...state, price: 'This field should contain only numbers'}))           
    }
  }else if(field==="year"){
    if (validateNumber(currentValue)) {
      setErrors(state => ({...state, year: false}))
    } else {
      setErrors(state => ({...state, year: 'This field should contain only numbers'}))
    }
  }else if(field==="color"){
    if (validateString(currentValue)) {
      
      setErrors(state => ({...state, color: false}))
    } else {
      setErrors(state => ({...state, color: 'This field should have between 3 and 20 characters!'}))
    }
  }else if(field==="imageUrl"){
   
    if (validateImageUrl(currentValue)) {
      setErrors(state => ({...state, imageUrl: false}))
    } else {
      setErrors(state => ({...state, imageUrl: 'This field should be a valid URL'}))   
    }
  }else if(field==="description"){
    if (validateString(currentValue)) {
      
      setErrors(state => ({...state, description: false}))
    } else {
      setErrors(state => ({...state, description: 'This field should have between 3 and 20 characters!'}))
    }
}
}

  
    return (
       <div className="create-page">
           <Form onSubmit={onCreateListing} method="POST">
  <Row className="mb-3">
    <Form.Group  controlId="formGridName" >
      <Form.Label>Name of furniture</Form.Label>
      <Form.Control type="text" name="name" placeholder="Enter name of furniture" onChange={changeHandler} required />
      <Alert variant="danger" show={errors.name}>{errors.name}</Alert>

    </Form.Group>
  <Form.Group className="mb-3" controlId="formGridPrice">
    <Form.Label>Price</Form.Label>
    <Form.Control placeholder="Enter the price in euros of your item? " name="price" onChange={changeHandler} required />
    <Alert variant="danger" show={errors.price}>{errors.price}</Alert>

  </Form.Group>
  <Form.Group className="mb-3" controlId="formGridYear">
    <Form.Label>Year</Form.Label>
    <Form.Control placeholder="Enter the year of production of your item" name = "year" onChange={changeHandler} required />
    <Alert variant="danger" show={errors.year}>{errors.year}</Alert>

  </Form.Group>
  <Form.Group className="mb-3" controlId="formGridColor">
    <Form.Label>Color</Form.Label>
    <Form.Control placeholder="Enter the color of your item" name="color" onChange={changeHandler} required  />
    <Alert variant="danger" show={errors.color}>{errors.color}</Alert>

  </Form.Group>
  <Form.Group className="mb-3" controlId="formGridImage">
    <Form.Label>ImageURL</Form.Label>
    <Form.Control placeholder="Copy image URL here" name ="imageUrl" onChange={changeHandler} required />
    <Alert variant="danger" show={errors.imageUrl}>{errors.imageUrl}</Alert>

  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control placeholder="Enter description here" as="textarea" rows={3} name="description" onChange={changeHandler} required/>
    <Alert variant="danger" show={errors.description}>{errors.description}</Alert>

  </Form.Group>      
  </Row>
  <Button variant="secondary" type="submit">
    Submit
  </Button>
</Form>

       </div>
        
    );
}

export default Create