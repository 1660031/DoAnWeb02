import React, { Component } from 'react';
import PassMap from './Map/PassMap'
import io from 'socket.io-client'
import DriverReceived from './Modals/DriverReceived'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import * as api from './Api'

function FormError(props) {
  /* nếu isHidden = true, return null ngay từ đầu */
  if (props.isHidden) { return null;}

  return ( <div style={{marginTop:"5px",
    color: "red",
    fontStyle:"italic",
    fontSize: "15px"}}>{props.errorMessage}</div>)
}
const validateInput = (checkingText) => {
  const regexp = /^\d{10,11}$/;
  const checkingResult = regexp.exec(checkingText);
  if (checkingResult !== null) {
      return { isInputValid: true,
               errorMessage: ''};
  } else {
      return { isInputValid: false,
               errorMessage: 'Số điện thoại phải có 10 - 11 chữ số.'};
  }
}
class Passenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber:null,
      listSearch:null,
      listDriver:null,
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
      isInputValid: true, 
      errorMessage: ''  
    }
    this.socket =io('http://localhost:5000/');
   
}
setDisTime = (dis,time) => {
  this.setState({distance:dis,time:time})
}
  sendLocation = () => {
    const {phoneNumber,fromLocation,toLocation,distance}=this.state;
    const info={id:phoneNumber, fromLocation:{lat : fromLocation[0], lng : fromLocation[1]},toLocation : toLocation,distance : distance};
    this.socket.emit('booking',info);
    
    var driverCame = false;
    this.socket.on(phoneNumber,(res)=>{
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
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
  }
  if(!this.props.auth.user.isAdmin && this.props.auth.isAuthenticated){
  this.props.history.push("/driver");
  }
    navigator.geolocation.watchPosition((pos)=>{
      this.setState({
        toLocation:[pos.coords.latitude,pos.coords.longitude],
        fromLocation:[pos.coords.latitude,pos.coords.longitude]
       });
  });
  
  this.socket.on('list_location',(res)=>{
    console.log(res);
    if(res) this.setState({listDriver : res.listDriver});
  })
}
handleInput = event => {
  const { value } = event.target;
  this.setState({value});
}
handleInputValidation = event => {
  const { isInputValid, errorMessage } = validateInput(this.state.value);
  this.setState({
      isInputValid: isInputValid,
      errorMessage: errorMessage
  })
}
getListDriver = ()=>{
  var interval = setInterval(()=>{
    if(this.state.driverID) clearInterval(interval)
    else this.socket.emit('passenger_on',{id:this.state.phoneNumber})
  },5000);
}
      render() {
        const {address,inputPhoneNumber}=this.refs;
        console.log(this.state.phoneNumber);
        const {driverInfo,driverID,distance,listSearch,fromLocation,toLocation} = this.state;
        return (
         <div style={{padding:"20px 20px 10px 20px",background:"linear-gradient(90deg, rgba(112,49,73,1) 0%, rgba(73,66,147,1) 50%, rgba(0,0,4,1) 100%)",height:"1120px"}}>
         {(this.state.phoneNumber) ? 
         <div> {(driverID)  ? <DriverReceived ref="passengerModal" isComplete={this.state.isComplete} distance={distance} driverInfo={driverInfo} driverID={driverID} /> 
           : (<div><form action="#" method="get">
          <div style={{marginTop: "10px"}} className="form-group row">
            <div className="col-md-6">
              <input ref="address" type="text" className="form-control" placeholder="Chọn trong bản đồ hoặc nhập địa chỉ cần đến" />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="toggle-button align-items-center d-flex">
              <a href="#" onClick={()=>{api.getToLocation(this.refs.address.value,this.setListSearch)}}
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
          {toLocation && toLocation[0] !==fromLocation[0] && toLocation[1] !==fromLocation[1] && <a href="#" onClick={()=>{this.sendLocation()}} style={{marginBottom:"20px"}} className="btn btn-primary py-3 px-5" data-toggle="modal" data-target="#book">Đặt xe</a>}
          </div>) }
          <PassMap listDriver={this.state.listDriver} driverLocation={this.state.driverLocation} setDisTime={this.setDisTime} toLocation={this.state.toLocation} setToLocation={this.setToLocation} fromLocation={this.state.fromLocation}/> 
          </div> :
          <div  className="row" style={{position:"relative",width:"50%",top:"25%",left:"25%",padding:"20px 20px 10px 20px"}}>
          <div className="col-md-8">
          <input 
          onChange={this.handleInput}
          onBlur={this.handleInputValidation}
          style={{width:"100%"}} ref="inputPhoneNumber" type="text" className="form-control" placeholder="Nhập số điện thoại để bắt đầu đặt xe" />
          <FormError
          isHidden={this.state.isInputValid} 
          errorMessage={this.state.errorMessage} />
          </div>
          <div className="col-md-4">
              <div className="toggle-button align-items-center d-flex">
              <a onClick={()=>{
                if(this.state.isInputValid === true)
                {setTimeout(()=>this.getListDriver(),3000);
                this.setState({phoneNumber:inputPhoneNumber.value});
              }
              }}
                 className="btn btn-primary py-3 px-5">Bắt đầu</a>
              </div>
            </div>
          </div>}
           </div>
        );
    }
}


const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Passenger);