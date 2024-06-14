import Navbar from 'react-bootstrap/Navbar';
import './../../componentAdmin/header/Header.css'
import { Container, NavLink, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Header = () => {
  const [admin, setAdmin] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate ()
  
  useEffect(() => {
    const adminInfor = JSON.parse(localStorage.getItem('admin'));
    if (adminInfor) {
      setAdmin(adminInfor);
      setIsLogin(true);
    }
  }, [])

  const handleLogout = ()=>{
    setAdmin(null);
    setIsLogin(false);
    localStorage.removeItem('admin')
    navigate('/login')
  }
  return (
    <>
      <Navbar expand="md" style={{ backgroundColor: '#white ' }}>
        <Container fluid className='px-1'>
          <div className='col-md-3  branddiamond '>
            <Navbar.Brand href='#home' className='p-5 fw-bold  brand-text'>
              <img
                src='/src/assets/assetsAdmin/diamond-svgrepo-com.svg'
                width='60'
                height='60'
                alt='Logo'
              />
              Valuation Diamond
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Collapse id="responsive-navbar-nav" className="me-5 fw-bold justify-content-end">
              <Nav variant='line-through'>
                <NavLink to="/bell" className="nav-link mx-2" >
                  <img
                    src="/src/assets/assetsAdmin/bell.svg"
                    alt="bell"
                    width='30'
                    height='30'
                  />
                </NavLink>
                <NavLink to="/email" className="nav-link mx-2" >
                  <img
                    src="/src/assets/assetsAdmin/email.svg"
                    alt="bell"
                    width='30'
                    height='30'
                  />
                </NavLink>
                {admin && isLogin && (
                  <NavDropdown title={admin.name} id="nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

    </>
  );
}
export default Header;







