import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

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
      // Important! Always set the container height explicitly
      <div style={{ height: '800px', width: '800px', marginRight: "auto",marginLeft: "auto" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDIk_2C_M8zpUTnoXZT1LdPzU07vemrROY"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
        >
          <AnyReactComponent
            lat={42.654015}
            lng={23.399013}
            text="My Home"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;