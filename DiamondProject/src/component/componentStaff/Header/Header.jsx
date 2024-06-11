import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate();

    // test consult
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users/2");
                const data = await response.json();
                localStorage.setItem('consult_staff', JSON.stringify(data));
               
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // test valuation
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("https://jsonplaceholder.typicode.com/users/3");
    //             const data = await response.json();
    //             localStorage.setItem('valuation_staff', JSON.stringify(data));
               
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    // 
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('consult_staff'));
        // const storedUser = JSON.parse(localStorage.getItem('valuation_staff'));
        if (storedUser) {
            setUser(storedUser);
            setIsLogin(true)
        }
    }, []);

    // Logout function
    const handleLogout = () => {
        setUser(null);
        setIsLogin(false)
        localStorage.removeItem('consult_staff');
        // localStorage.removeItem('valuation_staff');
        navigate('/login');
    };

    return (
        <Navbar expand="md" style={{ backgroundColor: '#E2FBF5' }}>
            <Container fluid>
                <Navbar.Brand href='#home' className='p-3 fw-bold fst-italic'>
                    <img
                        src='/src/assets/assetsStaff/diamond-svgrepo-com.svg'
                        width='60'
                        height='60'
                        alt='Logo'
                    />
                    Valuation Diamond
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav" className="me-5 fw-bold justify-content-end">
                    <Nav variant='underline'>
                        <NavLink to="/home" className="nav-link">Home</NavLink>
                        <NavLink to="/evaluation-service" className="nav-link">Evaluation Service</NavLink>
                        <NavLink to="/setting" className="nav-link">Setting</NavLink>
                        {user &&  (
                            <NavDropdown title={user.name} id="nav-dropdown">
                                <NavDropdown.Item as={NavLink} to="/personal-info">My Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
