import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import '../Header/Header.css';

function Header() {
    return (
        <Navbar expand="md" className='nav-header'>
            <Container fluid>
                <Navbar.Brand href='#home' className='p-3 fw-bold fst-italic'>
                    <img
                        src='/src/assets/logo.png'
                        width='30%'
                        height='30%'
                        alt='Logo'
                    />
                    Valuation Diamond
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="me-5 fw-bold justify-content-end">
                    <Nav variant='underline'>
                        <NavLink to="/home" className="nav-link" >Home</NavLink>
                        <NavDropdown title="Evaluation Service" id="nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/calculate">Calculate</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/evaluationservice">
                                Diamond Valuation Service
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/policy">Diamond Valuation Policy</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={NavLink} to="/type-of-valuation">
                                Type of Valuation
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavLink to="/check" className="nav-link" >Check</NavLink>
                        <NavLink to="/blog" className="nav-link" >Blog</NavLink>
                        <NavLink to="/contact" className="nav-link" >Contact</NavLink>
                        <Nav.Link href=''>Languages</Nav.Link>
                        <Button className='border border-dark button-sign-in text-dark fw-bold' as={NavLink} to='/login'>Sign in</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
