import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Routing from './ReactLeaflet/Routing'
import 'leaflet'
import * as api from './Api'
class GrobMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      fromLocation : null,
      toLocation : null,
      isMapInit: false,
      route:null,
      distance:0,
      time:0,
    }
  }
  componentWillMount(){

  }
  addToMarker = (e) => {
    var toLocation=this.state;
    if(toLocation) this.setState({toLocation:null});
    toLocation = e.latlng;
    this.setState({toLocation :toLocation})
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos)=>{
      this.setState({
      fromLocation:[pos.coords.latitude,pos.coords.longitude]
       });
  });
  
 
}
componentDidUpdate(){
  console.log(this.state);
}
saveMap = (map) => {
  this.map = map;
  this.setState({
      isMapInit: true
  })
}
  render() {
    if(this.state.fromLocation) var fromLocation = this.state.fromLocation;
    const toLocation = this.state.toLocation;
    const isMapInit = this.state.isMapInit;
    return (
    <LeafletMap
        ref={this.saveMap}
        center={fromLocation}
        zoom={15}
        onClick={this.addToMarker}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={fromLocation}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
        {toLocation && 
        <Marker position={toLocation}>
          <Popup>
            Popup for any custom information.
          </Popup>
  </Marker> }
  {toLocation && isMapInit && <Routing setDisTime={(dis,time)=>this.setState({distance:dis,time:time})} route={this.state.route} setRoute={(route)=>this.setState({route : route})} from={fromLocation} to={[toLocation.lat,toLocation.lng]} map={this.map}/>}
      }
      </LeafletMap>
    );
  }
}
export default GrobMap;