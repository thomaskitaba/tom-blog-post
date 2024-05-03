
import {X, PencilFill, Gear, Save} from 'react-bootstrap-icons';
import React, { useEffect, useState, useContext } from 'react';
import MyContext from './MyContext';
import {checkIfPasswordCorrect} from './UtilityFunctions';
import axios from 'axios';
import {Popup} from './Popup';


const UserManagment = () => {
  const { databaseChanged, setDatabaseChanged } = useContext(MyContext);
  const {endpoint , setEndpoint} = useContext(MyContext);
  const {editProfileClicked, setEditProfileClicked} = useContext(MyContext);
  const {showUserManagment, setShowUserManagment} = useContext(MyContext);
  const [showUserManagmentError, setShowUserManagmentError] = useState(false);
  const [userManagmentErrorText, setUserManagmentErrorText] = useState('');
  const {openForm, setOpenForm} = useContext(MyContext);
  const { userList, setUserList} = useContext(MyContext);
  const {userTypeId} = useContext(MyContext);
  const [tempList, setTempList] = useState(userList);
  const [showPasswordEditForm, setShowPasswordEditForm ] = useState(false);
  const [showInformationEditForm, setShowInformationEditForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [selectedKey, setSelectedKey] = useState(-1);
  const [oldFname, setOldFname] = useState('');
  const [oldLname, setOldLname] = useState('');
  const [newFname, setNewFname] = useState('');
  const [newLname, setNewLname] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const {userId, setUserId} = useContext(MyContext);
  const {userName, setUserName} = useContext(MyContext);
  const {myApiKey} = useContext(MyContext);


useEffect(() => {
  if (userTypeId === 1 && editProfileClicked === true) {
    setTempList([userList[0]]);
  } else {
    setTempList(userList);
  }
}, [editProfileClicked]
)
const handleUserEdit = async (e) => {
  let formValidated = true;
  let errorList = [];


  setErrorText('');

  console.log(oldFname);
  if (oldFname === newFname && oldLname === newLname && newUserName === userName) {
    formValidated = false;
    // alert('no data changed');
    errorList.push('No changes detected');
  }

  if (newFname === '') {
    errorList.push('Missing First Name');
    formValidated = false;
    // alert('validating name');
  }
  if (newLname === '') {

    errorList.push('Missing Last Name');
    formValidated = false;
    // alert('validating name');
  }
  if (newUserName === '') {
    errorList.push('Missing UserName');
    formValidated = false;
    // alert('validating username');
  }
  if (formValidated === true) {
    alert(`Data Validated: ${newFname} ${newLname} ${newUserName}`);
    try {
      const response = await axios.post(`${endpoint}/api/edituserinfo`, {userId, newFname, newLname, newUserName, userName}, {
     headers: {
        'Content-type': 'application/json',
        'x-api-key': myApiKey,
     }
    })
      alert(response.data.message);
    } catch(error) {
      // alert(`Error: ${error.error}`)
    }

    setErrorOccured(false);
    setEditMode(false);
    setDatabaseChanged(!databaseChanged);
    // reset old values
    setOldFname('');
    setOldLname('');
  }
  else {
    // alert('userDataError'); test
    setErrorOccured(true);
    setErrorText(errorList.join(', '));
    // alert(`${userManagmentErrorText}`);
    console.log(`${userManagmentErrorText}`);
  }
}

const handlePasswordChange = async () => {
  // alert(`${userName}  ${userId} ${oldPassword} ${newPassword}`); TEST
  let formValidated = true;
  let errorList = [];
  setErrorText('');
  if (oldPassword === '') {
    formValidated = false;
    errorList.push("Empty old password");
  }
  if (newPassword === '') {
    formValidated = false;
    errorList.push("Empty new password");
  }
  if (confirmPassword === '') {
    formValidated = false;
    errorList.push("Empty Confirmation");
  }
  if (checkIfPasswordCorrect(newPassword) === 'composition-error') {
    formValidated = false;
    // alert('compostion-error');
    errorList.push("Password mustContain at least 2 letters");
  }
  if (checkIfPasswordCorrect(newPassword) === 'size-error') {
    formValidated = false;
    // alert('size-error');
    errorList.push("New password must be at least 8 characters long");
  }
  if (newPassword !== confirmPassword) {
    formValidated = false
    errorList.push("Mismatching confirmation password");
    // alert('password dont match');
  }

  if (oldPassword === newPassword) {
    formValidated = false;
    errorList.push("New Password can't be the same as the old one");
  }
  if (formValidated === true) {
    // alert('Under development');
    setErrorOccured(false);
    setErrorText('');
    try {
    const response = await axios.post(endpoint + '/api/changePassword', { userId, userName, oldPassword, newPassword }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': myApiKey,
      }
    });
    alert(response.data.message);
    setErrorOccured(false);
    setErrorText(`password changed to ${newPassword}`);
    setErrorText('');
    // alert(response.data.message);

    // alert(JSON.stringify(response.data));
    } catch(error) {
      console.log(error);
      // setErrorOccured(true);
      // errorList.push(error);
      // setErrorText(errorList);
      // alert("error occured");
    }
  } else {
    setErrorOccured(true);
    setErrorText(errorList.join(', '));
    // alert(errorText);
  }
}

const handlePasswordFormClose = () => {
  setShowPasswordEditForm(false);
  setShowInformationEditForm(false);
  setErrorOccured(false);
  // setShowUserManagment(false);
  setSelectedKey(-1);

}
const handleUserManagementClose = (e) => {
  setSelectedKey(-1);
  setShowUserManagment(false);
  setOpenForm(false);
  setShowPasswordEditForm(false);
  setShowInformationEditForm(false);
}
const handleInputClicked = (e) => {

  setNewFname(prev => `${prev}${user.user.fName}`);
  setNewLname(prev =>`${prev}${user.user.lName}`);
  setNewUserName(prev =>`${prev}${user.user.userName}`);
  setNewFname(prev => `${prev}${user.userfName}`);
  setEditMode(true);


}
  return (
    <>
      { showInformationEditForm &&
      <>
          <div className="change-password-form">
          <div className="password-change-title-bar"><X className="close-password-form" onClick={(e) => {handlePasswordFormClose()}}/> </div>
            <div><input type="text" value={newFname && newFname} placeholder="first name" name="first-name" onChange={(e)=> { setNewFname(e.target.value)}}></input></div>
            <div><input type="text" value={newLname && newLname} placeholder="last name" name="last-name" onChange={(e)=> setNewLname(e.target.value)}></input></div>
            <div><input type="text" value={newUserName && newUserName} placeholder="New User Name" name="confirm-password" onChange={(e)=> setNewUserName(e.target.value)}></input></div>

            <div className="user-management-error-button-container">
              <div><button onClick={(e)=> { handleUserEdit()}}> Change </button></div>
              {errorOccured &&
              <>
                <div className="user-managment-error">  {errorText} </div>
              </>
              }
            </div>

          </div>
      </>
      }
      { showPasswordEditForm &&
      <>
          <div className="change-password-form">
          <div className="password-change-title-bar"><X className="close-password-form" onClick={(e) => {handlePasswordFormClose()}}/> </div>
            <div><input type="password" value={oldPassword} placeholder="old password" name="old-password" onChange={(e)=> setOldPassword(e.target.value)}></input></div>
            <div><input type="password" value={newPassword} placeholder="new password" name="new-password" onChange={(e)=> setNewPassword(e.target.value)}></input></div>
            <div><input type="password" value={confirmPassword} placeholder="confirm password" name="confirm-password" onChange={(e)=> setConfirmPassword(e.target.value)}></input></div>
            <div className="user-management-error-button-container">
              <div><button onClick={(e)=> handlePasswordChange()}> Change </button></div>
              {errorOccured &&
              <>
                <div className="user-managment-error">  {errorText} </div>
              </>
              }
            </div>
          </div>
      </>
      }
      <div className='user-management-container' style = {editProfileClicked ? {position: 'fixed', top: '40%'} : {}}>
        <div className='user-management-header-container'>
            <div className='user-management-header'><h2 id="user-managment"> manage User </h2></div>
            <div className='user-managment-header-close '> <X  className='user-managment-close' onClick={(e) => {handleUserManagementClose(e)}}/> </div>
        </div>
        <div className='user-managment-content'>
        <table width='100%' className="user-table">
          <tr>
            <th>Fname | Lname | UserName</th>
            {/* <th>UserName | Email</th> */}
            <th> Manage information </th>
          </tr>
          {
          tempList.map((user, userIndex) =>(

            <tr key={userIndex} className="user-managment-column" style={showUserManagmentError && (userIndex === selectedKey) ? {marginBottom: '10px', backgroundColor: 'red', borderBottom: '2px solid white'} : {marginBottom: '10px', borderBottom: '2px solid white'}}>
              <td>
                <div className="user-managment-fname-email-container">
                  <div key={userIndex} className="user-managment-fname-email" >

                    {user.fName}
                  </div>
                  <div key={userIndex} className="user-managment-fname-email">
                      {user.lName}
                  </div>
                  <div key={userIndex} className="user-managment-fname-email">

                       {user.userName}
                  </div>
                </div>
              </td>

              <td>
                <div className="user-table-pwd-status" >
                { editProfileClicked &&
                <>
                    <div className="contribute-button-password"  onClick={ (e) => {setSelectedKey(userIndex); setShowUserManagment(true); setShowPasswordEditForm(true); setShowInformationEditForm(false);}}> <p >Change Password</p></div>
                  <div className="contribute-button-password" onClick={(e) => {setSelectedKey(userIndex); setOldFname(user.fName); setShowPasswordEditForm(false); setOldLname(user.lName); setShowInformationEditForm(true);}} >
                      <p > Edit user Information</p>
                  </div>
                  </>
}


                </div>
              </td>

            </tr>


      )
      )}
        </table>

        </div>
      </div>
    </>
  )
}

export default UserManagment;
