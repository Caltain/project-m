import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Navbar,Container,Nav } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {

  const {user} = useContext(AuthContext)
    let guestNavigation = (
        <> 
        <Nav className="me-auto">

            <Nav.Link to="/catalog" as={Link}>Catalog</Nav.Link>      
            <Nav.Link to="/login" as={Link}>Login</Nav.Link>
            <Nav.Link to="/register" as={Link} >Register</Nav.Link>

         </Nav>
        </>
       
    );

    let userNavigation = (
        <>
            <Nav.Link>Wellcome {user.email}!</Nav.Link>
            {user.email === "peter@abv.bg"
            ?<Nav.Link to="/comments" as={Link}>Comments</Nav.Link>
             : ""
             }
            <Nav.Link to="/catalog" as={Link}>Catalog</Nav.Link>
            <Nav.Link to="/create" as={Link}>Create</Nav.Link>
            <Nav.Link to="/my-reservations" as={Link}> My Reservations</Nav.Link>
            <Nav.Link to="/about" as={Link}>About</Nav.Link>
            <Nav.Link to="/logout" as={Link}>Logout</Nav.Link>
        </>
    );
     

    return (
        

        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand to="/" as={Link}>Project-Furniture</Navbar.Brand>
          <Nav className="ms-auto">
              {user.email

         ?userNavigation
        :guestNavigation
              }
          </Nav>
          </Container>
        </Navbar>

    
      
    );
}

export default Header;