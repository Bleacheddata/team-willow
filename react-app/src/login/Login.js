import React from "react";
import { Link } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Login">
        <form className="LoginForm">
          <label for="login-email"> Email</label>
          <input id="login-email" type="email" />
          <label for="login-password">Password</label>
          <input id="login-password" type="password" />
          <Link to="/register">Not signed up yet? </Link>
          <button class="form-button">Login </button>
        </form>
      </div>
    );
  }
}
export default Login;
