const Footer = () => {
  return (
  <>
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-contact-info">
            <ul>
              <li><h6 className="footer-header-text">Contact Info</h6></li>
              <li><p>Thomas Kitaba </p></li>
              <li><p>Addis Ababa, Ethiopia</p></li>
              <li><p>+251 0985201805</p></li>
              <li><p>thomaskitabadiary@gmail.com</p></li>
            </ul>
          </div>
          <div className="footer-information">
            <ul>
              <li> <h6>Other Info</h6></li>
              <li><p>Privacy Policy</p></li>
              <li><p>Terms of Service</p></li>
              <li><p>FAQs</p></li>
              <li><p>Support</p></li>
            </ul>
          </div>
        </div>
        <div className="footer-right">

          <div className="footer-social-media-links">
            <ul className="footer-list">
              <li><h6>Social Media Links</h6></li>
              <li><a href='http://www.facebook.com/thomas.kitaba.feyissa'><p>Facebook</p></a></li>
              <li><a href='https://www.linkedin.com/in/thomas-kitaba-871b2721b' > <p> LinkedIn </p> </a></li>
              <li><a href='https://t.me/thomas_kitaba_feyissa'><p>telegram</p></a></li>
              <li><a href='https://twitter.com/tomaskitaba'><p>X</p></a></li>
              <li><a href=''><p>TikTok</p></a></li>
            </ul>
          </div>
          <div className="footer-copyright-info">
          <ul>
              <li><h6>Copyright Info</h6></li>

              <li>
              <p>© 2024 Tom's Blog</p>
              <p>All rights reserved</p>
              </li>
            </ul>
          </div>
        </div>
      </div>


    </footer>
     <div className="final-words"> Webapp developed by Thomas Kitaba(Full Stack Software Developer). </div>
  </>
  );
}

export default Footer;
