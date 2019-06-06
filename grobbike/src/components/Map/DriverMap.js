import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Routing from '../ReactLeaflet/Routing'
import L from 'leaflet'
import 'leaflet'
import des from  '../Images/des.png'
import driver from  '../Images/Driver.png'
import guest from  '../Images/guest.jpg'
class DriverMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapInit: false,
      route:null,
    }
    this.setRoute = this.setRoute.bind(this);
  }
  setRoute(route){
    this.setState({route})
}
  addToMarker = (e) => {
    var {toLocation,setToLocation}=this.props;
    if(setToLocation) this.props.setToLocation(null);
    toLocation = e.latlng;
    // api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    if(setToLocation) this.props.setToLocation(toLocation);
  }

saveMap = (map) => {
  this.map = map;
  this.setState({isMapInit:true});
}
  render() {
    var guestIcon = L.icon({
      iconUrl: guest,
      iconSize:[41, 49], // size of the icon
      iconAnchor:   [19, 44],
    });
    var desIcon = L.icon({
      iconUrl: des,
      iconSize:[50, 49], // size of the icon
      iconAnchor:   [26, 43],
    });
  var driverIcon = L.icon({
    iconUrl: driver,
    iconSize:[25, 41], // size of the icon
    iconAnchor:   [21, 54],
  });
    const {toLocation,center,location,guestToLocation,guestFromLocation,setDisTime} = this.props;
    console.log("driver location : ");
    const {isMapInit} = this.state;
    console.log(toLocation);
    return (
    <LeafletMap
        ref={this.saveMap}
        center={center}
        zoom={13}
        minZoom={13}
        onClick={this.addToMarker}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker  position={location}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
        {guestToLocation && guestFromLocation && <Routing  color="red" setRoute={this.setRoute} from={guestFromLocation} to={guestToLocation} map={this.map}/>}
  {guestToLocation && <Marker icon={desIcon} position={guestToLocation}>
          <Popup>
          Vị trí trả khách
          </Popup>
  </Marker>}
  {guestFromLocation && <Marker icon={guestIcon} position={guestFromLocation}>
          <Popup>
            Vị trí đón khách
          </Popup>
  </Marker>}
        {(toLocation) && <Marker icon={desIcon} position={toLocation}>
          <Popup>
          Vị trí của bạn
          </Popup>
  </Marker>}
  {toLocation && isMapInit && <Routing  color="red" route={this.state.route} setRoute={this.setRoute} from={location} to={[toLocation.lat,toLocation.lng]} map={this.map}/>}

      </LeafletMap>
    );
  }
}
export default DriverMap;