import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Header() {
    return (
        <>
            <Navbar expand="md" style={{ backgroundColor: '#E2FBF5 ' }}>
                <Container fluid>
                    <Navbar.Brand href='#home' className='p-3 fw-bold fst-italic'>
                        <img
                            src='/src/assets/diamond-svgrepo-com.svg'
                            width='60'
                            height='60'
                            alt='Logo'
                        />
                        Valuation Diamond
                    </Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav" className="me-5 fw-bold justify-content-end">
                        <Nav variant='underline'>
                            <NavLink to="/home" className="nav-link" >Home</NavLink>
                            <NavLink to="/evaluation-service" className="nav-link" >Evaluation Service</NavLink>
                            <NavLink to="/setting" className="nav-link" >Setting</NavLink>
                            <NavLink to="/personal-info" className="nav-link" >
                                <img
                                    src="/src/assets/personal-info.svg"
                                    alt="bell"
                                    width='30'
                                    height='30'
                                />
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

        

    );
}

export default Header;
