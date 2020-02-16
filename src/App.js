import React from 'react';
import {Navbar, Nav, NavDropdown, Pagination} from 'react-bootstrap';
import './App.css';
import fakeAuth from "./Util/Auth";
import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>React-Hooks</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Dashboard</Nav.Link>

          <NavDropdown title="Administrative" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/country">Country</NavDropdown.Item>
            <NavDropdown.Item href="/province/list">Province</NavDropdown.Item>
            <NavDropdown.Item href="/regency/list">Regency</NavDropdown.Item>
            <NavDropdown.Item href="/district/list">District</NavDropdown.Item>
            <NavDropdown.Item href="/village/list">Village</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="">Level Category</Nav.Link>
          <Nav.Link href="">Order Status</Nav.Link>
          <Nav.Link href="">Service</Nav.Link>
          <Nav.Link href="">Company</Nav.Link>
          <Nav.Link href="">Tag</Nav.Link>
          <Nav.Link href="">Field</Nav.Link>
          <Nav.Link href="">Service Category</Nav.Link>
          <Nav.Link onClick={() => {
            fakeAuth.signout(() => history.push("/login"));
          }}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;
