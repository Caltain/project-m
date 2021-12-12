import { useContext, useState } from "react";
import { Form, Button, Alert, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService"
import { validateEmail,validatePassword,validateRepeatedPassword } from "../../helpers/FormValidationHelper";


const Register = () =>{
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)
    const [errors, setErrors] = useState({
      email: false, 
      password : false,
      repeatPassword:false, 
      serverErr:false
     
    })
    const registerSubmitHandler = (e) =>{
        e.preventDefault()
    

    let { email, password, repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));
    if (validateRepeatedPassword(password,repeatPassword)){
   
      setErrors(state => ({...state, serverErr: "The passwords you have entered do not match"}))
      return
    }
    if(
      errors.email == false 
      && errors.password == false 
      && errors.repeatPassword == false 
      && errors.serverErr == false
      ){
        try {
          authService.register(email, password)   
            .then(authData => {
                login(authData);
                
                navigate('/');
            })
        } catch (error) {
          console.log(error);
          setErrors(state => ({...state, serverErr: error}))
          return
        }
    
          }else{
            return
          }
        }

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
              setErrors(state => ({...state, password: 'The password should be between 3 and 20 characters!'}))           
            }
          }else if(field==="repeatPassword"){
            if (validatePassword(currentValue)) {
              setErrors(state => ({...state, repeatPassword: false}))
              setErrors(state => ({...state, serverErr: false}))
            } else {
              setErrors(state => ({...state, repeatPassword: 'The password should be between 3 and 20 characters!'}))           
            }
          }
        }

  return(
    <div className="register-form">
    <Form  onSubmit={registerSubmitHandler} method="POST">
    <Row className="mb-3">

    <Alert variant="danger" show={errors.serverErr}>{errors.serverErr}</Alert>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email" placeholder="Enter email" onChange={changeHandler} required />
      <Alert variant="danger" show={errors.email}>{errors.email}</Alert>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" placeholder="Password"  onChange={changeHandler} required/>
      <Alert variant="danger" show={errors.password}>{errors.password}</Alert>

    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Repeat password</Form.Label>
      <Form.Control type="password" name="repeatPassword" placeholder="Repeat password"  onChange={changeHandler} required/>
      <Alert variant="danger" show={errors.repeatPassword}>{errors.repeatPassword}</Alert>

    </Form.Group>
    </Row>

    <Button variant="secondary" type="submit">
      Register
    </Button>
  </Form>

    </div>
  )
}
export default Register;
