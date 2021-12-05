import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService"


const Register = () =>{
    const navigate = useNavigate();
    const {login} = useContext(AuthContext)
    const registerSubmitHandler = (e) =>{
        e.preventDefault()
    

    let { email, password } = Object.fromEntries(new FormData(e.currentTarget));
    
    authService.register(email, password)   
            .then(authData => {
                login(authData);
                
                navigate('/');
            });
        }
  return(
    <div className="register-form">
    <Form  onSubmit={registerSubmitHandler} method="POST">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Repeat password</Form.Label>
      <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" />
    </Form.Group>
    <Button variant="secondary" type="submit">
      Register
    </Button>
  </Form>

    </div>
  )
}
export default Register;
