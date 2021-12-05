import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService"

const Login = () =>{

    const {login} = useContext(AuthContext)
    const navigate = useNavigate();

    const onLoginHandler = (e) =>{
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        console.log(email);
        console.log(password);

        authService.login(email,password)
        .then((authData)=>{
            console.log(authData);
            login(authData)
            navigate('/catalog')
        })
        .catch(err=>{
            console.log(err);
        })

    }

    return (
      <div className="login-form">

        <Form  onSubmit={onLoginHandler} method="POST">
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
    <Button variant="secondary" type="submit">
      Login
    </Button>
  </Form>
      </div>


)
}







export default Login;