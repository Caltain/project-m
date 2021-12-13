import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Carousel } from "react-bootstrap";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const yesIWantToUseGoogleMapApiInternals = true;
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 42.654015,
      lng: 23.399013
    },
    zoom: 16
  };
  
  render() {
    return (
      
      <section className='about-container'style={{marginTop:"100px"}}>

      <div className='about-child-1' style={{ height: '600px', width: '600px'}}>
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
      </div>


     
      <div id="carousel" style={{ height: '600px', width: '600px'}} >
     
      <Carousel className='carousel' fade='true'>
   
       <Carousel.Item className='inner' >

    <img
      
      className="d-block w-100 "
      src="/images/again-me.jpg"
      alt="Just me"
    />
    <Carousel.Caption>
      <h3>This is me</h3>
      <p>My name is Georgy Genchev</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/images/me.jpg"
      alt="Me and my kid"
      />

    <Carousel.Caption>
      <h3>This is me with my awesome daughter</h3>
    
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"600px"}}>
    <img
      
      className="d-block w-100"
      src="/images/me-and-my-wife.jpg"
      alt="Me and my wife"
      />

    <Carousel.Caption>
      <h3>Me and my beautiful wife</h3>

    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
          
      </div>
      </section>
    );
  }
}

export default SimpleMap;