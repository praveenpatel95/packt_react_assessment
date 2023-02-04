import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../../components/Logo";
import Search from "../../components/Search";
import {Link} from "react-router-dom";

function Header() {
    return (
        <Navbar bg="theme-color" expand="lg">
            <Container>
                <Navbar.Brand to="/" as={Link}><Logo/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link to="/admin/books" as={Link}>Manage Books (Admin) </Nav.Link>
                    </Nav>

                </Navbar.Collapse>

                <div className="d-flex ms-1">
                    <Search/>
                </div>


            </Container>
        </Navbar>
    )
}

export default Header;