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
  const[signedIn, setSignedIn] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [ signInInfo, setSignInInfo ] = useState('Provide your userName or email');
  const [singedUp, setSignedUp] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const [signUpClicked, setSignUpClicked] = useState(false);
  const notifications =  ['', false];
  const [name, setName ] = useState('');
  const [password, setPassword ] = useState('');


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

        setSignedIn(true);

      } else {
        // Handle failed login
        // setSignInError(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error
      // console.log(response.data);
      setSignInError(true);

    }
  } else {
    alert("missing field")
  }
  };


  const handleFormSignUp = (e) => {
    e.prventDefault();
    // code for signup goes here
    setSignedUp(true);
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
                  <input type="text" name="user-name" value={name} onChange={(e)=> setName(e.target.value)}></input>
                </div>
              </div>
              <div className='form-fields'>
                <div>
                  <label For="user-password" placeholder='Password'> Password </label>
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
                  <label For="user-name" placeholder='UserName' >userName </label>
                </div>
                <div>
                  <input type="text" name="user-name" ></input>
                </div>
              </div>
              <div className='form-fields'>
                <div >
                  <label For="user-email" placeholder='your Email address' > Email </label>
                </div>
                <div>
                  <input type="text" name="user-email" ></input>
                </div>
              </div>
              <div className='form-fields'>
                <div >
                  <label For="user-password" placeholder='Password'> Password </label>
                </div>
                <div>
                  <input type="text" name="user-password"></input>
                </div>
                </div>
              <div className='form-fields'>
                <div>
                  <label For="user-password" placeholder='Password'> Confirm </label>
                </div>
                <div>
                  <input type="text" name="user-password"></input>
                </div>
              </div>
              <div>
                <button >Sign Up</button>
              </div>
            </form>
          </div>
        }
      </div>
      }

      {/* to be displayed after succesfully singing in */}
      {signedIn === true &&

        <div className="user-container">
          <div> {signedIn ? "signedIn=true" : "signedIn=false"} </div>
          <div className='text-sucess'> Succesfully signed in </div>
          <div className='sign-out' onClick={handleSignOutClicked}>SignOut</div>
        </div>
      }
    </>
  )
}
