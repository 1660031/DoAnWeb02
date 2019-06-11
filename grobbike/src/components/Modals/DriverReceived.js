import React, { Component } from 'react';
import { timingSafeEqual } from 'crypto';

class DriverReceived extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time:0,
    } 
  }
    hideModal = () => {
        var modal = document.getElementById('driverReceived');
        modal.style.display = 'none';
      }
      startTimer = ()=>{
          var interval = setInterval(()=>{
            if(this.props.isComplete) clearInterval(interval)
              else{
                this.setState({time:this.state.time + 1});
              }},1000)
      }
      componentDidMount(){
        this.startTimer();
      }
    render() {
        const {time}=this.state;
        const {driverInfo,driverID,distance,isComplete} = this.props;
        if(isComplete) setTimeout(()=>window.location.href = "/",5000);
        var hour = Math.floor(time/3600);
        var minute = Math.floor(time/60);
        return (
          <div  id="driverReceived" style={{height: "250px",background: "white",marginBottom: "20px",width: "50%",borderRadius:"20px"}} class="container text-black">
            <div class="row">
            <div style={{top: "40px",left:"2%"}} className="col-4">
            <p>Họ tên: {driverInfo.name}</p>
            <p/>
            <p>Hiệu xe: {driverInfo.bikeModel}</p>
            <p/>
            <p>Biển số: {driverInfo.bikeNumber}</p>
            <p/>
            <p>Quãng đường: {distance} KM</p>
            <p/>
            <p>Giá cước: {distance * 2000} VNĐ</p>
          </div>
          <div style={{right:"35px"}} className="col-4 text-center">
        <h4 style={{color:"#26337b",fontWeight:"bold",margin:"10px"}}>{driverID}</h4>
        <img style={{width:"80%",height:"85%",marginBottom:"20px"}} src="https://placebeard.it/640x360" class="rounded-circle" alt="Cinque Terre"/>
          </div>
          <div style={{right:"20px",top:"40px"}} className="col-4 text-center">
                <div>
                  <button type="button" style={{width: "106%",color:"#dd6b4d",fontWeight:"900",fontSize:"1.2rem"}} class="btn btn-outline-light">{isComplete ? "CHUYẾN ĐI ĐÃ KẾT THÚC" : "GROB"}</button>
                    </div>
                  <div style={{margin: "13px 0px"}} className="text-center">
                  <h1  style={{fontSize: "4.5rem"}} className="text-black">{hour > 9 ? hour : ('0' + hour)}:{(minute - hour*60)>9 ? (minute - hour*60) : ('0' + (minute - hour*60)) }:{(time - minute*60)>9 ? (time - minute*60) : ('0' + (time - minute*60)) }</h1>
                </div>
                <div>
                 {isComplete === true ? <button onClick={()=>setTimeout(()=>window.location.href = "/",2000)}type="button" style={{width: "106%"}} className="btn btn-success text-white">Hoàn thành chuyến</button> : <button type="button" style={{width: "106%",color:"#dd6b4d",fontWeight:"900",fontSize:"1.2rem"}} class="btn btn-outline-light">THƯỢNG LỘ BÌNH AN</button>}
                 </div>
          </div>
            </div>
          </div>
        );
    }
}

export default DriverReceived;