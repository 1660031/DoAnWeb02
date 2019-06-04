import React, { Component } from 'react';
import GrobMap from './GrobMap'
import Driver from './Images/Driver.png'
import L from 'leaflet';
import io from 'socket.io-client'

import * as api from './Api'
class Guest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber:null,
      listSearch:null,
      selectedAddressIndex : null,
      listenLocation:null,
      fromAddress : null,
      toAddress: null,
      fromLocation : null,
      toLocation : null,
      driverLocation :null,
      route:null,
      distance:0,
      time:0,
      socket : null,
    }
    this.socket =io('http://localhost:8080/');
    this.socket.on('private',(res)=>{

      console.log(res)
    // var toLocation = this.props.toLocation;
    // if(toLocation) this.props.setToLocation(null);
    // else this.state.setToLocation(location[0].location);
    })
}
setDisTime = (dis,time) => {
  this.setState({distance:dis,time:time})
}
setSocket = (socket) =>{
  this.setState({socket});
}
  sendLocation = () => {
    const {phoneNumber}=this.refs;
    const {fromLocation,toLocation,distance}=this.state;
    const info={id:phoneNumber.value, fromLocation:{lat : fromLocation[0], lng : fromLocation[1]},toLocation : toLocation,distance : distance};
    this.socket.emit('guest',info);
    this.socket.on(phoneNumber.value,(res)=>{
      if(res.cancel){
        console.log("tai xe da huy chuyen");
      }
      else{
        console.log(res);
        this.setState({driverLocation : [res.location.lat,res.location.lng]});
        console.log("tai xe da nhan chuyen");
      }
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
        toLocation:[pos.coords.latitude,pos.coords.longitude],
        fromLocation:[pos.coords.latitude,pos.coords.longitude]
       });
  });
}
      render() {
       
        const {address,phoneNumber}=this.refs;
        const {driverLocation,distance,listSearch,fromLocation,toLocation} = this.state;
        // console.log(fromLocation);
        // console.log(toLocation);
        // console.log(distance);
        // if(this.state.driverLocation)var driverLocation = this.state.driverLocation;
        return (
          <div style={{padding:"20px 20px 10px 20px",background:"black"}}>
            <form action="#" method="get">
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
        {toLocation && (toLocation[0]!==fromLocation[0] && toLocation[1]!==fromLocation[1]) ? (<a href="#" onClick={()=>{this.sendLocation()}} className="btn btn-primary py-3 px-5" data-toggle="modal" data-target="#book">Đặt xe</a>):null}
           <GrobMap driverLocation={this.state.driverLocation} setDisTime={this.setDisTime} toLocation={this.state.toLocation} setToLocation={this.setToLocation} fromLocation={this.state.fromLocation}/>
           </div>
        );
    }
}

export default Guest;