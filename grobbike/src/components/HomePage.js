import React, { Component } from 'react';
import Header from './Header'
import HomeContent from './HomeContent'
import Footer from './Footer'
import DriverContent from '../DriverContent';

class HomePage extends Component {
    render() {
        return (
            <body data-spy="scroll" data-target=".site-navbar-target" data-offset="300">
            <div className="site-wrap"  id="home-section">
            <Header/>
            <HomeContent/>
            {/* <DriverContent/> */}
            <Footer/>
            </div>
            </body>
        );
    }
}

export default HomePage;