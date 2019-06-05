import React, { Component } from 'react';
import GrobMap from '../GrobMap'
import L from 'leaflet';
// import Passenger from '../Images/Passenger.png'
class BookingReceive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time:15,
    } 
  }
  hideModal = () => {
    var modal = document.getElementById('bookingReceive');
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
            this.hideModal();
            cancel();
          },16000);
  }
    render() {
        const {accept,cancel,guestPhoneNumber,distance,fakeLocation,guestFromLocation,guestToLocation} = this.props;
        return (
            <div>
                <div style={{height:"99%"}} className="modal fade" id="bookingReceive" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div  style={{marginTop:"6%"}}  className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-body p-5">
        <div className="form-group row">
        <div className="col-12 text-center">
          <h2 style={{color:"black",marginBottom:"20px"}}>Thông tin chuyến</h2>
        </div>
          <div className="col-6">
            <p>Số điện thoại: {guestPhoneNumber}</p>
            <p>Quãng đường: {distance}</p>
            <p>Giá cước: {distance*5000} vnđ</p>
            <p>Lộ trình:</p>
          </div>
          <div className="col-6">
          <div>
            <button onClick={()=>{
            cancel();
            var modal = document.getElementById('bookingReceive');
            modal.classList.toggle('show');
            modal.style.display = 'none';
            }
            } type="button" style={{width: "100%"}} class="btn btn-danger">Hủy chuyến</button>
              </div>
            <div className="text-center">
              <h1  style={{marginTop: "0.5rem"}} className="text-black">{this.state.time}s</h1>
          </div>
          <div>
            <button onClick={()=>{
            accept();
            var modal = document.getElementById('bookingReceive');
            modal.classList.toggle('show');
            modal.style.display = 'none';
            }
            }type="button" style={{width: "100%"}} className="btn btn-success text-white">Nhận chuyến</button></div>
            
          </div>
          <GrobMap guestFromLocation= {guestFromLocation} guestToLocation={guestToLocation} fromLocation={guestFromLocation}/>
          
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

export default BookingReceive;