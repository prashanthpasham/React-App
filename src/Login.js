import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import LoginService from './apis/Login/LoginService';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "userName": "sysadmin",
            "password": "welcome",
            "redirect": false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }
    handleInputChange(event, name) {
        this.setState({ [name]: event.target.value });
    }
    login() {

        LoginService.login({ "userName": this.state.userName, "password": this.state.password }).then(data => {
            if (data.result === 'success') {
                localStorage.setItem('menus', JSON.stringify(data.menus));
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('Token', data.token);
                this.setState({ "redirect": true });
            } else {
                this.setState({ error: data.error_message, password: '' });
                localStorage.setItem('isLoggedIn', false);
            }
        })
    }
    render() {
        return (

            <div className="card">
                <div className=" col-md-12 col-lg-12">
                    <h3>Login</h3>
                    {
                        this.state.redirect && <Redirect to="/app" />
                    }
                    <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                            <label>UserName</label>
                            <input className="form-control" type="text" name="userName" value={this.state.userName} onChange={(e) => this.handleInputChange(e, 'userName')} />
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" type="password" name="password" value={this.state.password} onChange={(e) => this.handleInputChange(e, 'password')} />
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-3">
                        <div className="form-group">
                            <button type="submit" style={{ 'width': '120px' }} onClick={() => this.login()} className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
export default withRouter(Login);