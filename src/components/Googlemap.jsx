import React from 'react';

const Googlemap = () => {

  return (
    <div className="google-map-container">
       {/* <div className="google-map-description">
        <h2>Our Location</h2>
        <p>
          Kotebe Thomaskitaba Groups, Addis Ababa, Ethiopia
        </p>
        <p>
          If you want further information about our location or the services we provide, please call us at:
        </p>
        <p>
          <a href="tel:+2510985201805">+251 0985 201 805</a>
        </p>
      </div> */}
      <div className="google-map">

        <p>
          If you want further information about our location or the services we provide, please call us at:
        </p>
        <p>
          <a href="tel:+2510985201805">+251 0985 201 805</a>
        </p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8291.794906754998!2d38.83778618275838!3d9.031035133521994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b91e70c90e92f%3A0xc6fc1b949fd6747d!2sKotebe%20Teachers%20College!5e0!3m2!1sen!2set!4v1716113150647!5m2!1sen!2set"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      >

      </iframe>
      </div>
    </div>
  );
};

export default Googlemap;
