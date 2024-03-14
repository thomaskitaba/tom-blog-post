// import Chief from '../assets/img/chief.png';
// import Chief2 from '../assets/img/chief-2.png';
import {useState, useEffect, useContext} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import MyContext from './MyContext';
import axios from 'axios';

const Contact = () => {
  const { userId, setUserId } = useContext(MyContext);
  const { myApiKey} = useContext(MyContext);
  const { endpoint} = useContext(MyContext);

const formInitialsDetail = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
  message: '',
  destnationEmail: 'thomas.kitaba@gmail.com'
}

const [form, setForm] = useState(formInitialsDetail);
const [buttonText, setButtonText] = useState('Send');
const [status, setStatus] = useState({});
const [screenSize, setScreenSize] = useState(window.innerWidth);

// get the width of the screen
useEffect(() => {
  const handleResize = () => setScreenSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  }
}, [screenSize]);

const onFormUpdate = (formField, value) => {
  setForm({
    ...form,
    [formField]: value
  })
}
const sendTestEmail  = async (e) => {
  e.preventDefault();
  const mailType = 'contact';
  setUserId(2);
  const destnationEmail = 'thomas.kitaba@gmail.com';
  try {
    const response = await axios.post(
      `${endpoint}/api/sendemail`, // Update the URL to HTTPS
      { userId, mailType, destnationEmail },
      {
        headers: {
          'Content-type': 'application/json',
          'x-api-key': myApiKey,
        },
      }
    );
    console.log('Response:', response.data);
    alert('success');
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Email not sent. Check console for error details.');
  }
};

return (
  <section className="contact" id="connect">
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          {/* {screenSize > 768 ? <img src={Chief} alt="Contact image Chief standing" /> : <img src={Chief2} alt="Contact image Chief standing" />} */}
        </Col>
        <Col>
          <h1>Let's Connect</h1>
          <form >
            <Row>
              <Col className="px-1">
                <input type="text" placeholder="First Name" name="fname" value={form.fname} onChange={ (e) => onFormUpdate('fname', e.target.value)} />
              </Col>
              <Col className="px-1">
                <input type="text" placeholder="Last Name" name="lname" value={form.lname} onChange={ (e) => onFormUpdate('lname', e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col className="px-1">
                <input type="email" placeholder="Email" name="email" value={form.email} onChange={ (e) => onFormUpdate('email', e.target.value)} />
                <input type="tel" value={form.phone} name="phone" placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                <textarea placeholder="Message" name="messge" value={form.message} onChange={ (e) => onFormUpdate('message', e.target.value)} />
              </Col>
            </Row>
            <Row>
              <Col md={4} sm={4} className="px-1">
                <button type="submit" onClick={(e) => {e.preventDefault(); sendTestEmail(e);}}><span>{buttonText}</span></button>
              </Col>
              {
                  status.message &&
                  <Col className="px-1">
                    <p className={status.success === true ? "sucess" : "danger"}></p>
                  </Col>
              }
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  </section>
)
}

export default Contact;