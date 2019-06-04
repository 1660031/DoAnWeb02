import {MapLayer,withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import pass from  '../Images/Passenger.png'

class RoutingMachine extends MapLayer {
  
  createLeafletElement() {
    //   var marker = L.icon({
    //     iconUrl: pass,  
    //     iconSize:[90, 90], // size of the icon
    // });
    
    const {setDisTime,map, from,to,route,color } = this.props;
    console.log(to);
    var start = L.latLng(from[0],from[1]);
    var goal = L.latLng(to[0],to[1]);
    if (route) route.remove(map);
    let leafletElement = L.Routing.control({
      waypoints: [
        start,
        goal,
    ],
      lineOptions: { styles: [{color: color,opacity:1}] },
      createMarker: (i,wp) => { return L.marker(wp.latLng, {
        draggable: false,
        })},
      })
    .addTo(map.leafletElement).on('routesfound', function (e) {
      // distance = e.routes[0].summary.totalDistance;
      // min = e.routes[0].summary.totalTime;
      if(setDisTime) {setDisTime(Math.round(e.routes[0].summary.totalDistance/1000 * 1000)/1000 ,e.routes[0].summary.totalTime);}
});
    this.props.setRoute(leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(RoutingMachine);
