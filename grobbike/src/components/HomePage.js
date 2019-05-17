import React, { Component } from 'react';
import Header from './Header'
import HomeContent from './HomeContent'
import Footer from './Footer'
import DriverContent from './DriverContent';
import GrobMap from './GrobMap'
class HomePage extends Component {
    render() {
        return (
            <body style={{overflowX :"hidden"}} data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
            <div className="site-wrap"  id="home-section">
            <Header/>
            <HomeContent/>
            <GrobMap/>
            <Footer/>
            </div>
            </body>
        );
    }
}

export default HomePage;