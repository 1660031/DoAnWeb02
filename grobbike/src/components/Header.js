import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
    render() {
      const { isAuthenticated, user } = this.props.auth;

      const loginHead = (
        <Fragment>
          <span>
            <strong style={{marginRight: '20px'}} >{user ? `Chào ${user.name}` : ''}</strong>
          </span>
          <button
              onClick={this.onLogoutClick}
              className="btn btn-primary">
              Logout
            </button>
      </Fragment>
      );

      const guestHead = (
        <Fragment>
          <a href="/login" style={{marginRight: '20px'}}>Đăng nhập</a>
          <a href="/signup" className="btn btn-primary">Đăng ký</a>

      </Fragment>
      );
        return (
            <header className="site-navbar js-sticky-header site-navbar-target" role="banner">
            <div className="container">
              <div className="row align-items-center position-relative">
                <div className="site-logo">
                  <a href="/" className="text-black"><span className="text-primary">Grob</span></a>
                </div>
                <div className="col-12">
                  <nav className="site-navigation text-center " role="navigation">
                    <ul className="site-menu main-menu js-clone-nav ml-auto d-none d-lg-block">
                      <li><a href="/" className="nav-link">Trang chủ</a></li>
                    </ul>
                  </nav>
                </div>
                <div className="toggle-button align-items-center d-flex">
                  {isAuthenticated ? loginHead : guestHead}
                </div>
              </div>
            </div>
           
          </header>
          
        );
    }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);