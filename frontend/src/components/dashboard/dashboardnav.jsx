import React, { Component } from "react";
import {Navbar,Container,Nav} from 'react-bootstrap'

export default class DashNav extends Component {
    
  render() {
    return ( 
   <Navbar expand="lg" variant="light" bg="light" fixed="top">
    <Navbar.Brand>Orenda</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/dashboard/submittask">Submit Task</Nav.Link>
      <Nav.Link href="/dashboard/session">Session</Nav.Link>
    </Nav>

</Navbar>);
}
}
