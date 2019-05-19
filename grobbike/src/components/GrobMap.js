import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import Routing from './ReactLeaflet/Routing'
class GrobMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      fromLocation : null,
      toLocation : null,
      isMapInit: false
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
    console.log(this.map);
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
        </Marker> && isMapInit && <Routing from={fromLocation} to={[toLocation.lat,toLocation.lng]} map={this.map}/>}
      }
      </LeafletMap>
    );
  }
}
export default GrobMap;