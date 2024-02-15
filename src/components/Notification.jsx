import { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import MyContext from './MyContext';

export const Notification = () => {
  const { notificationText } = useContext(MyContext);


  return (
    <>
      {notificationText ? (
        <div className="notification-container notification-text notification-info">
          <div> {!notificationText.noNotification && "No notification"} </div>
          <div>{!notificationText.signInStatus && notificationText.signInNotification}</div>
        </div>
      ) : (
        'No Notification'
      )}
    </>
  );
};





{/* <div className="notification-container notification-text notification-info">
         <p >if you want to comment, or perform action on the posts you should register your name, email and password <span className='user-buttons'> <a href='#sign-in'>Sign In now </a></span> </p>
        notificationText
       </div> */}