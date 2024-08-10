import React, { Component } from 'react';
import './Login.css';
// import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Redirect, Link } from 'react-router-dom';
import ApiAuthService from '../../service/authService';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         loginError: false,
         loggedIn: false,
         idUser: '',
      };
   }

   handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({
         [name]: value,
         loginError: false, // Reset trạng thái của alert khi người dùng nhập liệu mới
      });
   };

   handleSubmit = async (event) => {
      event.preventDefault();
      const { username, password } = this.state;
      const data = {
         username: username,
         password: password,
      };
      try {
         const response = await ApiAuthService.doSignIn(data);
         const idUser = response.idUser;
         const token = response.token;
         this.setState({
            loggedIn: true,
            idUser: idUser,
         });
         localStorage.setItem('idUser', idUser);
         localStorage.setItem('token', token);
      } catch (error) {
         console.log(error);
      }
   };

   render() {
      const { username, password, loginError, loggedIn } = this.state;
      if (loggedIn) {
         return <Redirect to="/" />;
      }
      return (
         <div>
            <div className="login-main">
               <div className="login-form">
                  <div className="login-form-main">
                     <h2 className="login-form-title">Login</h2>
                     {loginError && (
                        <div className="alert alert-danger" role="alert">
                           Incorrect username or password. Please try again.
                        </div>
                     )}
                     <form className="login-form-content" onSubmit={this.handleSubmit}>
                        <div>
                           <label>Username</label>
                           <input
                              type="text"
                              name="username"
                              value={username}
                              onChange={this.handleInputChange}
                              required
                              placeholder="Enter userame ..."
                           />
                        </div>
                        <div>
                           <label>Password</label>
                           <input
                              type="password"
                              name="password"
                              value={password}
                              onChange={this.handleInputChange}
                              placeholder="Enter password ..."
                              required
                           />
                        </div>
                        <div className="forgot-link">
                           <Link to={'/sign-up'}>Sign up</Link>
                           <Link to={'/forgot-password'}>Forgot Password</Link>
                        </div>
                        <button type="submit" className="btn btn-primary btn-login">
                           Login
                        </button>
                     </form>
                  </div>
               </div>
               <div className="login-bg-img">
                  <div className="login-img-content" style={{ backgroundImage: `url("/login-bg.jfif")` }}></div>
               </div>
            </div>
         </div>
      );
   }
}

export default Login;
