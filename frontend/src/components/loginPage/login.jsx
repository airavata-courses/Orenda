import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthService from "./authservice";
import "./login.css";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.login = this.login.bind(this);
  }

  login = async e => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    AuthService.login(credentials).then(res => {
      if (res.status === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.token));
        this.props.history.push("/dashboard/submittask");
      }
    });
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div className=" Login fullheight fullwidth ">
        <div className=" container fullheight fullwidth text-light">
          <div className="row fullheight">
            <div className="col">
              <form>
                <h3 className="text-center">Sign In</h3>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={this.login}
                >
                  Submit
                </button>
                {/* <p className="text-right">
                <Link to="/forget">Forgot password?</Link>
              </p> */}
                <p className=" text-right">
                  Don't have an account <Link to="/register">Sign up?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
