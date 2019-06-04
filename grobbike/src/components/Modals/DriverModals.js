import React, { Component } from 'react';
import GrobMap from '../GrobMap'
import L from 'leaflet';
// import Passenger from '../Images/Passenger.png'
class DriverModals extends Component {
  
    render() {
        const {accept,cancel,guestPhoneNumber,distance,fakeLocation,guestFromLocation,guestToLocation} = this.props;
        return (
            <div>
                <div className="modal fade" id="bookingReceive" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title text-black" id="exampleModalLabel">Thông tin khách hàng</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body p-5">
        <div className="form-group row">
          <div className="col-md-12">
            <p>Số điện thoại: {guestPhoneNumber}</p>
            <p>Quãng đường: {distance}</p>
            <p>Giá cước: {distance*5000} vnđ</p>
            <input onClick={()=>{
            accept();
            var modal = document.getElementById('bookingReceive');
            modal.classList.toggle('show');
            modal.style.display = 'none';
            }
            } name="Nhận cuốc" type="submit" className="btn btn-block btn-primary text-white py-3 px-5" defaultValue="Nhận cuốc" />
           
           
            <input onClick={()=>{
            cancel();
            var modal = document.getElementById('bookingReceive');
            modal.classList.toggle('show');
            modal.style.display = 'none';
            }
            } name="Hủy cuốc" type="submit" className="btn btn-block btn-primary text-white py-3 px-5" defaultValue="Hủy cuốc" />
          </div>
          <GrobMap guestFromLocation= {guestFromLocation} guestToLocation={guestToLocation} fromLocation={guestFromLocation}/>

        </div>
        <div className="form-group row">
          <div className="col-md-6 ml-auto">
            
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

export default DriverModals;