import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ServicesJson } from './ServciesJson';

export const Services = () => {
  return (
    <>
    <div class="service-container">
      <div class="service-container-inner">
        {
          ServicesJson.map((data, index) =>
            <div key={index} className={`${data.className} ${data.classNameItem}`}>
              <div className="service-title"> <h2>{data.title}</h2> </div>
              <div  className= {data.imageUrl}>  </div>
              <div className= "service-descripion"> {data.description} </div>
            </div>
          )
        }
      </div>
    </div>

    </>
  );
};
