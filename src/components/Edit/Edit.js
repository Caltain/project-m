import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as furnitureService from '../../services/furnitureService';
import useFurnitureState from '../../hooks/useFurnitureState';
import { Alert, Form, Row,Button } from 'react-bootstrap';
import { validateString,validateNumber,validateImageUrl } from "../../helpers/FormValidationHelper";
import { useNotificationContext,types } from '../../contexts/NotificationContext';


const Edit = () => {
    const { furtnitureId } = useParams();
     const navigate = useNavigate();
     const { addNotification } = useNotificationContext();

    const [errors, setErrors] = useState({ name: false, 
        price : false, 
        phoneNumber : false, 
        color : false, 
        imageUrl:false, 
        description:false})
    const [furniture] = useFurnitureState(furtnitureId);

    
    const furnitureEditSubmitHandler = (e) => {
        e.preventDefault();
        try {
            if(
                errors.name== false 
              &&errors.price== false
              &&errors.phoneNumber== false
              &&errors.color== false
              &&errors.imageUrl== false
              &&errors.description== false 
              ){


             let furnitureData = Object.fromEntries(new FormData(e.currentTarget))

             furnitureService.update(furniture._id, furnitureData)
             .then(result => {
                  addNotification('Successfuly edited your furniture listing!', types.success)
                  navigate(`/details/${furtnitureId}`);
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
        }else if(field==="phoneNumber"){
          if (validateNumber(currentValue)) {
            setErrors(state => ({...state, phoneNumber: false}))
          } else {
            setErrors(state => ({...state, phoneNumber: 'This field should contain only numbers'}))
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
        <Form onSubmit={furnitureEditSubmitHandler} method="POST">
<Row className="mb-3">
 <Form.Group  controlId="formGridName" >
   <Form.Label>Name of furniture</Form.Label>
   <Form.Control type="text" name="name" placeholder="Enter name of furniture" defaultValue={furniture.name} onChange={changeHandler} required />
   <Alert variant="danger" show={errors.name}>{errors.name}</Alert>

 </Form.Group>
<Form.Group className="mb-3" controlId="formGridPrice">
 <Form.Label>Price</Form.Label>
 <Form.Control placeholder="Enter the price in euros of your item? " name="price" defaultValue={furniture.price} onChange={changeHandler} required />
 <Alert variant="danger" show={errors.price}>{errors.price}</Alert>

</Form.Group>
<Form.Group className="mb-3" controlId="formGridphoneNumber">
 <Form.Label>Phone Number</Form.Label>
 <Form.Control placeholder="Enter your phone number" name = "phoneNumber" defaultValue={furniture.phoneNumber} onChange={changeHandler} required />
 <Alert variant="danger" show={errors.phoneNumber}>{errors.phoneNumber}</Alert>

</Form.Group>
<Form.Group className="mb-3" controlId="formGridColor">
 <Form.Label>Color</Form.Label>
 <Form.Control placeholder="Enter the color of your item" name="color" defaultValue={furniture.color} onChange={changeHandler} required  />
 <Alert variant="danger" show={errors.color}>{errors.color}</Alert>

</Form.Group>
<Form.Group className="mb-3" controlId="formGridImage">
 <Form.Label>ImageURL</Form.Label>
 <Form.Control placeholder="Copy image URL here" name ="imageUrl" defaultValue={furniture.imageUrl} onChange={changeHandler} required />
 <Alert variant="danger" show={errors.imageUrl}>{errors.imageUrl}</Alert>

</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
 <Form.Label>Description</Form.Label>
 <Form.Control placeholder="Enter description here" as="textarea" rows={3} defaultValue={furniture.description} name="description" onChange={changeHandler} required/>
 <Alert variant="danger" show={errors.description}>{errors.description}</Alert>

</Form.Group>      
</Row>
<Button variant="secondary" type="submit">
 Save
</Button>
</Form>

    </div>
     
    );
}

export default Edit;