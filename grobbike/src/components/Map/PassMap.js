import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Routing from '../ReactLeaflet/Routing'
import L from 'leaflet'
import 'leaflet'
import des from  '../Images/des.png'
import driver from  '../Images/Driver.png'

class PassMap extends React.Component {
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
    var {toLocation,driverLocation}=this.props;
    !driverLocation && this.props.setToLocation(null);
    toLocation = e.latlng;
    // api.getAddress(e.latlng["lat"],e.latlng["lng"],this.props.setToAddress);
    !driverLocation && this.props.setToLocation(toLocation);
  }

saveMap = (map) => {
  this.map = map;
  this.setState({isMapInit:true});
}
componentDidMount(){
  if(this.props.toLocation === null) this.setState({route:null});

}
  render() {
    var desIcon = L.icon({
      iconUrl: des,
      iconSize:[50, 49], // size of the icon
      iconAnchor:   [26, 43],
    });
  var driverIcon = L.icon({
    iconUrl: driver,
    iconSize:[25, 41], // size of the icon
    iconAnchor:   [12, 50],
  });
    const {driverLocation,toLocation,fromLocation,setDisTime,} = this.props;
    console.log(this.props.driverCame);
    console.log("driver location : ");
    console.log(driverLocation);
    const {listDriver,isMapInit} = this.state;
    console.log(fromLocation);
    console.log(toLocation);
    return (
    <LeafletMap
        ref={this.saveMap}
        center={fromLocation}
        zoom={13}
        minZoom={13}
        maxZoom={13}

        onClick={this.addToMarker}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker  position={this.props.fromLocation}>
          <Popup>
          Vị trí của bạn
          </Popup>
        </Marker>
        {driverLocation && <Marker icon={driverIcon} position={driverLocation}>
          <Popup>
          Vị trí tài xế
          </Popup>
    </Marker>}        
        {(listDriver) && listDriver.map((value,key)=>
            <Marker position={toLocation}>
            <Popup>
              Popup for any custom information.
            </Popup>
        </Marker>)}
        {(toLocation) && <Marker icon={desIcon} position={toLocation}>
          <Popup>
          Vị trí đến
          </Popup>
  </Marker>}
  {!driverLocation && toLocation && isMapInit && <Routing  color="red" setDisTime={setDisTime} route={this.state.route} setRoute={this.setRoute} from={fromLocation} to={[toLocation.lat,toLocation.lng]} map={this.map}/>}

  {driverLocation && fromLocation[0]===driverLocation[0] && fromLocation[1]===driverLocation[1] && isMapInit && <Routing  color="red" setDisTime={setDisTime} route={this.state.route} setRoute={this.setRoute} from={this.props.fromLocation} to={[toLocation.lat,toLocation.lng]} map={this.map}/>}
      </LeafletMap>
    );
  }
}
export default PassMap;