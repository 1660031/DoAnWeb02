import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      sdt: "",
      password: "",
      errors: {}
    };
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      sdt: this.state.sdt,
      password: this.state.password
    };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
              <div className="container">
              <form onSubmit={this.onSubmit}>
                <div className="col-md-8 mx-auto">
                  <h1 className="text-center mt-5 mb-5">ĐĂNG NHẬP</h1>
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
                          type="sdt" placeholder="Số điện thoại" /> 
                      </div>
                    </div>  
                    <div className="form-group row">
                      <div className="col-md-12">
                      <strong>
                        <span className="text-danger">
                          {errors.password}
                          {errors.passwordincorrect}
                        </span>
                      </strong>
                        <input className="form-control border" onChange={this.onChange}
                          value={this.state.password}
                          error={errors.password}
                          id="password"
                          type="password" placeholder="Mật khẩu" 
                          /> 
                      </div>
                    </div>                 
                    <button className="btn btn-block btn-primary text-white py-3 px-5">Đăng nhập</button>
                </div>
                </form>
              </div>
    );
  }
}


Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);