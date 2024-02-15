import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import MyContext from './MyContext';

export const Notification = (props) => {

  // const notifications =  ['', false];

  const {notification, setNotification } = useContext(MyContext);
  const {notificationText, setNotificationText } = useContext(MyContext);
  const { signedIn, setSignedIn } = useContext(MyContext)
  // const[notification, setNotification] = useState(false);
  // const [notificationText, setNotificationText] = useState('Your Notifications Here');


// if (notifications[1] === true || notifications[0].length <= 0) {

  return (
    <>
      {/* { notificationText.length > 0 ? {notificationText} : 'no Notification'

      } */}

      { signedIn ? <div className="notification-container notification-text notification-info">
         <p ><h2> Display Notification array here  if there are notifications</h2></p>

       </div> :
         <div className="notification-container notification-text notification-info">
         <p >if you want to comment, or perform action on the posts you should register your name, email and password <span className='user-buttons'> <a href='#sign-in'>Sign In now </a></span> </p>
        {notificationText}
       </div>
      }

    </>
  )

}