import React from 'react';
import L from 'leaflet';

class GrobMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [10.763838999999999, 106.6563922],
      zoom: 13,
    }
  }
  
  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: this.state.center,
      zoom: this.state.zoom,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
      
    });
    this.layer = L.layerGroup().addTo(this.map);

  }

  render() {
    return <div id="map" style={{height:"400px",width:"100%",margin:"50px"}}>
    </div>
  }
}

export default GrobMap;