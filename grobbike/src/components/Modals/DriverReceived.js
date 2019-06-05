import React, { Component } from 'react';

class DriverReceived extends Component {
    hideModal = () => {
        var modal = document.getElementById('driverReceived');
        modal.classList.toggle('show');
        modal.style.display = 'none';
      }
    render() {
        return (
            <div className="modal fade" id="driverReceived" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content text-black">
      <div className="modal-body p-5">
        <div className="form-group row">
        <div className="col-12 text-center">
          <h4 style={{color:"black",marginBottom:"20px"}}>Châu Hoàng Ấn đang đón bạn</h4>
        </div>
        <div style={{marginBottom:"20px"}} className="col-12 text-center">
        <img style={{width:"40%"}} src="https://placebeard.it/640x360" class="rounded-circle" alt="Cinque Terre"/>
          </div>
          <div className="col-6 mb-4 mb-lg-0">
            <p>Họ tên:</p>
            <p />
          </div>
          <div className="col-6">
            <p>Số điện thoại: </p>
            <p />
          </div>
          <div className="col-6">
            <p>Hiệu xe: </p>
            <p />
          </div>
          <div className="col-6">
            <p>Biển số: </p>
            <p />
          </div>
          <div className="col-6">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        );
    }
}

export default DriverReceived;