import React, { Component } from 'react';
import io from 'socket.io-client'
import DriverMap from './Map/DriverMap'
import BookingReceived from './Modals/BookingReceived'
import { timingSafeEqual } from 'crypto';
class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location : null,
      passFromLocation : null,
      passToLocation : null,
      passPhoneNumber:null,
      id :null,
      info:{
        name: "Ragnar Lothbrok",
        bikeModel : "Super Dream",
        bikeNumber :"8263",
      },
      distance :0,
      toLocation : null,
    } 
    this.socket =io('http://localhost:8080/')
    this.socket.on('server_send_location',(location)=>{
      var toLocation = this.props.toLocation;
    if(toLocation) this.props.setToLocation(null);
    else this.props.setToLocation(location[0].location);
    })
  }
  accept = (setIsAccept) =>{
    const {id}=this.refs;
    console.log("accept");
    setIsAccept();
    this.socket.emit('confirm',{id :id.value ,accept:true,passenger: this.state.passPhoneNumber});
  }
  complete = () =>{
    const {id}=this.refs;
    console.log("complete");
    this.socket.emit('complete',{driver :id.value ,complete :true,passenger: this.state.passPhoneNumber});
  }
  cancel = () =>{
    const {id}=this.refs;
    console.log("cancel");
    this.socket.emit('complete',{driver :id.value ,complete :false,passenger: this.state.passPhoneNumber});
  }
  refuse = () =>{
    const {id}=this.refs;
    console.log("refuse");
    this.socket.emit('confirm',{id :id.value ,accept:false,passenger: this.state.passPhoneNumber});
  }
  sendLocation = () => {
    const {id,driverModal}=this.refs;
    const {toLocation,location} = this.state;
    var fakeLocation ={lat: 11.889189040934856, lng: 108.47917556762697};
    this.socket.emit('driver_on',{id :id.value ,location:this.state.toLocation,info : this.state.info});
    setInterval(()=>this.socket.emit('driver_on',{id :id.value ,location:this.state.toLocation,info : this.state.info}),3000);
    // setInterval(()=>this.socket.emit('driver_on',{id :"driver001" ,location:{lat : location[0],lng : location[1]}}),10000);
    this.socket.on(id.value,(info)=>{
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
    // window.onbeforeunload=this.socket.emit('driver_on',{id :this.state.id,location:null});
    navigator.geolocation.watchPosition((pos)=>{
      this.setState({
        location:[pos.coords.latitude,pos.coords.longitude],
       });
  });
  // var modal = document.getElementById('bookingReceived');
  // setTimeout(()=>{
  // modal.classList.add('show');
  // modal.style.display = 'block';
  // },1000);
}
    render() {
      // var fakeLocation ={lat: 11.889189040934856, lng: 108.47917556762697};
      const {toLocation,passPhoneNumber,distance,location,passFromLocation,passToLocation} = this.state;
      console.log(toLocation)
        return (
            <div className="site-section-cover overlay img-bg-section" style={{backgroundImage: 'url("")'}}>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-12 col-lg-12">
        <form action="#" method="post">
          <div className="form-group row">
            <div className="col-lg-6">
              <div className="toggle-button align-items-center d-flex">
              <input ref="id" type="text" className="form-control" placeholder="Nhập id" />
                <a onClick={()=>{this.sendLocation();}}
                 href="#" className="btn btn-primary py-3 px-5">Bắt đầu nhận cước từ khách</a>
                <a href="#" className="site-menu-toggle p-5 js-menu-toggle text-black d-inline-block d-lg-none d-flex">
                  <span className="icon-menu h3 m-0" />
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <BookingReceived ref="driverModal" cancel={this.cancel} complete={this.complete} accept={this.accept} refuse = {this.refuse} passPhoneNumber={passPhoneNumber} distance ={distance} passFromLocation= {passFromLocation} passToLocation={passToLocation} toLocation={this.state.toLocation}/>
  <DriverMap location={location} toLocation={this.state.toLocation} setToLocation={this.setToLocation} center={location}/>
</div>

        );
    }
}

export default Driver;