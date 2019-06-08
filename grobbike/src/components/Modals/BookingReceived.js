import React, { Component } from 'react';
import DriverMap from '../Map/DriverMap'

import L from 'leaflet';
class BookingReceived extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDownTime:15,
      time:0,
      isAccept:null,
      isComplete:null,
    } 
  }
  hideModal = () => {
    var modal = document.getElementById('bookingReceived');
    modal.classList.toggle('show');
    modal.style.display = 'none';
  }
  startCountDown = ()=>{
    const {refuse} = this.props;
      var i = 0 ;
      var interval = setInterval(()=>{
        if(i===15 || this.state.isAccept===true) clearInterval(interval)
          else{
            this.setState({countDownTime:15 - ++i});
          }},1000)
          setTimeout(()=>{
            if(this.state.isAccept !== true)
            {this.hideModal();
            refuse();}
          },16000);
  }
  startTimer = ()=>{
      var interval = setInterval(()=>{
        if(this.state.isComplete) clearInterval(interval)
          else{
            this.setState({time:this.state.time + 1});
          }},1000)
  }
    render() {
        const {isAccept,time} = this.state;
        var hour = Math.floor(time/3600);
        var minute = Math.floor(time/60);
        const {setToLocation,toLocation,complete,cancel,accept,refuse,passPhoneNumber,distance,fakeLocation,passFromLocation,passToLocation} = this.props;
        return (
            <div>       
               <div style={{height:"99%"}} className="modal fade" id="bookingReceived" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div  style={{marginTop:"6%"}}  className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div style={{top:"20px"}} className="modal-content">
            <div className="modal-body p-5">
              <div className="form-group row">
              <div className="col-12 text-center">
                <h2 style={{color:"black",marginBottom:"20px"}}>Thông tin chuyến</h2>
              </div>
                <div className="col-6">
                  <p>Số điện thoại: {passPhoneNumber}</p>
                  <p>Quãng đường: {distance} KM</p>
                  <p>Giá cước: {distance*2000} VNĐ</p>
                  <p>Lộ trình:</p>
                </div>
                {isAccept === null && <div className="col-6">
                <div>
                  <button onClick={()=>{
                  refuse();
                  this.hideModal();
                  }
                  } type="button" style={{width: "100%"}} class="btn btn-danger">Từ chối chuyến</button>
                    </div>
                  <div className="text-center">
                    <h1  style={{marginTop: "0.5rem"}} className="text-black">{this.state.countDownTime}s</h1>
                </div>
                <div>
                  <button onClick={()=>{
                  accept(()=>this.setState({isAccept : true }));
                  this.startTimer();
                  }
                  }type="button" style={{width: "100%"}} className="btn btn-success text-white">Nhận chuyến</button></div>
                </div>}
                {isAccept === true &&<div className="col-6">
                <div>
                  <button onClick={()=>{
                    cancel();
                  }
                  } type="button" style={{width: "100%"}} class="btn btn-danger">Hủy chuyến</button>
                  
                    </div>
                  <div className="text-center">
                    <h1  style={{marginTop: "0.5rem"}} className="text-black">{hour > 9 ? hour : ('0' + hour)}:{(minute - hour*60)>9 ? (minute - hour*60) : ('0' + (minute - hour*60)) }:{(time - minute*60)>9 ? (time - minute*60) : ('0' + (time - minute*60)) }</h1>
                </div>
                <div>
                  <button onClick={()=>{
                  complete();
                  this.setState({isComplete : true });
                  }
                  }type="button" style={{width: "100%"}} className="btn btn-success text-white">Hoàn thành chuyến</button></div>
                </div>}
                {/* <GrobMap toLocation={toLocation} setToLocation={setToLocation} passFromLocation= {passFromLocation} passToLocation={passToLocation} fromLocation={toLocation}/> */}
                <DriverMap   location={this.props.toLocation} passFromLocation= {passFromLocation} passToLocation={passToLocation} center={passFromLocation}/>

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