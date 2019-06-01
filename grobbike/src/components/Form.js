import React, { Component } from 'react';
import Modals from './Modals'
import io from 'socket.io-client'
import * as api from './Api'
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber:null,
      listSearch:null,
      selectedAddressIndex : null,
      listenLocation:null,
    } 
    this.sendLocation = this.sendLocation.bind(this);
    this.socket =io('http://localhost:8080/')
    this.setListSearch = this.setListSearch.bind(this);
    this.selectedAddressBackground = this.selectedAddressBackground.bind(this);
    this.selectedAddressColor = this.selectedAddressColor.bind(this);
    this.setSelectedAddressIndex = this.setSelectedAddressIndex.bind(this);
    this.socket.on('server_send_location',(location)=>{
      var toLocation = this.props.toLocation;
    if(toLocation) this.props.setToLocation(null);
    else this.props.setToLocation(location[0].location);
    })
    
}
  sendLocation(){
    const {phoneNumber}=this.refs;
    const toLocation=this.props.toLocation;
    const info={id:phoneNumber.value, toLocation:toLocation};
    this.socket.emit('guest_send_location',info);
    this.setState({listenLocation:this.socket.on(phoneNumber.value,(location)=>{
      console.log(location);
   })});
      
  }
  selectedAddressBackground(key){
      return ((key===this.state.selectedAddressIndex)? 'black' : 'white')
  }
  selectedAddressColor(key){
    return ((key===this.state.selectedAddressIndex)? 'white' : 'black')
}
setSelectedAddressIndex(selectedAddressIndex) {
  this.setState({selectedAddressIndex});
}
  setListSearch(listSearch) {
    this.setState({listSearch});
  }
  setToLocation(location){
    var toLocation = this.props.toLocation;
    if(toLocation) this.props.setToLocation(null);
    else this.props.setToLocation(location)
  }
      render() {
        const {address,phoneNumber}=this.refs;
        const listSearch=this.state.listSearch;
        const {fromLocation,toLocation} = this.props;
        console.log(fromLocation);
        console.log(toLocation);

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
                this.setState({phoneNumber:phoneNumber.value});
api.getToLocation(address.value,this.setListSearch)
}
              }
                
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
        {toLocation && (toLocation[0]!==fromLocation[0] && toLocation[1]!==fromLocation[1]) ? (<a href="#" onClick={()=>this.sendLocation()} className="btn btn-primary py-3 px-5" data-toggle="modal" data-target="#completeCharge">Đặt xe</a>):null}
<Modals/>
           </div>
        );
    }
}

export default Form;