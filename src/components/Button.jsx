import {useState, useEffect, useContext } from 'react';
import MyContext from './MyContext';
import {Notification} from './Notification';
import {ChevronUp, ChevronDown, Bell, X} from "react-bootstrap-icons";
const Button = () => {

  const {notification, setNotification} = useContext(MyContext);
  const {notificationText, setNotificationText} = useContext(MyContext);
  const [scrolled, setScrolled] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 800) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (window.scrollY < document.documentElement.scrollHeight - 1500) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  setNotification(true);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight - 1500,
      behavior: 'smooth'
    });
  };

  const handleShowNotification = ()=> {
    setShowNotification(true);
  }
  const handleHideNotification = () => {
    setShowNotification(false);
  }
  return (
    <>
    { showNotification &&
    <div className="bell-info-container info-bg-yellow">
      <div className="bell-close-button"> <X onClick={(e)=> handleHideNotification()}/> </div>
      <div>
        {/* use map to display all notifications */}

        <a href="#sign-in" >SigIn</a> to comment and post if you don't have account <a href="#sign-up">SigUp</a>
      </div>
    </div>
  }
    <div className="button-container">
      {notification && <div className="button-notification"> <Bell className="bell" onClick={(e)=> handleShowNotification()}/> </div>}
      {scrolled && <div className="button-top"> <ChevronUp className="Chevron-up" onClick={(e)=>scrollToTop()}/></div>}
      {reachedEnd && <div className="button-bottom"> <ChevronDown className="Chevron-down" onClick={(e)=>scrollToBottom()}/> </div>}
    </div>
    </>
  )
}

export default Button;
