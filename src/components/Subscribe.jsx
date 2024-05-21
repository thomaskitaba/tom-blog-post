import {useState, useEffect, useContext} from 'react';
import MyContext from './MyContext';
import {checkEmail, checkTextExist} from './UtilityFunctions';
import {X} from 'react-bootstrap-icons';
import axios from 'axios';

const Subscribe = () => {
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorText, setErrorText] = useState('');
  const {subscribe, setSubscribe} = useContext(MyContext);
  const [email_address, setEmail_address ] =  useState('');
  const {myApiKey, endpoint} = useContext(MyContext);
  const {subscriber, setSubscriber} = useContext(MyContext);


  const handlePasswordFormClose = () => {
    // setShowPasswordEditForm(false);
    // setShowInformationEditForm(false);
    setErrorOccured(false);
    setSubscribe(false);
    // setShowUserManagment(false);
    // setSelectedKey(-1);
  }
  const handleSubscribe = async() => {
    let status = 'Subscribe';
    let formValidated = true;
    let errorList = [];
    // alert('inside handle subscrive function'); TEST

    if (checkEmail(email_address) === false) {
      formValidated = false;
      errorList.push('Email Missing');
    }
    if (checkTextExist(Fname) === false) {
      formValidated = false;
      errorList.push('Fname Missing');
    }
    if (checkTextExist(Lname) === false) {
      formValidated = false;
      errorList.push('Lname Missing');

    }
    if (formValidated === true) {
      // alert('Under development');
      setErrorOccured(false);
      setErrorText('');
      try {
      const response = await axios.post(`${endpoint}/api/subscribe`, {email_address, Fname, Lname}, {
        headers: {
          'Content-type': 'application/json',
          'x-api-key': myApiKey,
        }
      });
      setSubscribe(false);
      setErrorOccured(false);
      setErrorText('');
      alert("Succesfully subscribed to you NewsLetter");

      } catch(error) {
        // alert(JSON.stringify(error));
        setErrorText('Error occured while sending request try again');
        // setErrorText(error.error || error.message || JSON.stringify(error));

        setErrorOccured(true);
        console.log('Error occured try again');
      }
    }  else {
      setErrorOccured(true);
      setErrorText(errorList.join(', '));

    }
  }

  return (
    <>
    { subscribe ?
    <>

    <div className="change-password-form subscribe-form">
            <div className="password-change-title-bar"><X className="close-password-form" onClick={(e) => {handlePasswordFormClose()}}/> </div>
              <h4> "Join Our Community: Subscribe to Our Newsletter"</h4>
              <div><input type="text" value={Fname && Fname} placeholder="first name" name="first-name" onChange={(e)=> { setFname(e.target.value)}}></input></div>
              <div><input type="text" value={Lname && Lname} placeholder="last name" name="last-name" onChange={(e)=> setLname(e.target.value)}></input></div>
              <div><input type="text" value={email_address && email_address} placeholder="New User Name" name="confirm-password" onChange={(e)=> setEmail_address(e.target.value)}></input></div>

              <div className="user-management-error-button-container">
                <div><button onClick={(e)=> { handleSubscribe()}}> Subscribe </button></div>
                {errorOccured &&
                <>
                  <div className="user-managment-error">  {errorText} </div>
                </>
                }
              </div>

            </div>
        </> : null
}
    </>
  )
}
export default Subscribe;