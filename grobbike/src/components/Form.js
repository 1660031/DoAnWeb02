import React, { Component } from 'react';
import Modals from './Modals';
import * as api from './Api'
import Routing from './ReactLeaflet/Routing'

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSearch:null,
      selectedAddressIndex : null,
    }
    this.setListSearch = this.setListSearch.bind(this);
    this.selectedAddressBackground = this.selectedAddressBackground.bind(this);
    this.selectedAddressColor = this.selectedAddressColor.bind(this);
    this.setSelectedAddressIndex = this.setSelectedAddressIndex.bind(this);
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
  setToLocation(value){
    var toLocation = this.props.toLocation;
    if(toLocation) this.props.setToLocation(null);
    else this.props.setToLocation({lat:Number(value.lat),lng:Number(value.lon)})
  }
    render() {
        const address=this.refs.address;
        const listSearch=this.state.listSearch;
        const {fromLocation} = this.props;
        const toLocation =this.props.toLocation;
        return (
          <div style={{padding:"20px 20px 10px 20px",background:"black"}}>
            <form action="#" method="get">
          <div className="form-group row">
            <div className="col-md-6">
              <input ref="address"name="q" type="text" className="form-control" placeholder="Chọn trong bản đồ hoặc nhập địa chỉ cần đến" />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="toggle-button align-items-center d-flex">
              <a href="#" onClick={()=>api.getToLocation(address.value,this.setListSearch)} className="btn btn-primary py-3 px-5">Tìm kiếm</a>
              </div>
            </div>
          </div>
        </form>
        {listSearch && <ul id="listSearch">
         { 
           listSearch.map((value,key)=><li style = {{background : this.selectedAddressBackground(key),
                                                    color:this.selectedAddressColor(key)}}
           onClick={()=>{this.setSelectedAddressIndex(key);
                        this.setToLocation(value);
           }} 
           key={key}>{value.display_name}</li>)
         }
        </ul>}
        <a href="#" className="btn btn-primary py-3 px-5" data-toggle="modal" data-target="#completeCharge">Đặt xe</a>
<Modals/>
           </div>
        );
    }
}

export default Form;