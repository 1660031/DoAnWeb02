import React, { Component } from 'react';

class DriverReceived extends Component {
    hideModal = () => {
        var modal = document.getElementById('driverReceived');
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
        const {driverInfo,driverID,distance} = this.props;
        return (
          <div style={{height: "250px",background: "white",marginBottom: "20px",width: "50%",borderRadius:"20px"}} class="container text-black">
            <div class="row">
            <div style={{top: "40px",left:"2%"}} className="col-4">
            <p>Họ tên: {driverInfo.name}</p>
            <p/>
            <p>Hiệu xe: {driverInfo.bikeModel}</p>
            <p/>
            <p>Biển số: {driverInfo.bikeNumber}</p>
            <p/>
            <p>Quãng đường:{distance} KM</p>
            <p/>
            <p>Giá cước: {distance * 2000} VNĐ</p>
          </div>
          <div style={{right:"35px"}} className="col-4 text-center">
        <h4 style={{color:"black",margin:"10px"}}>{driverID}</h4>
        <img style={{width:"80%",height:"90%"}} src="https://placebeard.it/640x360" class="rounded-circle" alt="Cinque Terre"/>
          </div>
          <div style={{right:"20px",top:"50px"}} className="col-4 text-center">
                <div>
                  <button type="button" style={{width: "100%"}} class="btn btn-danger">Hủy chuyến</button>
                    </div>
                  <div style={{margin: "33px"}} className="text-center">
                    <h1 className="text-black">00:00:00</h1>
                </div>
                <div>
                  <button type="button" style={{width: "100%"}} className="btn btn-success text-white">Hoàn thành chuyến</button></div>
          </div>
            </div>
          </div>
        );
    }
}

export default DriverReceived;