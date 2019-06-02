import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DriverContent from './DriverContent';
import GrobMap from './GrobMap';
import  "./CSS/style.css";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fromAddress : null,
          toAddress: null,
          fromLocation : null,
          toLocation : null,
          isMapInit: false,
          route:null,
          distance:0,
          time:0,
        }
        this.setToLocation = this.setToLocation.bind(this);
        this.setToAddress = this.setToAddress.bind(this);

    }
    setToLocation(toLocation){
        this.setState({toLocation});
    }
    setToAddress(toAddress){
      this.setState({toAddress});
  }
    componentDidMount() {
        navigator.geolocation.watchPosition((pos)=>{
          this.setState({
            toLocation:[pos.coords.latitude,pos.coords.longitude],
            fromLocation:[pos.coords.latitude,pos.coords.longitude]
           });
      });
    }
    render() {   
        return (
          <Router>
            <body style={{overflowX :"hidden"}} data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
            <div className="site-wrap"  id="home-section">
            <Header/>
            <Route exact path="/driver/" render={props=><DriverContent toLocation={this.state.toLocation} fromLocation={this.state.fromLocation} setRoute={this.setRoute} setToLocation={this.setToLocation} toAddress={this.state.toAddress}/>} />
            <Route exact path="/" render={props=><Form toLocation={this.state.toLocation}  fromLocation={this.state.fromLocation} setRoute={this.setRoute} setToLocation={this.setToLocation} toAddress={this.state.toAddress}/>} />
            <GrobMap setToAddress={this.setToAddress} toLocation={this.state.toLocation} setToLocation={this.setToLocation} fromLocation={this.state.fromLocation}/>
            <Footer/>
            </div>
            </body>
            </Router>
        );
    }
}

export default HomePage;