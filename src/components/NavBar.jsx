import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import { User } from './User';


export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // user related
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }
  return (
    <>
      <div className="center">
      <Navbar  expand='md' className={scrolled ? "scrolled center" : "center" }>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="nav-bar-collapse">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              {/* <Nav.Link href="#reviews" className={activeLink === 'reviews' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Reviews')}>Reviews</Nav.Link> */}
              <Nav.Link href="#experience" className={activeLink === 'experience' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('experience')}>Experience</Nav.Link>


              {/* <Nav.Link> */}
              <NavDropdown title="Consultancy" className="consultancy-dropdown">
                <NavDropdown.Item href="#curriculum-design" className={activeLink === 'curriculum-design' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('curriculum-design')}>Curriculum Design</NavDropdown.Item>
                <NavDropdown.Item href="#finish-curriculum" className={activeLink === 'finish-curriculum' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('finish-curriculum')}>Finish Curriculum</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#early-child-development" className={activeLink === 'early-child-development' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('early-child-development')}>Early Child Development</NavDropdown.Item>
                <NavDropdown.Item href="#stem" className={activeLink === 'stem' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('stem')}>Curriculum Design</NavDropdown.Item>
                <NavDropdown.Item href="#class-room-managment" className={activeLink === 'class-room-managment' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('class-room-managment')}>Class Room Managment</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#accelarated-learning" className={activeLink === 'accelarated-learning' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('accelarated-learning')}>Accelarated Learning</NavDropdown.Item>
                <NavDropdown.Item href="#problem-based-learning" className={activeLink === 'problem-based-learning' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('problem-based-learning')}>Problem Based Learning</NavDropdown.Item>
                <NavDropdown.Item href="#active-learining" className={activeLink === 'active-learining' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('active-learining')}>Active Learning</NavDropdown.Item>
              </NavDropdown>
              {/* </Nav.Link> */}
              <Nav.Link href="#user" className="nav-bar-user"> <User /></Nav.Link>
            </Nav>
            {/* <span className="navbar-text">
              <div className="social-icon">
                <a href="#1"><img src={navIcon1} alt="" /></a>
                <a href="#2"><img src={navIcon2} alt="" /></a>
              </div>
              <button className="vvd"><span>Let’s Connect</span></button>
            </span> */}
          </Navbar.Collapse>

        </Container>
      </Navbar>
      </div>
    </>
  )
}
