import React, { Component } from 'react';
import io from 'socket.io-client'
import GrobMap from './GrobMap'
import BookingReceive from './Modals/BookingReceive'
import { timingSafeEqual } from 'crypto';
class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location : null,
      guestFromLocation : null,
      guestToLocation : null,
      guestPhoneNumber:null,
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
  accept = () =>{
    const {id}=this.refs;
    console.log("accept");
    this.socket.emit('accept',{id :id.value ,accept:true,guest: this.state.guestPhoneNumber});
  }
  cancel = () =>{
    const {id}=this.refs;
    console.log("cancel");
    this.socket.emit('accept',{id :id.value ,accept:false,guest: this.state.guestPhoneNumber});
  }
  sendLocation = () => {
    const {id,driverModal}=this.refs;
    const {toLocation,location} = this.state;
    var fakeLocation ={lat: 11.889189040934856, lng: 108.47917556762697};
    setInterval(()=>this.socket.emit('driver_on',{id :id.value ,location:this.state.toLocation}),3000);
    // setInterval(()=>this.socket.emit('driver_on',{id :"driver001" ,location:{lat : location[0],lng : location[1]}}),10000);
    this.socket.on(id.value,(info)=>{
      console.log(info);
          this.setState({
            distance : info.distance ,
            guestPhoneNumber : info.phoneNumber,
            guestToLocation : [info.toLocation.lat,info.toLocation.lng],
            guestFromLocation : [info.fromLocation.lat,info.fromLocation.lng],
          });
          var modal = document.getElementById('bookingReceive');
          setTimeout(()=>{
          modal.classList.add('show');
          modal.style.display = 'block';
          driverModal.startTimer();
          },1000);
    })
  }
  setToLocation = (location) =>{
    var toLocation = this.state.toLocation;
    if(toLocation) this.setState({toLocation:null});
    else this.setState({toLocation: location});
  }
  componentDidMount() {
    navigator.geolocation.watchPosition((pos)=>{
      this.setState({
        location:[pos.coords.latitude,pos.coords.longitude],
       });
  });
  // var modal = document.getElementById('bookingReceive');
  // setTimeout(()=>{
  // modal.classList.add('show');
  // modal.style.display = 'block';
  // },1000);
}
    render() {
      var fakeLocation ={lat: 11.889189040934856, lng: 108.47917556762697};
      const {toLocation,guestPhoneNumber,distance,location,guestFromLocation,guestToLocation} = this.state;
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
                <a onClick={()=>{this.sendLocation();
                  }
                } href="#" className="btn btn-primary py-3 px-5">Bắt đầu nhận cước từ khách</a>
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
  <BookingReceive ref="driverModal" accept={this.accept} cancel = {this.cancel} guestPhoneNumber={guestPhoneNumber} distance ={distance} guestFromLocation= {guestFromLocation} guestToLocation={guestToLocation} fakeLocation={fakeLocation}/>
  <GrobMap toLocation={toLocation} setToLocation={this.setToLocation} fromLocation={location}/>
</div>

        );
    }
}

export default Driver;