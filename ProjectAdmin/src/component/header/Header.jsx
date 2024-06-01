import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import { Container, NavLink} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
export const Header = () =>{

return(
 <>
 <Navbar expand="md" style={{ backgroundColor: '#white ' }}>
    <Container fluid className='px-1'>
      <div className='col-md-3  branddiamond '>
    <Navbar.Brand href='#home' className='p-5 fw-bold  brand-text'>
            <img
                  src='/src/assets/diamond-svgrepo-com.svg'
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
             src="/src/assets/bell.svg"
             alt="bell"
             width='30'
            height='30'
                                />
        </NavLink>
      <NavLink to="/email" className="nav-link mx-2" >
           <img
             src="/src/assets/email.svg"
             alt="bell"
             width='30'
            height='30'
                                />
        </NavLink>
      <NavLink to="/personal-info" className="nav-link mx-2" >
          <img
            src="/src/assets/personal-info.svg"
            alt="bell"
            width='30'
            height='30'
          />
      </NavLink>
      </Nav>
    </Navbar.Collapse>
    </div>

    
    </Container>
 </Navbar>

 </>   
  );
}
 export default Header;







