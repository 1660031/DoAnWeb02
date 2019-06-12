import React, { Component } from 'react';
import PassMap from './Map/PassMap'
import io from 'socket.io-client'
import DriverReceived from './Modals/DriverReceived'

import * as api from './Api'
class Passenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber:null,
      listSearch:null,
      selectedAddressIndex : null,
      fromAddress : null,
      toAddress: null,
      fromLocation : null,
      toLocation : null,
      driverInfo :null,
      driverID: null,
      driverLocation : null,
      distance:0,
      time:0,
      isComplete:null,
    }
    this.socket =io('http://localhost:8080/');
    
}
setDisTime = (dis,time) => {
  this.setState({distance:dis,time:time})
}
  sendLocation = () => {
    const {phoneNumber}=this.refs;
    const {fromLocation,toLocation,distance}=this.state;
    const info={id:phoneNumber.value, fromLocation:{lat : fromLocation[0], lng : fromLocation[1]},toLocation : toLocation,distance : distance};
    this.socket.emit('passenger',info);
    this.socket.on('list_location',(res)=>{
      console.log(res)
    })
    var driverCame = false;
    this.socket.on(phoneNumber.value,(res)=>{
      if(res.accept){
        if(res.accept === false){
          alert("vui lòng thử lại");
          // setTimeout(()=>this.socket.emit('passenger',info),1000);
        }
        else if(res.accept === true){
          console.log(res);
          if(res.location.lat === this.state.fromLocation[0] && res.location.lng === this.state.fromLocation[1]) driverCame = true;
          if(driverCame===true)
          {
            this.setState({fromLocation : [res.location.lat,res.location.lng],driverInfo : res.info, driverID : res.id});
          }
          console.log(driverCame);
          this.setState({driverLocation : [res.location.lat,res.location.lng],driverInfo : res.info, driverID : res.id});
          console.log("tai xe da nhan chuyen");
        }
      } 
      else {
        if(res.complete === true){
          alert("đã hoàn thành chuyến, xin cảm ơn quý khách !!!!!");
          this.setState({isComplete:true});
      }
      else if(res.complete === false){
        alert("tài xế đã hủy chuyến");
        this.setState({isComplete:false});
      }
    }
   });
   this.socket.on("unavailable",(res)=>{
    alert("Vui lòng thử lại!!!");
 });
  }
  selectedAddressBackground = (key) =>{
      return ((key===this.state.selectedAddressIndex)? 'black' : 'white')
  }
  selectedAddressColor = (key) =>{
    return ((key===this.state.selectedAddressIndex)? 'white' : 'black')
  }
  setSelectedAddressIndex = (selectedAddressIndex) =>{
  this.setState({selectedAddressIndex});
  }
  setListSearch = (listSearch) =>{
    this.setState({listSearch});
  }
  setToLocation = (location) =>{
    var toLocation = this.state.toLocation;
    if(toLocation) this.setState({toLocation:null});
    else this.setState({toLocation: location});
  }
  componentDidMount() {
    navigator.geolocation.watchPosition((pos)=>{
      this.setState({
        // toLocation:[pos.coords.latitude,pos.coords.longitude],
        fromLocation:[pos.coords.latitude,pos.coords.longitude]
       });
  });
  // var modal = document.getElementById('driverReceived');
  //   modal.classList.toggle('show');
  //   modal.style.display = 'block';
}
      render() {
        const {address,phoneNumber}=this.refs;
        const {driverInfo,driverID,distance,listSearch,fromLocation,toLocation} = this.state;
        return (
         <div style={{padding:"20px 20px 10px 20px",background:"black"}}>
          <div> {(driverInfo)  ? <DriverReceived ref="passengerModal" isComplete={this.state.isComplete} distance={distance} driverInfo={driverInfo} driverID={driverID} /> 
           : (<div><form action="#" method="get">
          <div className="form-group row">
            <div className="col-md-6">
              <input ref="phoneNumber" type="text" className="form-control" placeholder="Nhập số điện thoại" />
              <input ref="address" type="text" className="form-control" placeholder="Chọn trong bản đồ hoặc nhập địa chỉ cần đến" />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="toggle-button align-items-center d-flex">
              <a href="#" onClick={()=>{
                this.setState({phoneNumber:phoneNumber.value});api.getToLocation(address.value,this.setListSearch)}}
                 className="btn btn-primary py-3 px-5">Tìm kiếm</a>
              </div>
            </div>
          </div>
        </form>
        {listSearch && <ul id="listSearch">
         { 
           listSearch.map((value,key)=><li style = {{background : this.selectedAddressBackground(key),
                                                    color:this.selectedAddressColor(key)}}
           onClick={()=>{console.log(this.props.toLocation);
             this.setSelectedAddressIndex(key);
                        this.setToLocation({lat:Number(value.lat),lng:Number(value.lon)});
                        setTimeout(()=>this.setToLocation({lat:Number(value.lat),lng:Number(value.lon)}),0);
           }} 
           key={key}>{value.display_name}</li>)
         }
          </ul>}
          {toLocation && <a href="#" onClick={()=>{this.sendLocation()}} className="btn btn-primary py-3 px-5" data-toggle="modal" data-target="#book">Đặt xe</a>}
          </div>) }
          </div>
           <PassMap driverLocation={this.state.driverLocation} setDisTime={this.setDisTime} toLocation={this.state.toLocation} setToLocation={this.setToLocation} fromLocation={this.state.fromLocation}/>
           </div>
        );
    }
}

export default Passenger;