import { Form, Button, Row, Col } from "react-bootstrap";




const Create = () => {
    return (
       <div className="create-page">
           <Form>
  <Row className="mb-3">
    <Form.Group  controlId="formGridName">
      <Form.Label>Name of furniture</Form.Label>
      <Form.Control type="text" name="name" placeholder="Enter name of furniture" />
    </Form.Group>

    <Form.Group  controlId="formGridManufacturer">
      <Form.Label>Manufacturer</Form.Label>
      <Form.Control type="text" name = "manufacturer" placeholder="Enter name of manufacturer" />
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridYear">
    <Form.Label>Year</Form.Label>
    <Form.Control placeholder="2021" name = "year" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridColor">
    <Form.Label>Color</Form.Label>
    <Form.Control placeholder="Red, black, white.... " name="color" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridImage">
    <Form.Label>ImageURL</Form.Label>
    <Form.Control placeholder="Copy image URL here" name = "ImageUrl" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control placeholder="Enter description here" as="textarea" rows={3} name="description" />
  </Form.Group>      

  <Button variant="secondary" type="submit">
    Submit
  </Button>
</Form>

       </div>
        
    );
}

export default Create;