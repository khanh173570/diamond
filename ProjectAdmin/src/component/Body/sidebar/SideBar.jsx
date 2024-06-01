import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import './SideBar.css';

export const SideBar = () => {
    const [manageAccountOpen, setManageAccountOpen] = useState(false);

    const toggleManageAccount = () => {
        setManageAccountOpen(!manageAccountOpen);
    };

    return (
        
        <Navbar className="flex-column w-100" style={{ backgroundColor: '#263543', height: '100vh' }}>
            <Nav className="flex-column w-100 p-2 menu fw-bold">
                <NavLink className='nav-link mt-2 mx-2' to="/dashboard">
             
                    DashBoard
                    
                    </NavLink>

                <div className='nav-link mx-2' onClick={toggleManageAccount} style={{ cursor: 'pointer'}}>
                    Manage Account {manageAccountOpen ? <FaCaretUp /> : <FaCaretDown />}
                </div>
                {manageAccountOpen && (
                    <div className='pl-3'>
                        <NavLink className='nav-link mx-4 p-1' to="/managestaff">Manage Staff</NavLink>
                        <NavLink className='nav-link mx-4 p-1' to="/managecustomer">Manage Customer</NavLink>
                    </div>
                )}
                <NavLink className='nav-link mx-2 p' to="/manageschedule">Manage Schedule</NavLink>
                <NavLink className='nav-link mx-2 p' to="/manageblog">Manage Blog</NavLink>
            </Nav>
        </Navbar>
    );
}

export default SideBar; 