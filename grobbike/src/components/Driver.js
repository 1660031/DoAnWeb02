import React, { Component } from 'react';
import io from 'socket.io-client'
import DriverMap from './Map/DriverMap'
import BookingReceived from './Modals/BookingReceived'
import Switch from './Switch'
import { connect } from "react-redux";
import { timingSafeEqual } from 'crypto';
class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location : null,
      passFromLocation : null,
      passToLocation : null,
      passPhoneNumber:null,
      id : this.props.info.sdt,
      info:{
        name: this.props.info.name,
        bikeModel : this.props.info.typeBike,
        bikeNumber :this.props.info.bsxe,
      },
      distance :0,
      toLocation : null,
      isOn : false,
    } 
    this.socket =io('http://localhost:5000/')
  }
  setInfo = (id,info)=>{
    console.log("drrrrrr");
    this.setState({id,info});
  }
  accept = (setIsAccept) =>{
    var arrayLocationDemo = [{lat: 10.905796071399191, lng: 106.64445877075197},{lat: 10.900907759322783, lng: 106.64548873901369},{lat: 10.893322288474875, lng: 106.64669036865236},{lat: 10.889613765710976, lng: 106.64772033691408},{lat: 10.887085200985112, lng: 106.64823532104494},{lat: 10.882365156075197, lng: 106.6490936279297},{lat: 10.876633572472699, lng: 106.6494369506836},{lat: 10.871576201329997, lng: 106.6497802734375},{lat: 10.86618157761252, lng: 106.64995193481447},{lat: 10.861292615648194, lng: 106.6497802734375},{lat: 10.856066395380532, lng: 106.64085388183595},{lat: 10.853031773914243, lng: 106.63501739501955},{lat: 10.841609519698082, lng: 106.61431074142457},{lat: 10.836425105418721, lng: 106.60856008529663},{lat: 10.83457049638757, lng: 106.60714387893678},{lat: 10.83307415572659, lng: 106.6088390350342},{lat: 10.82997607453357, lng: 106.61437511444093},{lat: 10.828089812124691, lng: 106.61713242530824},{lat: 10.826669838592334, lng: 106.61672472953798},{lat: 10.8265472, lng: 106.6172416},{lat: 10.828321643898985,lng: 106.61953568458559},{lat: 10.827483887321893, lng: 106.62352681159975},{lat: 10.827194096765577, lng: 106.62514686584474},{lat: 10.825876863431303, lng: 106.62626266479494},{lat: 10.82193566671354, lng: 106.62995338439943},{lat: 10.820449801022184, lng: 106.63054347038269},{lat: 10.819248457419096, lng: 106.62873029708864}];
    const {info,id} = this.state;
    var driverCame = false;
    console.log("accept");
    this.setState({isOn:false});
    setIsAccept();
    this.socket.emit('confirm',{id : id ,accept:true,passenger: this.state.passPhoneNumber});
    var i = 0;
          var interval = setInterval(()=>
          {
            if(i === arrayLocationDemo.length) {
              this.socket.emit('driver_on',{id : id ,location:{lat: this.state.passToLocation[0],lng : this.state.passToLocation[1]},info : info});
              this.setState({passFromLocation : this.state.passToLocation,toLocation:this.state.passToLocation});

              clearInterval(interval);}
            else {
              if(arrayLocationDemo[i].lat === this.state.passFromLocation[0] &&arrayLocationDemo[i].lng === this.state.passFromLocation[1]) driverCame = true;
              if(driverCame===true)
              this.setState({passFromLocation : [arrayLocationDemo[i].lat,arrayLocationDemo[i].lng]});

              this.socket.emit('driver_on',{id :id ,location:arrayLocationDemo[i],info :info});
              this.setState({toLocation :arrayLocationDemo[i++]});
          }
          }
          ,1500);
  }
  complete = () =>{
    const {info,id}=this.state;
    console.log("complete");
    this.socket.emit('complete',{driver : id ,complete :true,passenger: this.state.passPhoneNumber});
    alert("Chuyến đi đã hoàn thành!!!");
    setTimeout(()=>window.location.href = "/driver",2000);
  }
  cancel = () =>{
    const {id}=this.state;
    console.log("cancel");
    this.socket.emit('complete',{driver :id,complete :false,passenger: this.state.passPhoneNumber});
  }
  refuse = () =>{
    const {id}=this.state;
    console.log("refuse");
    this.socket.emit('confirm',{id :id ,accept:false,passenger: this.state.passPhoneNumber});
  }
  sendLocation = () => {
    console.log("sendddddd");
    const {info,id}=this.state;
    const {driverModal}=this.refs;
    const {toLocation,location} = this.state;
    var fakeLocation ={lat: 11.889189040934856, lng: 108.47917556762697};
    this.socket.emit('driver_on',{id : id ,location:this.state.toLocation,info : info});
    this.setState({isOn:true});

    var interval = setInterval(()=>{
      console.log(this.state.isOn)
      if(this.state.isOn === false) clearInterval(interval);
      this.socket.emit('driver_on',{id : id,location:this.state.toLocation,info : info})},3000);
    // setInterval(()=>this.socket.emit('driver_on',{id :"driver001" ,location:{lat : location[0],lng : location[1]}}),10000);
    this.socket.on(id ,(info)=>{
      console.log(info);
          this.setState({
            distance : info.distance ,
            passPhoneNumber : info.phoneNumber,
            passToLocation : [info.toLocation.lat,info.toLocation.lng],
            passFromLocation : [info.fromLocation.lat,info.fromLocation.lng],
          });
          setTimeout(()=>{
          var modal = document.getElementById('bookingReceived');
          modal.classList.add('show');
          modal.style.display = 'block';
          driverModal.startCountDown();
          
          },1000);

    })
  }
  setToLocation = (location) =>{
    var toLocation = this.state.toLocation;
    if(toLocation) this.setState({toLocation:null});
    else this.setState({toLocation: location});
  }
  componentDidMount() {
    const {id} = this.state;

    window.onbeforeunload=this.socket.emit('driver_on',{id :id,location:null});
    navigator.geolocation.watchPosition((pos)=>{
      this.setState({
        location:[pos.coords.latitude,pos.coords.longitude],
       });
  });
}
stopDriving =() =>{
  const {id} = this.state;
  this.setState({isOn:false});
  setTimeout(()=>this.socket.emit('driver_on',{id :id,location:null}));

}
    render() {
       console.log(this.state.info);
      const {toLocation,passPhoneNumber,distance,location,passFromLocation,passToLocation} = this.state;
      console.log(toLocation)
        return (
  <div className="container-fluid">
      <Switch click={this.state.isOn ? this.stopDriving : this.sendLocation}/>
    <BookingReceived ref="driverModal" cancel={this.cancel} complete={this.complete} accept={this.accept} refuse = {this.refuse} passPhoneNumber={passPhoneNumber} distance ={distance} passFromLocation= {this.state.passFromLocation} passToLocation={passToLocation} toLocation={this.state.toLocation}/>
   <DriverMap location={location} toLocation={this.state.toLocation} setToLocation={this.setToLocation} center={location}/>
  </div>
        );
    }
}

const mapStateToProps = state => ({
  info: state.auth.user
});
export default connect(
  mapStateToProps
)(Driver);