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
  const {userTypeId} = useContext(MyContext);

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
  setButtonText('Sending ...');
  const mailType = 'contact';
  setUserId(2);
  const destnationEmail = 'thomas.kitaba@gmail.com';
  try {
    const response = await axios.post(
      `${endpoint}/api/sendemail`, // Update the URL to HTTPS
      { userId, mailType, destnationEmail, form },
      {
        headers: {
          'Content-type': 'application/json',
          'x-api-key': myApiKey,
        },
      }
    );
    setButtonText('Send');
    setForm(formInitialsDetail);
    console.log('Response:', response.data);
    alert('success');
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Email not sent. Check console for error details.');
    setButtonText('Send');
  }
};

return (
  <section className="contact" id="connect">
    <Container>

      <Row className="align-items-center">
      <div className="contact-header">  <h1>Let's Connect</h1> </div>
        <Col md={6}>
          {/* {screenSize > 768 ? <img src={Chief} alt="Contact image Chief standing" /> : <img src={Chief2} alt="Contact image Chief standing" />} */}
          <div className='contact-paragraph'>
            <h3>Our team of experienced consultants can assist you with:</h3>
          <div className='contact-paragraph-list'>
            <ul>
              <li>Education planning and strategy</li>
              <li>Curriculum development</li>
              <li>Teaching methodologies</li>
              <li>Student assessments</li>
              <li>Education technology integration</li>
              <li>And much more!</li>
            </ul>
          </div>
          <div className="contact-paragraph-footer">
            <p>Feel free to reach out to us using the contact form below. We're passionate about education and look forward to helping you achieve your goals.</p>
          </div>
          </div>
        </Col>
        <Col>

          <form >
            <Row className="mx-1">
              <Col className="px-1">
                <input type="text" placeholder="First Name" name="fname" value={form.fname} onChange={ (e) => onFormUpdate('fname', e.target.value)} />
              </Col>
              <Col className="px-1">
                <input type="text" placeholder="Last Name" name="lname" value={form.lname} onChange={ (e) => onFormUpdate('lname', e.target.value)} />
              </Col>
            </Row>
            <Row className="mx-1">
              <Col className="px-1">
                <input type="email" placeholder="Email" name="email" value={form.email} onChange={ (e) => onFormUpdate('email', e.target.value)} />
                <input type="tel" value={form.phone} name="phone" placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                <textarea placeholder="Message" name="messge" value={form.message} onChange={ (e) => onFormUpdate('message', e.target.value)} />
              </Col>
            </Row >
            <Row className="mx-1">
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