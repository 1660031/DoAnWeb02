import React, { Component } from 'react';
import GrobMap from '../GrobMap'
import DriverMap from '../Map/DriverMap'

import L from 'leaflet';
// import Passenger from '../Images/Passenger.png'
class BookingReceived extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time:15,
      isAccept:null,
    } 
  }
  hideModal = () => {
    var modal = document.getElementById('bookingReceived');
    modal.classList.toggle('show');
    modal.style.display = 'none';
  }
  startTimer = ()=>{
    const {cancel} = this.props;
      var i = 0 ;
      var interval = setInterval(()=>{
        if(i===15) clearInterval(interval)
          else{
            this.setState({time:15 - ++i});
          }},1000)
          setTimeout(()=>{
            if(this.state.isAccept !== true)
            {this.hideModal();
            cancel();}
          },16000);
  }
    render() {
        const {isAccept} = this.state;
        const {setToLocation,toLocation,accept,cancel,guestPhoneNumber,distance,fakeLocation,guestFromLocation,guestToLocation} = this.props;
        return (
            <div>       
               <div style={{height:"99%"}} className="modal fade" id="bookingReceived" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div  style={{marginTop:"6%"}}  className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body p-5">
              <div className="form-group row">
              <div className="col-12 text-center">
                <h2 style={{color:"black",marginBottom:"20px"}}>Thông tin chuyến</h2>
              </div>
                <div className="col-6">
                  <p>Số điện thoại: {guestPhoneNumber}</p>
                  <p>Quãng đường: {distance} KM</p>
                  <p>Giá cước: {distance*2000} VNĐ</p>
                  <p>Lộ trình:</p>
                </div>
                {isAccept === null && <div className="col-6">
                <div>
                  <button onClick={()=>{
                  cancel();
                  this.hideModal();
                  }
                  } type="button" style={{width: "100%"}} class="btn btn-danger">Hủy chuyến</button>
                    </div>
                  <div className="text-center">
                    <h1  style={{marginTop: "0.5rem"}} className="text-black">{this.state.time}s</h1>
                </div>
                <div>
                  <button onClick={()=>{
                  accept(()=>this.setState({isAccept : true }));
                  }
                  }type="button" style={{width: "100%"}} className="btn btn-success text-white">Nhận chuyến</button></div>
                  
                </div>}
                {/* <GrobMap toLocation={toLocation} setToLocation={setToLocation} guestFromLocation= {guestFromLocation} guestToLocation={guestToLocation} fromLocation={toLocation}/> */}
                <DriverMap location={this.props.toLocation} guestFromLocation= {guestFromLocation} guestToLocation={guestToLocation} center={guestFromLocation}/>

              </div>
              <div className="form-group row">
                <div className="col-6 ml-auto">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
                
            </div>
        );
    }
}

export default BookingReceived;