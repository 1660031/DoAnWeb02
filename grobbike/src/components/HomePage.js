import React, { Component } from 'react';
import Header from './Header';
import Guest from './Guest';
import Footer from './Footer';
import Driver from './Driver';
import Modals from './Modals';
import  "./CSS/style.css";
import { BrowserRouter as Router, Route,Redirect, Link } from "react-router-dom";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isDriver:null,
        }
    }
    setIsDriver = (isDriver) =>{
      this.setState({isDriver});
    }
    render() {
        const {isDriver} =this.state;
        console.log(isDriver);
        return (
          <Router>
            <body style={{overflowX :"hidden"}}>
            <div className="site-wrap"  id="home-section">
            <Header/>
            <Modals isDriver={isDriver} setIsDriver={this.setIsDriver}/>
            <Route path="/driver" component={Driver} />
            <Route path="/" exact component={Guest} />
            <Footer/>
            </div>
            </body>
            </Router>
        );
    }
}

export default HomePage;