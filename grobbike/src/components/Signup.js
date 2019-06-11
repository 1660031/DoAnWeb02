import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import { read } from "fs";
import axios from 'axios';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      sdt: "",
      name: "",
      password: "",
      password2: "",
      gender: "",
      typeBike: "",
      bsxe: "",
      imageProduct: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

fileSelectedHandler = event =>{
  this.setState({
    imageProduct: event.target.files[0]
  })
}

fileUploadHandler = event =>{
  const fd = new FormData();
  fd.append('image', this.state.imageProduct, this.state.imageProduct.name)
  axios.post('http://localhost:5000/api/users', fd,{
    onUploadProgress: progressEvent => {
      console.log('Upload progress: ' + (progressEvent.loaded / progressEvent.total*100)+'%')
    }
  })
    .then(res => {
      console.log(res);
    });

}


onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  };

onSubmit = e => {
    e.preventDefault();
    const newUser = {
      sdt: this.state.sdt,
      name: this.state.name,
      gender: this.state.gender,
      password: this.state.password,
      password2: this.state.password2,
      typeBike: this.state.typeBike,
      bsxe: this.state.bsxe,
      imageProduct: this.state.imageProduct.files[0],
      activeUser: false,
      isAdmin: false
    };
this.props.registerUser(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
return (
  <div className="container">
  <div className="col-md-8 mx-auto">
    <h1 className="text-center mb-5">ĐĂNG KÝ</h1>
    <form enctype="multipart/form-data" action = "api/users" onSubmit={this.onSubmit}  >
      <div className="form-group row">
        <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.sdt}
                          {errors.sdtnotfound}
                        </span>
                      </strong>
          <input className="form-control border" onChange={this.onChange}
                  value={this.state.sdt}
                  error={errors.sdt}
                  id="sdt"
                  type="text" placeholder="Số điện thoại" /> 
        </div>
      </div> 
      <div className="form-group row">
        <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.name}
                        </span>
                      </strong>
          <input className="form-control border" onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text" placeholder="Tên đầy đủ" /> 
        </div>
      </div>   
      <div className="form-group row">
        <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.gender}
                        </span>
                      </strong>
        <select id="gender" name="gender" class="form-control border" onChange={this.onChange} value={this.state.gender}
                  error={errors.typeBike}>
          <option value="" disabled selected>Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select> 
        </div>
      </div>        
      <div className="form-group row">
        <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.password}
                        </span>
                      </strong>
          <input className="form-control border" onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password" placeholder="Mật khẩu" /> 
        </div>
      </div>                 
      <div className="form-group row">
        <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.password2}
                        </span>
                      </strong>
        <input className="form-control border" onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password" placeholder="Xác nhận mật khẩu" />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.typeBike}
                        </span>
                      </strong>
        <select id="typeBike" name="typeBike" class="form-control border" onChange={this.onChange} value={this.state.typeBike}
                  error={errors.typeBike}>
          <option value="" disabled selected>Chọn loại xe</option>
          <option value="Wave">Wave</option>
          <option value="Sirius">Sirius</option>
          <option value="SH">SH</option>
          <option value="Dream">Dream</option>
          <option value="Exciter">Exciter</option>
          <option value="Jupiter">Jupiter</option>
          <option value="Vision">Vision</option>
        </select> 
        </div>
      </div>
      <div className="form-group row">
        <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.bsxe}
                        </span>
                      </strong>
          <input className="form-control border" onChange={this.onChange}
                  value={this.state.bsxe}
                  error={errors.bsxe}
                  id="bsxe"
                  type="text" placeholder="Nhập biển số xe" />
        </div>
      </div>
                      <strong>
                        <span className="text-danger">
                        </span>
                      </strong>

      {/* <div className="form-group row">
        <div className="col-md-12">
          <input className="form-control border" onChange={this.fileSelectedHandler}
              id="imageProduct"
              type="file"
              /> 
              <button onClick={this.fileUploadHandler}>Upload</button> 
        </div>
      </div>  */}
      <button className="btn btn-block btn-primary text-white py-3 px-5"> Đăng ký</button>
    </form>
  </div>
</div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Signup));