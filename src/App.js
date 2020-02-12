import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';

function App() {

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">React-Hooks</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/list">List of Products</Nav.Link>
          <Nav.Link href="/create">Add Product</Nav.Link>

          <NavDropdown title="Country" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="/listcountry">List of Country</Nav.Link>
          <Nav.Link href="/createcountry">Add Country</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default App;
