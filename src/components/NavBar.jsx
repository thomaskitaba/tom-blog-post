import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from '../assets/img/tom.ico';
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
        <Container className="navbar-container">
          <Navbar.Brand href="/">
            <img src={logo} style={{width: '40px', height: '40px'}}alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav" className="nav-bar-collapse">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              {/* <Nav.Link href="#reviews" className={activeLink === 'reviews' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Reviews')}>Reviews</Nav.Link> */}
              <Nav.Link href="#connect" className={activeLink === 'contact-us' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact-us')}>ContactUs</Nav.Link>
              <Nav.Link href="#experience" className={activeLink === 'experience' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('experience')}>Experience</Nav.Link>
              <Nav.Link href="#view-posts" className={activeLink === 'view-posts' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('view-posts')}>Researchs</Nav.Link>
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
