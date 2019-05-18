import React from 'react';
import L from 'leaflet';
import * as api from './Api'
class GrobMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // center: [10.763838999999999, 106.6563922],
      center: [10.763795, 106.65643449999999],
      address: null,
      location : null,
      zoom: 23,
    }

  }
  componentDidMount() {
    // create map
    navigator.geolocation.getCurrentPosition((pos)=>{
       this.setState({
          location:[pos.coords.latitude,pos.coords.longitude]
        });
        this.map = L.map('map', {
          center: this.state.center,
          zoom: this.state.zoom,
          layers: [
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }),
          ]
          
        });
        api.getAddress(this.state.location[0],this.state.location[1],(address)=>this.setState({address}))
        L.marker(this.state.location).addTo(this.map)
        .bindPopup("Vị trí hiện tại")
        .openPopup();
        this.layer = L.layerGroup().addTo(this.map);
    });
  }

  render() {
    console.log(this.state.address);
    return <div id="map" style={{height:"500px",width:"100%",margin:"50px"}}>
    </div>
  }
}

export default GrobMap;