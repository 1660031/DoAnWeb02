import React, { Component } from "react";
import Switch from "react-switch";
 
class SwitchExample extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
    this.setState({ checked });
  }
  render() {
    return (
      <label  className="btn btn-outline-light" style={{color:"#dd6b4d"}}onClick={()=>{
      this.props.click()}}>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
        <h4 style={{display:"inline",position: "relative",bottom: "5px",margin:"10px",fontWeight:"bold",fontStyle :"italic"}}>{this.state.checked ? "Ngưng nhận khách" : "Bắt đầu nhận khách"}</h4>
        </label> 
    );
  }
}
export default SwitchExample;