import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Routing from './ReactLeaflet/Routing'
import L from 'leaflet'
import 'leaflet'
import des from  './Images/des.png'
import driver from  './Images/Driver.png'

import * as api from './Api'
class GrobMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapInit: false,
      route:null,
      listDriver : null,
    }
    this.setRoute = this.setRoute.bind(this);
  }
  setRoute(route){
    this.setState({route})
}
  addToMarker = (e) => {
    var {toLocation,setToLocation}=this.props;
    if(toLocation && setToLocation) this.props.setToLocation(null);
    toLocation = e.latlng;
    // api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    if(setToLocation) this.props.setToLocation(toLocation);
  }

saveMap = (map) => {
  this.map = map;
  this.setState({isMapInit:true});
}
  render() {
    var desIcon = L.icon({
      iconUrl: des,
      iconSize:[41, 61], // size of the icon
  });
  var driverIcon = L.icon({
    iconUrl: driver,
    iconSize:[25, 41], // size of the icon
});
    const {driverLocation,toLocation,fromLocation,guestToLocation,guestFromLocation,setDisTime} = this.props;
    console.log("driver location : ");
    console.log(driverLocation);
    const {listDriver,isMapInit} = this.state;
    console.log(fromLocation);
    console.log(toLocation);
    return (
    <LeafletMap
        ref={this.saveMap}
        center={fromLocation}
        zoom={15}
        minZoom={13}
        onClick={this.addToMarker}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker  position={fromLocation}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
        {driverLocation && <Marker icon={driverIcon} position={driverLocation}>
          <Popup>
            Popup for any custom information.
          </Popup>
    </Marker>}
    {/* {driverLocation && <Routing  color="blue" setRoute={this.setRoute} from={driverLocation} to={fromLocation} map={this.map}/> } */}
        {guestToLocation && guestFromLocation
    && <Routing  color="red" setRoute={this.setRoute} from={guestFromLocation} to={guestToLocation} map={this.map}/>}
  }
        {(listDriver) && listDriver.map((value,key)=>
            <Marker position={toLocation}>
            <Popup>
              Popup for any custom information.
            </Popup>
        </Marker>)}
        {(toLocation) && <Marker position={toLocation}>
          <Popup>
            Popup for any custom information.
          </Popup>
  </Marker>}
  {toLocation && isMapInit && <Routing  color="red" setDisTime={setDisTime} route={this.state.route} setRoute={this.setRoute} from={fromLocation} to={[toLocation.lat,toLocation.lng]} map={this.map}/>}
      }
      </LeafletMap>
    );
  }
}
export default GrobMap;