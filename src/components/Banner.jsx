// import { useState, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap";
import {ArrowRightCircle} from "react-bootstrap-icons";
import headerImg from '../assets/img/websiteimages/books.png';
// import wave from '../assets/img/wave.jpg';

export const Banner = () => {
    return (
      <div className="banner-background">
      <section className="banner" id="home">
        <Container className="container">
          <Row className="banner-moto">
            <Col>
              <h1>Education Reimagined</h1>
            </Col>
          </Row>
          <Row className="banner-moto-discription align-items-center">
            <Col>
              <img src={headerImg} alt="Header Img" />
            </Col>
            <Col xs={12} md={6} xl={7} className='we-list-container'>
              <div className='we-list'>
              <h1>
               <div>We ....</div>
                {/* <span className="wrap"> */}
                <ul className='moto'>

                  <li>Empower Educators and Transform Schools</li>
                  <li>Build Bridges to Educational Equity</li>
                  <li>Unlock Every learners Potential</li>
                </ul>
              {/* </span> */}
              </h1>
              </div>
              {/* <button href="#footer" onClick={() => console.log('connect')}>Let's Connect<ArrowRightCircle /></button> */}
            </Col>
          </Row>
        </Container>
      </section>
      </div>
    )
}
