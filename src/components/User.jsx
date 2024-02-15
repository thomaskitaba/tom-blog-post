import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Row, Col} from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import MyContext from './MyContext';
import axios from 'axios';
// import { Notification } from './Notification';

export const User = () => {
  // global contexts
  const { endpoint, setEndpoint}= useContext(MyContext);
  const { myApiKey, setMyApiKey } = useContext(MyContext);
  const { userName, setUserName } = useContext(MyContext);

  const[user, setUser] = useState('normal User');
  // const[signedIn, setSignedIn] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [ signInInfo, setSignInInfo ] = useState('Provide your userName or email');
  const [singedUp, setSignedUp] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [signUpClicked, setSignUpClicked] = useState(false);
  const notifications =  ['', false];
  const [name, setName ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail ] = useState('');
  const [formError, setFormError] = useState([]);
  const {notification, setNotification } = useContext(MyContext);
  const {notificationText, setNotificationText } = useContext(MyContext);
  const {signedIn, setSignedIn } = useContext(MyContext);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const signInForm = document.getElementById('sign-in-form');
      const signUpForm = document.getElementById('sign-up-form');

      if (signInForm && !signInForm.contains(event.target)) {
        setSignInClicked(false);
        setSignUpClicked(false);
      }
      if (signUpForm && !signUpForm.contains(event.target)) {
        setSignInClicked(false);
        setSignUpClicked(false);
      }
    };


    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // toggle the sign in form when sign in is clicked
  const handleSignInClicked = () => {
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
    setUser('Normal User');
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

    if (name && password) {
    try {

      const response = await axios.post(endpoint + '/api/login', { name, password }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': myApiKey,
        }

      });

      if (response.status >= 200 && response.status < 300) {
        alert(response.data);
        setUserName(name);
        setPassword('');
        setName('');
        setSignedIn(true);
        setEmail('');
        setPasswordConfirm('');

      } else {

        // setSignInError(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error
      // console.log(response.data);
      setSignInError(true);
      setUserName('Guest');
      setPassword('');
      setName('');
      setPasswordConfirm('');
      setEmail('');
    }
  } else {
    alert("missing field")
  }
  };



  const signUpFormValidation = () => {
    let result = [];
    // let validated = true;
    let formErrors = [];
    let formValidated = true;   // 1(username),
    // count 4  | length | name(min 1), email(min 5), password(min 8), confirmPassword(equal to password)
    if (name.length === 0) {
        formValidated = false;
        formErrors.push('name');
    }
    if (email.length <= 5) {
        formValidated = false;
        formErrors.push('email-length');
    }
    if (password.length < 8) {
        formValidated = false;
        formErrors.push('password should be at least 8 char long');
    }
    if (passwordConfirm !== password) {
        formValidated = false;
        formErrors.push('password and confirm password do not match');
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
            formErrors.push('password should contain at least 2 alphabetic characters');
        }
    }

    // check email format (basic check, further validation should be done on the server)
    if (email.length > 5) {
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.indexOf('@') > email.lastIndexOf('.') || email.length - email.lastIndexOf('.') <= 1) {
            formValidated = false;
            formErrors.push('invalid email format');
        }
    }

    result.push(formValidated);
    result.push(formErrors);
    return result;
}


  const handleFormSignUp = async(e) => {
    e.preventDefault();
    // step 1 validate form
    const formInfo = signUpFormValidation()
    alert(formInfo);
    // step 2 send form data to api

    if (formInfo[0]) {
      const response = await axios.post(endpoint + '/api/signup', { name, email, password }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': myApiKey,
        }
      })
      if (response.status >= 200 && response.status < 300) {
        alert(response.data);
      }


      // step 3 do whatever you want with the response

      setSignedUp(true);
    }
    // set notification  global
  }

  return (
    <>
      {signedIn === false &&

      <div className="user-container">
        <div className='sign-in' id='sign-in' onClick={handleSignInClicked}>Sign In</div>
        {
        signInClicked &&
          <div className={ signInClicked && "sign-in-form"} id="sign-in-form">
            <form action="" onSubmit={handleFormSignIn}>
              {signInError ? ( <div className="text-alert">Provide Valid info</div>) :
              (<div className="text-info"> you can use your userName or email</div>)}
              <div className='form-fields'>
                <div>
                  <label For="user-name" placeholder='UserName/email' > UserName </label>
                </div>
                <div>
                  <input type="text" placeholder='UserName/email' name="user-name" value={name} onChange={(e)=> setName(e.target.value)}></input>
                </div>
              </div>
              <div className='form-fields'>
                <div>
                  <label For="user-password" placeholder='Password' value={password}> Password </label>
                </div>
                <div>
                  <input type="text" name="user-password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
              </div>
              <div>
                  <h1>{password}</h1>
                  <h1>{name}</h1>
              <div>
                  <button type='submit'>Sign In</button>
              </div>
              </div>
            </form>

          </div>
        }
        <div className='sign-up' onClick={handleSignUpClicked}>SignUp</div>
        {
        signUpClicked &&
          <div className={ signUpClicked && "sign-up-form"} id="sign-up-form">
            <form action="" onSubmit={handleFormSignUp}>
              <div className='form-fields'>
                <div>
                  <label For="user-name"  value={name}>userName </label>
                </div>
                <div>
                  <input type="text" value={name} placeholder='UserName' name="user-name" onChange={(e) => setName(e.target.value)}></input>
                </div>
              </div>
              <div className='form-fields'>
                <div >
                  <label For="user-email" > Email </label>
                </div>
                <div>
                  <input type="text" value={email} name="user-email" placeholder='your Email address' onChange={(e)=> setEmail(e.target.value)}></input>
                </div>
              </div>
              <div className='form-fields'>
                <div >
                  <label For="user-password" > Password </label>
                </div>
                <div>
                  <input value={password} type="text" placeholder='Password' name="user-password" onChange={(e)=> setPassword(e.target.value)}></input>
                </div>
                </div>
              <div className='form-fields'>
                <div>
                  <label For="user-password" > Confirm </label>
                </div>
                <div>
                  <input type="text" value={passwordConfirm} name="user-password" placeholder='confirm-password' onChange={(e)=> setPasswordConfirm(e.target.value)}></input>
                </div>
              </div>
              <div>
                <button type='submit'>Sign Up</button>
              </div>
            </form>
          </div>
        }
      </div>
      }

      {/* to be displayed after succesfully singing in */}
      {signedIn === true &&

        <div className="user-container">
          { /*<div> {signedIn ? "signedIn=true" : "signedIn=false"} </div> */}
          <div className='text-sucess'> Signed in </div>
          <div className='sign-out' onClick={handleSignOutClicked}>SignOut</div>
        </div>
      }
    </>
  )
}
