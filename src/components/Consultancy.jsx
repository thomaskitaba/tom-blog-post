import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ConsultancyJson } from './ConsultancyJson';

export const Consultancy = () => {
  return (
    <>
      <div className="consultancy-container">
        <Row className="consultancy-row">
          {ConsultancyJson.map((data, index) => (
            <Col md={6} key={index} className="consultancy-col">
              <div className={`consultancy-item item-background-universal`}>
                <div className={`consultancy-image ${data.className}`}> </div>
                <div className="consultancy-section">
                  <section id={data.title}>
                    <div className="consultancy-title"><h2>{data.title}</h2></div>
                    <p className="consultancy-definition">{data.definition}</p>
                    <p className="consultancy-description">{data.description}</p>
                  </section>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};
