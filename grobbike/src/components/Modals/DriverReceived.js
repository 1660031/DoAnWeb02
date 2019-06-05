import React, { Component } from 'react';

class DriverReceived extends Component {
    hideModal = () => {
        var modal = document.getElementById('driverReceived');
        modal.classList.toggle('show');
        modal.style.display = 'none';
      }
    render() {
        const {driverInfo,driverID,distance} = this.props;
        return (
            <div className="modal fade" id="driverReceived" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
    <div className="modal-content text-black">
      <div className="modal-body p-5">
        <div className="form-group row">
          <div style={{top: "40px",left:"2%"}} className="col-6">
            <p>Họ tên:{driverInfo.name}</p>
            <p/>
            <p>Hiệu xe: {driverInfo.bikeModel}</p>
            <p/>
            <p>Biển số: {driverInfo.bikeNumber}</p>
            <p/>
            <p>Quãng đường:{distance} KM</p>
            <p/>
            <p>Giá cước: {distance * 2000} VNĐ</p>
          </div>
          <div style={{marginBottom:"20px"}} className="col-6 text-center">
        <h4 style={{color:"black",marginBottom:"20px"}}>{driverID}</h4>
        <img style={{width:"60%",height:"100%"}} src="https://placebeard.it/640x360" class="rounded-circle" alt="Cinque Terre"/>
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