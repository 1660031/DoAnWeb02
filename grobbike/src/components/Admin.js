import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const User = props => (
    <tr>
        <td>{props.user.sdt}</td>
        <td>{props.user.name}</td>
        <td>{props.user.gender}</td>
        <td>{props.user.typeBike}</td>
        <td>{props.user.bsxe}</td>
        <td>
            <Link to={"/admin/edit/"+props.user._id}>Sửa</Link>
        </td>
    </tr>
)
class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
        if(!this.props.auth.user.isAdmin && this.props.auth.isAuthenticated){
        this.props.history.push("/driver");
        }
        axios.get('users')
            .then(res => {
                this.setState({users: res.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }   

    componentDidUpdate() {
        
        axios.get('users')
        .then(res => {
            this.setState({users: res.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    userList() {
        return this.state.users.map(function(currentUser, i) {
            return <User user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            
            <div>
                <h3>Danh sách tài khoản</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Số điện thoại</th>
                            <th>Tên</th>
                            <th>Giới tính</th>
                            <th>Loại xe</th>
                            <th>Biển số xe</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

Admin.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Admin);