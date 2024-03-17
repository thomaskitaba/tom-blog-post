import { useContext } from "react";
import MyContext from './MyContext';

const Loading = () => {
  const { notificationText } = useContext(MyContext);


  return (
    <>
    <div className='loading-container'>

      <div className='loding-head-circle'>
        <div className='loading-header'><p> Loading Posts... </p></div>
        <div className='loading'>

          <div className='circle-3'></div>
          <div className='circle-2'></div>
          <div className='circle-1'></div>
          <div className='circle-2'></div>
          <div className='circle-3'></div>
        </div>
      </div>
    </div>
      {/* {notificationText && (
        <div className="notification-container notification-text notification-info">
          <div> {!notificationText.noNotification && "No notifications"} </div>
          <div>{!notificationText.signInStatus && notificationText.signInNotification}</div>
        </div>
      )} */}
    </>
  );
};

export default Loading;



{/* <div className="notification-container notification-text notification-info">
         <p >if you want to comment, or perform action on the posts you should register your name, email and password <span className='user-buttons'> <a href='#sign-in'>Sign In now </a></span> </p>
        notificationText
       </div> */}