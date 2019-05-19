import axios from 'axios'
export function getAddress(lat,lon,setAddress) {
    axios.post("https://nominatim.openstreetmap.org/reverse?format=json&lat="+lat + "&lon="+lon, {
        withCredentials: true
      })
    .then(res=>{console.log(res.data);return res.data})
    .then(data=>setAddress(data.display_name))
    .catch(function (error) {
        console.log(error);
    });
}
export function callServer(from,to,distance,time) {
   console.log(from,to,distance,time);
   console.log("oke");

}