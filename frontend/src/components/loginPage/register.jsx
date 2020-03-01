import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "./authservice";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
      // securityQuestion: ""
    };
    this.register = this.register.bind(this);
  }

  register = async e => {
    e.preventDefault();
    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    AuthService.register(userData).then(res => {
      if (res.status == 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data.token));
        this.props.history.push("/login");
      }
    });
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className=" Register fullheight fullwidth">
        <div className=" container fullheight fullwidth text-light">
          <div className="row fullheight">
            <div className="col">
              <form>
                <h3 className="text-center">Sign Up</h3>

                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    required
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    required
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                </div>

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
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                {/* <div className="form-group">
                <label>Security question</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Security question"
                  name="securityQuestion"
                />
              </div> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={this.register}
                >
                  Sign Up
                </button>
                <p className="forgot-password text-right">
                  Already registered <Link to="/login">Sign in?</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
