import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Header extends Component {
    render() {
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
                  <a data-toggle="modal" data-target="#signIn" href="#" style={{marginRight: '20px'}}>Đăng nhập</a>
                  <a data-toggle="modal" data-target="#signUp" href="#" className="btn btn-primary">Đăng ký</a>
                </div>
              </div>
            </div>
           
          </header>
          
        );
    }
}

export default Header;