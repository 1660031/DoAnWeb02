import React, { Component } from 'react';
import Header from './Header';
import Passenger from './Passenger';
import Footer from './Footer';
import Driver from './Driver';
import Modals from './Modals';
import  "./CSS/style.css";
import { BrowserRouter as Router, Route,Redirect, Link , Switch} from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";
import store from "../store";
import PrivateRoute from "./private-route/PrivateRoute";


if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; 
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}



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
          <Provider store={store}>
            <Router>
              <body style={{overflowX :"hidden"}}>
              <div className="site-wrap"  id="home-section">
              <Header/>
              <Modals isDriver={isDriver} setIsDriver={this.setIsDriver}/>
              <Route path="/driver" component={Driver} />
              <Route path="/" exact component={Passenger} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Switch>
                <PrivateRoute exact path="/Header" component={Header} />
              </Switch>
              <Footer/>
              </div>
              </body>
            </Router>
          </Provider>
        );
    }
}

export default HomePage;