import { useContext } from "react";
import MyContext from './MyContext';

export const Notification = () => {
  const { notificationText } = useContext(MyContext);


  return (
    <>
      {notificationText && (
        <div className="notification-container notification-text notification-info">
          <div> {!notificationText.noNotification && "No notifications"} </div>
          <div>{!notificationText.signInStatus && notificationText.signInNotification}</div>
        </div>
      )}
    </>
  );
};





{/* <div className="notification-container notification-text notification-info">
         <p >if you want to comment, or perform action on the posts you should register your name, email and password <span className='user-buttons'> <a href='#sign-in'>Sign In now </a></span> </p>
        notificationText
       </div> */}