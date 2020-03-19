import React, { Component } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";

export default class DashNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: ""
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("userInfo")) {
      this.props.history.push("/");
    } else {
      this.setState({
        userID: localStorage.getItem("userInfo")
      });
    }
  }
  logOut() {
    localStorage.removeItem("userInfo");
    this.props.history.push("/");
  }
  render() {
    return (
      <Navbar expand="lg" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand>Orenda</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href={"/dashboard/submittask/" + this.state.userID}>
            Submit Task
          </Nav.Link>
          <Nav.Link
            href={
              "/dashboard/session/" +
              this.state.userID
            }
          >
            Session
          </Nav.Link>
          <Nav.Link onClick={this.logOut} href="/">
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}
