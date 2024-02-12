import {Row, Col, Container } from "react-bootstrap";
// import MailchimpForm from './MailchimpForm'; // Replace './MailchimpForm' with the correct path

import logo from "../assets/img/logo.svg";
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';

export const Footer = () => {
  return (
    <footer className="footer">
    <Container>
      <Row className="align-items-center">

        <Col sm={6}>
          <img src={logo} alt="Logo" />
        </Col>
        <Col sm={6} className="text-center text-sm-end">
          <div className="social-icon">
            <a href="www.facebook.com"><img src={navIcon1} alt="facebook-icon" /></a>
            <a href="www.linkedin.com"><img src={navIcon2} alt="instagram-icon" /></a>
            <a href="www.instagram.com"><img src={navIcon3} alt="linkedin-icon" /></a>
            <p> Copy right protected</p>
          </div>
        </Col>
      </Row>
    </Container>
    </footer>
  )
}
