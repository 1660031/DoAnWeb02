import {MapLayer,withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

class RoutingMachine extends MapLayer {
  createLeafletElement() {
    const setDisTime=this.props.setDisTime;
    const {map, from,to,route } = this.props;
    if (route) route.remove(map);
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(from[0],from[1]),
        L.latLng(to[0],to[1]),
    ],
      altLineOptions: { styles: [{opacity: 0}] },
      createMarker: () => { return null; }
    })
    .addTo(map.leafletElement).on('routesfound', function (e) {
      // distance = e.routes[0].summary.totalDistance;
      // min = e.routes[0].summary.totalTime;
      setDisTime(e.routes[0].summary.totalDistance,e.routes[0].summary.totalTime);
});
    this.props.setRoute(leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingMachine);
