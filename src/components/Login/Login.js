import { Form, Button, Alert, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService"
import { validateEmail,validatePassword } from "../../helpers/FormValidationHelper";
import { useNotificationContext,types } from "../../contexts/NotificationContext";

const Login = () =>{
  const { addNotification } = useNotificationContext();

    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
      email: false, 
      password : false, 
      serverErr:false
     
    })
  
//Handles the log in process
    const onLoginHandler = (e) =>{
        e.preventDefault();
       

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        
        if(errors.email ==false && errors.password ==false){

          authService.login(email,password)
          .then((authData)=>{
            addNotification('Successfull login!', types.info)
              login(authData)
              navigate('/catalog')
          })
          .catch(err=>{
              console.log(err);
          setErrors(state => ({...state, serverErr: err}))


          })
        }else{
          return
        }

    }
 //Handles the validation of the form and updating state   
    const changeHandler = (e) => {
      let currentValue = e.target.value;
      let field = e.target.name
      if(field==="email"){
        if (validateEmail(currentValue)) {
          setErrors(state => ({...state, email: false}))
          setErrors(state => ({...state, serverErr: false}))     
        } else {
          setErrors(state => ({...state, email: 'This field should be a valid email'}))
        }
      }else if(field==="password"){
        if (validatePassword(currentValue)) {
          setErrors(state => ({...state, password: false}))
          setErrors(state => ({...state, serverErr: false}))
        } else {
          setErrors(state => ({...state, password: 'The password should be between 3 and 20 characters'}))           
        }
      }
    }
    return (
      <div className="login-form">

        <Form  onSubmit={onLoginHandler} method="POST">
    <Row className="mb-3">
    <Alert variant="danger" show={errors.serverErr}>{errors.serverErr}</Alert>

    <Form.Group className="mb-2" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email" placeholder="Enter email" onChange={changeHandler} required />
      <Alert variant="danger" show={errors.email}>{errors.email}</Alert>

      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" placeholder="Password" onChange={changeHandler} required />
      <Alert variant="danger" show={errors.password}>{errors.password}</Alert>

    </Form.Group>
    </Row>
    <Button variant="secondary" type="submit">
      Login
    </Button>
  </Form>
      </div>


)
}







export default Login;