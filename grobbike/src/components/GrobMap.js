import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Routing from './ReactLeaflet/Routing'
import 'leaflet'
import * as api from './Api'
class GrobMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapInit: false,
      distance:0,
      time:0,
      route:null,

    }
    this.setRoute = this.setRoute.bind(this);

  }
  setRoute(route){
    this.setState({route})
}
  addToMarker = (e) => {
    var toLocation=this.props;
    if(toLocation) this.props.setToLocation(null);
    toLocation = e.latlng;
    api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    this.props.setToLocation(toLocation);
  }

saveMap = (map) => {
  this.map = map;
  this.setState({isMapInit:true});
}
  render() {
    const {toLocation,fromLocation} = this.props;
    const isMapInit = this.state.isMapInit;
    console.log(toLocation);
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
        {toLocation && <Marker position={toLocation}>
          <Popup>
            Popup for any custom information.
          </Popup>
  </Marker>}
  {toLocation && isMapInit && <Routing setDisTime={(dis,time)=>this.setState({distance:dis,time:time})} route={this.state.route} setRoute={this.setRoute} from={fromLocation} to={[toLocation.lat,toLocation.lng]} map={this.map}/>}
      }
      </LeafletMap>
    );
  }
}
export default GrobMap;