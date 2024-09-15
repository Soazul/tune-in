import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function Navigation () {
    const [expanded, setExpanded] = useState(false);

    return (
      <Navbar
        bg="light"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        collapseOnSelect
      >
        <Navbar.Brand href="#home">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="./home_page.tsx">Generate Song</Nav.Link>
            <Nav.Link href="./timer.tsx">Timer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}