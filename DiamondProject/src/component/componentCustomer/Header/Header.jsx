import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { NavLink , useNavigate} from 'react-router-dom';
import '../Header/Header.css';

function Header() {
    const [user, setUser] = useState(null);
    const [isUsername, setIsUsername] = useState(false);
    const navigate = useNavigate()

    // https://api.slingacademy.com/v1/sample-data/photos

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://jsonplaceholder.typicode.com/users/2');
    //             const data = await response.json();
    //             setIsUsername(true);
    //             setUser(data);
    //             localStorage.setItem('user', JSON.stringify(data));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
            
    //     };
    //     fetchData();
    // }, []);


    //get data user
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setIsUsername(true);
        }
    }, []);

    const handleLogout = () => {
        setIsUsername(false);
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login')
    };

    return (
        <Navbar expand="md" className='nav-header'>
            <Container fluid>
                <Navbar.Brand href='#home' className='p-3 fw-bold fst-italic'>
                    <img
                        src='/src/assets/assetsCustomer/logo.png'
                        width='20%'
                        height='20%'
                        alt='Logo'
                    />
                    Valuation Diamond
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="me-5 fw-bold justify-content-end">
                    <Nav variant='underline'>
                        <NavLink to="/home" className="nav-link">Home</NavLink>
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
                        <NavLink to="/check" className="nav-link">Check</NavLink>
                        <NavLink to="/blog" className="nav-link">Blog</NavLink>
                        <NavLink to="/contact" className="nav-link">Contact</NavLink>
                        <NavDropdown title="Language" id="nav-dropdown">
                                <NavDropdown.Item>Vietnamese</NavDropdown.Item>
                                <NavDropdown.Item>English</NavDropdown.Item>
                        </NavDropdown>
                        {isUsername && user ? (
                            <NavDropdown title={user.name} id="nav-dropdown">
                                <NavDropdown.Item as={NavLink} to="/profile">My Profile</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/my-request">My Request</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout} >
                                    Log out
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Button className='border border-dark text-dark fw-bold' as={NavLink} to='/login'>Sign in</Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
