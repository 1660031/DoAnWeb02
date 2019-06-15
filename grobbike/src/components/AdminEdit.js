import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class AdminEdit extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onChangeActiveUser = this.onChangeActiveUser.bind(this);
        this.onChangeIsAdmin = this.onChangeIsAdmin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            activeUser: false,
            isAdmin: false
        }
    }

    componentDidMount() { 
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        if(!this.props.auth.user.isAdmin && this.props.auth.isAuthenticated){
        this.props.history.push("/driver");
        }
        axios.get('/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    sdt: response.data.sdt,
                    name: response.data.name,
                    gender: response.data.gender,
                    typeBike: response.data.typeBike,
                    bsxe: response.data.bsxe,
                    activeUser: response.data.activeUser,
                    isAdmin: response.data.isAdmin
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }


    onChangeActiveUser(e) {
        this.setState({
            activeUser: !this.state.activeUser
        });
    }

    onChangeIsAdmin(e) {
        this.setState({
            isAdmin: !this.state.isAdmin 
        });

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            activeUser: this.state.activeUser,
            isAdmin: this.state.isAdmin,
        };
        console.log(obj.activeUser)
        axios.post('users/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/admin');
    }

    render() {
  
        return (
            <div className="container">
                <h3>Cập nhật tài khoản</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <div className="form-check">
                        <label style={{ marginRight: 20 }}>Kích hoạt tài khoản</label>
                            <input  type="checkbox"
                                    id="activeUserCheckbox"
                                    name="activeUserCheckbox"
                                    onChange={this.onChangeActiveUser}
                                    checked={this.state.activeUser}
                                    value={this.state.activeUser}/>
                            <label htmlFor="activeUserCheckbox">
                            &nbsp; &nbsp;Kích hoạt
                            </label>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="form-check">
                        <label style={{ marginRight: 20 }}> Quản trị</label>
                            <input  type="checkbox"
                                    id="isAdminCheckbox"
                                    name="isAdminCheckbox"
                                    onChange={this.onChangeIsAdmin}
                                    checked={this.state.isAdmin}
                                    value={this.state.isAdmin}
                                    />
                            <label htmlFor="isAdminCheckbox">
                            &nbsp; &nbsp;Kích hoạt
                            </label>
                        </div>
                    </div>
                        <div className="form-group">
                            <input type="submit" value="Cập nhật" className="btn btn-primary" />
                        </div>

                </form>
            </div>
        )
    }
}

AdminEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(AdminEdit);