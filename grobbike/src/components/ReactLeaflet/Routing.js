import {MapLayer,withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

class RoutingMachine extends MapLayer {
  createLeafletElement() {
    const {map, from,to } = this.props;
    console.log(map);
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(from[0],from[1]),
        L.latLng(to[0],to[1]),
    ],
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
      altLineOptions: { styles: [{opacity: 0}] },
      createMarker: () => { return null; }
    })
    .addTo(map.leafletElement);

    console.log(leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingMachine);
