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
  }
  accept = (setIsAccept) =>{
    var arrayLocationDemo = [{lat: 10.905796071399191, lng: 106.64445877075197},{lat: 10.900907759322783, lng: 106.64548873901369},{lat: 10.893322288474875, lng: 106.64669036865236},{lat: 10.889613765710976, lng: 106.64772033691408},{lat: 10.887085200985112, lng: 106.64823532104494},{lat: 10.882365156075197, lng: 106.6490936279297},{lat: 10.876633572472699, lng: 106.6494369506836},{lat: 10.871576201329997, lng: 106.6497802734375},{lat: 10.86618157761252, lng: 106.64995193481447},{lat: 10.861292615648194, lng: 106.6497802734375},{lat: 10.856066395380532, lng: 106.64085388183595},{lat: 10.853031773914243, lng: 106.63501739501955},{lat: 10.841609519698082, lng: 106.61431074142457},{lat: 10.836425105418721, lng: 106.60856008529663},{lat: 10.83457049638757, lng: 106.60714387893678},{lat: 10.83307415572659, lng: 106.6088390350342},{lat: 10.82997607453357, lng: 106.61437511444093},{lat: 10.828089812124691, lng: 106.61713242530824},{lat: 10.826669838592334, lng: 106.61672472953798},{lat: 10.8265472, lng: 106.6172416},{lat: 10.828321643898985,lng: 106.61953568458559},{lat: 10.827483887321893, lng: 106.62352681159975},{lat: 10.827194096765577, lng: 106.62514686584474},{lat: 10.825876863431303, lng: 106.62626266479494},{lat: 10.82193566671354, lng: 106.62995338439943},{lat: 10.820449801022184, lng: 106.63054347038269},{lat: 10.819248457419096, lng: 106.62873029708864}];
    const {id}=this.refs;
    var driverCame = false;
    console.log("accept");
    setIsAccept();
    this.socket.emit('confirm',{id :id.value ,accept:true,passenger: this.state.passPhoneNumber});
    var i = 0;
          var interval = setInterval(()=>
          {
            if(i === arrayLocationDemo.length) {
              this.socket.emit('driver_on',{id :id.value ,location:{lat: this.state.passToLocation[0],lng : this.state.passToLocation[1]},info : this.state.info});
              this.setState({passFromLocation : this.state.passToLocation,toLocation:this.state.passToLocation});

              clearInterval(interval);}
            else {
              if(arrayLocationDemo[i].lat === this.state.passFromLocation[0] &&arrayLocationDemo[i].lng === this.state.passFromLocation[1]) driverCame = true;
              if(driverCame===true)
              this.setState({passFromLocation : [arrayLocationDemo[i].lat,arrayLocationDemo[i].lng]});

              this.socket.emit('driver_on',{id :id.value ,location:arrayLocationDemo[i],info : this.state.info});
              this.setState({toLocation :arrayLocationDemo[i++]});
          }
          }
          ,1500);
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
    
    // setInterval(()=>this.socket.emit('driver_on',{id :id.value ,location:this.state.toLocation,info : this.state.info}),3000);
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
            <div className="site-section-cover overlay img-bg-section" style={{minHeight: "200px",backgroundImage: 'url("")'}}>
  <div className="container">
    <div className="row align-items-center" >
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
  <BookingReceived ref="driverModal" cancel={this.cancel} complete={this.complete} accept={this.accept} refuse = {this.refuse} passPhoneNumber={passPhoneNumber} distance ={distance} passFromLocation= {this.state.passFromLocation} passToLocation={passToLocation} toLocation={this.state.toLocation}/>
   <DriverMap location={location} toLocation={this.state.toLocation} setToLocation={this.setToLocation} center={location}/>
</div>

        );
    }
}

export default Driver;