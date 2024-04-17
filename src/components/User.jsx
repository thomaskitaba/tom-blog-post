import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Row, Col} from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import MyContext from './MyContext';
import axios from 'axios';


import { X } from "react-bootstrap-icons";

// import { Notification } from './Notification';

export const User = () => {
  // global contexts
  const { endpoint, setEndpoint }= useContext(MyContext);
  const { myApiKey, setMyApiKey } = useContext(MyContext);
  const { userList, setUserList} = useContext(MyContext);
  const { userName, setUserName } = useContext(MyContext);
  const {editProfileClicked, setEditProfileClicked} = useContext(MyContext);
  const {databaseChanged,  setDatabaseChanged} = useContext(MyContext);
  const {showUserManagment, setShowUserManagment} = useContext(MyContext);
  const {openForm, setOpenForm} = useContext(MyContext);

  const[user, setUser] = useState('normal User');
  // const [signedIn, setSignedIn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [ messageText,  setMessageText ] = useState('Welcome!');
  const [signInError, setSignInError] = useState(false);
  const [signUpError, setSignUpError ] = useState(false);
  const [signInErrorText, setSignInErrorText ] = useState('');
  const [signUpErrorText, setSignUpErrorText ] = useState('');
  const [ signInInfo, setSignInInfo ] = useState('Provide your userName or email');
  const [singedUp, setSignedUp] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [signUpClicked, setSignUpClicked] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const [name, setName ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail ] = useState('');
  const [formError, setFormError] = useState([]);
  const {notification, setNotification } = useContext(MyContext);
  const {notificationText, setNotificationText } = useContext(MyContext);
  const {signedIn, setSignedIn } = useContext(MyContext);
  const {userId, setUserId} = useContext(MyContext);

  const {userEmail, setUserEmail} = useContext(MyContext);
  const {userTypeId, setUserTypeId} = useContext(MyContext);
  const { selectedKeyIndex, setSelectedKeyIndex } = useContext(MyContext);

  const [tempUserName, setTempUserName] = useState()
  // setTempUserName(userName ? (userName.length > 6 ? `${userName.slice(0, 6)}..`: userName ) : 'welcome');
  useEffect(() => {
    const handleClickOutside = (event) => {
      const signInForm = document.getElementById('sign-in-form');
      const signUpForm = document.getElementById('sign-up-form');
      // setTempUserName(userName ? (userName.length > 6 ? `${userName.slice(0, 6)}..`: userName ) : 'welcome');

      if (signInForm && !signInForm.contains(event.target)) {
        setSignInClicked(false);
    setSignUpClicked(false);
        // dispable signUpError and signUpErrorText
        // setSignUpError(false);
        // setSignUpErrorText('');
      }
      if (signUpForm && !signUpForm.contains(event.target)) {
        setSignInClicked(false);
        setSignUpClicked(false);

        // dispable signUpError and signUpErrorText
        setSignUpError(false);
        // setSignInError(false);
        // setSignInErrorText('');
        setSignUpErrorText('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formError,signedIn, signInClicked, signUpClicked, signUpError, signUpErrorText, signUpError, signInErrorText, signUpErrorText, showMessage]);
  // setSignedIn(true);
  // toggle the sign in form when sign in is clicked
  const handleSignInClicked = (e) => {
    e.preventDefault();
    if (signInClicked) {
      setSignInClicked(false);
    } else {
      setSignInClicked(true);
      setSignUpClicked(false);
    }
  }
  const handleSignOutClicked = (e) => {
    e.preventDefault();
    setSignedIn(false);
    setSignInClicked(false);
    setUserTypeId('');
    setUserName('');
    setUserId('');

    setUser('Guest');
  }
  const handleSignUpClicked = (e) => {
    e.preventDefault();
    if (signUpClicked) {
      setSignUpClicked(false);

    } else {
      setSignUpClicked(true);
      setSignInClicked(false);
    }
  }

  const handleFormSignIn = async (e) => {
    e.preventDefault();

    if (name && password && password.length >= 8) {
      try {
        const response = await axios.post(endpoint + '/api/login', { name, password }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': myApiKey,
          }
        });

        if (response.status >= 200 && response.status < 300) {
          // alert(JSON.stringify(response.data));
          setUserList(response.data);

          // alert(`response.data ${JSON.stringify(response.data)}`);
          // alert(JSON.stringify(userList));
          // alert(userList);
          setSignInClicked(false);

          setUserName(name);

          setTempUserName(name ? (name.length > 10 ? `${name.slice(0, 10)}..`: name ) : 'welcome');
          setUserEmail(response.data.email);
          setUserId(response.data[0].userId);
          setUserTypeId(response.data[0].userTypeId);
          // alert(response.data[0].userTypeId);
          // response.data {"fName":"Lema","lName":"Megersa","userName":"meteley","userEmail":"meteley@gmail.com","userId":7,"userTypeId":4}
          setSignInError(false);

          // reset state variables
          // AUTHOMATICALLY signIn user after signUp

          setPassword('');
          setName('');
          setEmail('');
          setPasswordConfirm('');


          setSignedIn(true);
          // disable BusyIcon if user clicked like or deslike perior to signing in
          setSelectedKeyIndex(-1);
          // databaseChanged(true);
          setDatabaseChanged(!databaseChanged);

        }
      } catch (error) {
        formError.length = 0;
        setSignInError(true);
        setSignInClicked(true);
        console.error('Error submitting form:', error);
        if (error.response && error.response.status === 401) {
          formError.push('password Incorrect');
        } else if (error.response && error.response.status === 404) {
          formError.push('User not found');
        } else {
          formError.push('Server Error');
        }
        setSignInClicked(false);
        setSignInClicked(true);
        setSignInErrorText(formError);

      }
    } else {
      // alert("Invalid credentials");
      setSignInError(true);
      setSignInErrorText('username or password format error');

    }
  };



// codes for SignUP
  const signUpFormValidation = () => {

    // let validated = true;
    let formErrors = [];
    let formValidated = true;   // 1(username),
    // count 4  | length | name(min 1), email(min 5), password(min 8), confirmPassword(equal to password)
    if (fname.length === 0) {
      formValidated = false;
      formErrors.push(' [First name Error] ');
    }
    if (lname.length === 0) {
      formValidated = false;
      formErrors.push(' [last name Error] ');
    }
    if (name.length === 0) {
        formValidated = false;
        formErrors.push(' [user name Error] ');
    }
    if (email.length <= 5) {
        formValidated = false;
        formErrors.push(' [email length to short] ');
    }
    if (password.length < 8) {
        formValidated = false;
        formErrors.push(' [password should be at least 8 char long] ');
    }
    if (passwordConfirm !== password) {
        formValidated = false;
        formErrors.push(' [password and confirm password do not match] ');
    }

    // check if password is not the right format
    if (password.length >= 8) {
        let numberOfChars = 0;
        for(let i = 0; i < password.length; i++) {
            if ((password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) || (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122)) {
                numberOfChars++;
            }
        }
        if (numberOfChars < 2) {
            formValidated = false;
            formErrors.push(' [password should contain at least 2 alphabetic characters] ');
        }
    }
    // check email format (basic check, further validation should be done on the server)
    if (email.length > 5) {
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.indexOf('@') > email.lastIndexOf('.') || email.length - email.lastIndexOf('.') <= 1) {
            formValidated = false;
            formErrors.push(' [invalid email format] ');
        }
    }

    // const validateMail = checkMail(email);
    // if (!validateMail) {
    //   formValidated = false;
    //   formErrors.push(' [invalid email format] ');
    // }
    if (formErrors) {
      setSignUpError(true);
      setSignUpErrorText(formErrors);
    }
    return {formValidated, formErrors };
}

  const handleFormSignUp = async(e) => {
    e.preventDefault();
    // step 1 validate form
    const { formValidated, formErrors } = signUpFormValidation()

    // step 2 send form data to api

    if (formValidated) {

      try {

        const response = await axios.post(endpoint + '/api/signup', { fname, lname, name, email, password }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': myApiKey,
          }
        });

        if (response.status >= 200 && response.status < 300) {

          setSignedUp(true);
          setSignUpClicked(false);
          setShowMessage(true);


          setMessageText(`Confirmation link has been sent to this email Address ${email}`);
          //todo:  show message form saying confirm your account
          // setUserName(response.data.name);
          // setUserId(response.data.userId);
          // setUserEmail(response.data.userEmail);

          setSignUpError(false);
          setSignUpErrorText('');
          setNotification(false);

          // AUTHOMATICALLY signIn user after signUp
          // setUserName(name);
          setPassword('');
          setName('');
          // setSignedIn(true);
          setEmail('');
          setPasswordConfirm('');
        }

      } catch (error) {
        // Handle error
        if (error.response && error.response.status === 409) {
          setSignUpError(true);
          setSignUpErrorText(`User already exists`);
        } else {
          console.error('Error submitting form:', error);
        }
      }
    } else {
      // Handle form errors
      // setSignUpError(true);
      // setSignUpErrorText(formErrors);
      console.log('Form errors:', formErrors);
    }
  };

  return (
    <>

      {showMessage && (
        <div className="user-message-container">
          <div className="user-messsage-title-bar">
            <X className="user-message-close" onClick={(e) => setShowMessage(false)} /> {/* Assuming X is a component for closing the message */}
          </div>
          <div className="user-message-content">
            <span>{messageText ? messageText : 'welcome'}</span>
          </div>
        </div>
      )}

      {signedIn === false &&

      <div className="user-container">
        <div className='sign-in' id='sign-in' onClick={handleSignInClicked}>LogIn</div>
        {
        signInClicked &&
            <div className={ signInClicked && "sign-in-form"} id="sign-in-form">
            <form action="" onSubmit={handleFormSignIn}>

              <div className='form-fields'>
                {/* <div>
                  <label htmlFor="user-name" placeholder='UserName/email' > UserName </label>
                </div> */}
                {/* <div> */}
                  <input  className="input-box"  type="text" placeholder='UserName/email' name="user-name" value={name} onChange={(e)=> setName(e.target.value)}></input>
                {/* </div> */}
              </div>
              <div className='form-fields'>
                {/* <div>
                  <label htmlFor="user-password"  value={password}> Password </label>
                </div> */}
                {/* <div> */}
                  <input className="input-box" type="password" placeholder='Password' name="user-password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                {/* </div> */}
              </div>
              <div>
              <div className="form-fields">
                  <button type='submit' className="user-signin">Sign In</button>
              </div>
              <div>
                {signInError && <p> {signInErrorText}</p>}
              {/* {signInError ? ( <p className="text-alert">Provide Valide info</p>) :
              (<p className="text-info"> you can use your userName or email</p>)} */}
              </div>
              </div>
            </form>
          </div>
        }
        <div className='sign-up' id="sign-up" onClick={handleSignUpClicked}>SignUp</div>
        {
        signUpClicked &&
          <div className={ signUpClicked && "sign-up-form"} id="sign-up-form">
            <form action="" onSubmit={handleFormSignUp}>
            <div className='form-fields'>
                {/* <div>
                  <label htmlFor="user-name"  value={name}>userName </label>
                </div> */}
                {/* <div> */}
                  <input type="text" value={fname} placeholder='First Name' name="lname" onChange={(e) => setFname(e.target.value)}></input>
                {/* </div> */}
              </div>
              <div className='form-fields'>
                {/* <div>
                  <label htmlFor="user-name"  value={name}>userName </label>
                </div> */}
                {/* <div> */}
                  <input type="text" value={lname} placeholder='Last Name' name="lname" onChange={(e) => setLname(e.target.value)}></input>
                {/* </div> */}
              </div>
              <div className='form-fields'>
                {/* <div>
                  <label htmlFor="user-name"  value={name}>userName </label>
                </div> */}
                {/* <div> */}
                  <input type="text" value={name} placeholder='UserName' name="user-name" onChange={(e) => setName(e.target.value)}></input>
                {/* </div> */}
              </div>
              <div className='form-fields'>
                {/* <div >
                  <label htmlFor="user-email" > Email </label>
                </div> */}
                {/* <div> */}
                  <input type="text" value={email} name="user-email" placeholder='your Email address' onChange={(e)=> setEmail(e.target.value)}></input>
                {/* </div> */}
              </div>
              <div className='form-fields'>
                {/* <div >
                  <label htmlFor="user-password" > Password </label>
                </div> */}
                  {/* <div> */}
                    <input value={password} type="password" placeholder='Password' name="user-password" onChange={(e)=> setPassword(e.target.value)}></input>
                  {/* </div> */}
                </div>
              <div className='form-fields'>
                {/* <div>
                  <label htmlFor="user-password" > Confirm </label>
                </div> */}
                {/* <div> */}
                  <input type="password" value={passwordConfirm} name="user-password" placeholder='confirm-password' onChange={(e)=> setPasswordConfirm(e.target.value)}></input>
                {/* </div> */}
              </div>
              <div>
                <button type='submit' id="sign-up" className="user-signup">Sign Up</button>
              </div>
              <div>
                 {signUpError && <p> {signUpErrorText}</p>}

              </div>
            </form>
          </div>
        }
      </div>
      }

      {/* to be displayed after succesfully singing in */}
      {signedIn  &&

        <div className="user-container">
          {/* <div className='text-sucess user-profile'> {userName ? (userName.length > 6 ? `${userName.slice(0, 6)}..`: userName ) : null}  </div> */}
          <div className='text-sucess user-profile' onClick={(e)=> { setEditProfileClicked(true); setShowUserManagment(true); setOpenForm(false)}}> <a href="#user-managment" >{tempUserName ? tempUserName : 'Unknown'} </a> </div>
          <div className='sign-out' onClick={ (e)=>{setShowUserManagment(false); setEditProfileClicked(false); handleSignOutClicked(e)}}>SignOut</div>
        </div>
      }
    </>
  )
}
