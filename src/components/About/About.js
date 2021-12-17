import { Carousel, Form, Button } from "react-bootstrap";
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import * as commentService from '../../services/commentService';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const user = JSON.parse(localStorage.getItem("user"))

//Google Map component
class SimpleMap extends Component {
  
  constructor(props) {
    super(props);
    this.onCreateCommentHandler=this.onCreateCommentHandler.bind(this)

  }
  static defaultProps = {
    center: {
      lat: 42.654015,
      lng: 23.399013
    },
    zoom: 12
  };
//Handles the comment creation
onCreateCommentHandler(e){

    e.preventDefault();

      let formData = new FormData(e.currentTarget);
      let form = document.getElementById('form')
      let email = formData.get('email');
      let comment = formData.get('comment')

 try {   
   commentService.comment({email,comment},user.accessToken)
   .then(res=>{
    form.reset()
   })
    } catch (error) {
  console.log(error);
  }
}

  
  render() {
    return (
      <section className='about-container'style={{marginTop:"100px"}}>

      <div className='about-child-1' style={{ height: '400px', width: '400px', position:"bottom"}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDIk_2C_M8zpUTnoXZT1LdPzU07vemrROY"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          >
          <AnyReactComponent
            lat={42.654}
            lng={23.399}
            text="My Home"
            />
        </GoogleMapReact>

        <h4>This is where you can find me</h4>
      </div>

 <div id="carousel" style={{ height: '600px', width: '600px'}} >
     <Carousel className='carousel' fade='true'>
       <Carousel.Item className='inner' >
          <img className="d-block w-100 " src="/images/again-me.jpg" alt="Just me"/>
              <Carousel.Caption>
               <h3>This is me</h3>
                <p>My name is Georgy Genchev</p>
             </Carousel.Caption>
       </Carousel.Item>
      <Carousel.Item>
               <img className="d-block w-100" src="/images/me.jpg" alt="Me and my kid"  />
                 <Carousel.Caption>
                   <h3>This is me with my awesome daughter</h3>
                 </Carousel.Caption>
       </Carousel.Item>
   <Carousel.Item style={{height:"600px"}}>
    <img className="d-block w-100" src="/images/me-and-my-wife.jpg" alt="Me and my wife" />

    <Carousel.Caption>
      <h3>Me and my beautiful wife</h3>

    </Carousel.Caption>
       </Carousel.Item>
    </Carousel>
          
   </div>
      <div>
     <Form id="form" onSubmit={this.onCreateCommentHandler} method="POST">  
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>You can give feedback to the admin of this site if you like.</Form.Label>

            <Form.Label>Your email address</Form.Label>
             <Form.Control type="email" name='email'  placeholder="name@example.com" />
         </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
         <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" name='comment' placeholder="Enter your comment here" rows={3} />
      </Form.Group>
         <Button variant="secondary" type="submit" >
          Submit
       </Button >
    </Form>
   </div>
 </section>
    );
  }
}

export default SimpleMap;