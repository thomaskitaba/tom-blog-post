
import {X, Pencil, Gear, Save} from 'react-bootstrap-icons';
import React, { useEffect, useState, useContext } from 'react';
import MyContext from './MyContext';
import {checkIfPasswordCorrect} from './UtilityFunctions';
import axios from 'axios';

const UserManagment = () => {
  const {endpoint , setEndpoint} = useContext(MyContext);
  const {editProfileClicked, setEditProfileClicked} = useContext(MyContext);
  const {showUserManagment, setShowUserManagment} = useContext(MyContext);
  const { userList, setUserList} = useContext(MyContext);
  const {userTypeId} = useContext(MyContext);
  const [tempList, setTempList] = useState(userList);
  const [showPasswordEditForm, setShowPasswordEditForm ] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorOccured, setErrorOccured] = useState(false);
  const [errorText, setErrorText] = useState('');

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

const handlePasswordChange = async() => {
  let formValidated = true;
  let errorList = [];

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
    errorList.push("Empty onfirmation");
  }
  if (checkIfPasswordCorrect(oldPassword) === 'composition-error') {
    formValidated = false;
    alert('compostion-error');
    errorList.push("Password mustContain at least 2 letters");
  }
  if (checkIfPasswordCorrect(oldPassword) === 'size-error') {
    formValidated = false;
    alert('size-error');
    errorList.push("New password must be at least 8 characters long");
  }
  if (newPassword !== confirmPassword) {
    formValidated = false
    errorList.push("Mismatching confirmation password");
    alert('password dont match');
  }

  if (oldPassword === newPassword) {
    formValidated = false;
    errorList.push("New Password can't be the same as the old one");
  }
  if (formValidated === true) {
    // try {
    //   const response = await axios.post(`${endpoint}/api/changePassword`, {
    // userId, userName, oldPassword, newPassword}, {
    //   headers: {
    //     'Content-header': 'application/json',
    //     'x-api-key': myApiKey,
    //   }
    // });
    try {
    const response = await axios.post(endpoint + '/api/changePassword', { userId, userName, oldPassword, newPassword }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': myApiKey,
      }
    });
    setErrorOccured(false);
    setErrorText('');
    alert(response.data.message);
    // alert(JSON.stringify(response.data));
    } catch(error) {
      // console.log(error);
      // setErrorOccured(true);
      // errorList.push(error);
      // setErrorText(errorList);
      alert("error occured");
    }
  } else {
    setErrorOccured(true);
    setErrorText(errorList.join(', '));
    alert(errorText);
  }
}
  return (
    <>
      {showPasswordEditForm &&
      <>
          <div className="change-password-form">
          <div className="password-change-title-bar"><X className="close-password-form" onClick={(e) =>setShowPasswordEditForm(false)}/> </div>
            <div><input value={oldPassword} placeholder="old password" name="old-password" onChange={(e)=> setOldPassword(e.target.value)}></input></div>
            <div><input value={newPassword} placeholder="new password" name="new-password" onChange={(e)=> setNewPassword(e.target.value)}></input></div>
            <div><input value={confirmPassword} placeholder="confirm password" name="confirm-password" onChange={(e)=> setConfirmPassword(e.target.value)}></input></div>
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
            <div className='user-managment-header-close '> <X  className='user-managment-close' onClick={(e) => setShowUserManagment(false)}/> </div>
        </div>
        <div className='user-managment-content'>
        <table width='100%' className="user-table">
          <tr>

            <th>Fname | Lname</th>
            <th>UserName | Email</th>
            <th> Status </th>

          </tr>
          {
          tempList.map((user, userIndex) =>(

          <tr className="user-managment-column">
            <td>

              <div className="user-managment-fname-email-container">
                <div className="user-managment-fname-email">
                  <input value={user.fName}type="text" placeholder='Firs Name' name="fname" ></input>
                </div>
                <div className="user-managment-fname-email">
                  <input value={user.lName}type="text" placeholder='Last Name' name="lname" ></input>
                </div>
              </div>
            </td>

            <td>
              <div className="user-managment-fname-email-container">
                <div className="user-managment-fname-email">
                  {/* <input value={user.userEmail}type="text" placeholder='Email' name="Email" ></input> */}
                  <div className="contribute-button-password"  onClick={ (e) => {setEditProfileClicked(false); setShowUserManagment(true); }}> <p onClick={(e)=> {setShowPasswordEditForm(true)}}>Change Password</p></div>
                </div>
                <div className="user-managment-fname-email">
                  <input value={user.userName}type="text" placeholder='UserName' name="Username" ></input>
                </div>
              </div>
            </td>

            <td>
              <div className="user-table-pwd-status">
                <div className="select">
                    <select className='select-status' value={user.status} >
                      <option value={user.userStatus}>{user.userStatus}</option>
                      <option value="active">Active</option>
                      <option value="pending">Deleted</option>
                      <option value="danger">Suspended</option>
                      <option value="deleted">Unconfirmed</option>
                    </select>
                </div>
                <div className="password-button">
                <div className="contribute-button-2"  onClick={ (e) => {setEditProfileClicked(false); setShowUserManagment(true); }}> <p><Save className="save-2"/>Save</p></div>
                  {/* <p class='user-managment-button'>Save</p> */}

                </div>
              </div>

            </td>
            {/* <td>
                <div className="save-button"><p className='user-managment-button'> Save </p></div>
            </td> */}
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
{/* <div className='userManagment-content'>
<table width='100%'>
  <tr>
    <th>id</th>
    <th>Fname</th>
    <th>Lname</th>
    <th>User Name</th>
    <th>Email</th>
    <th>Status</th>
  </tr>
  <tr className="user-managment-column">

    <td>1</td>
    <td><input value={`thomaskitaba`} type="text" placeholder='Fname' name="Lname" ></input></td>
    <td><input value={`thomaskitaba`}type="text" placeholder='UserName' name="Username" ></input></td>
    <td><input value={`tomaskitaba@gmail.com`}type="text" placeholder='Email' name="Email" ></input></td>
    <td><input value={`thomaskitaba`}type="text" placeholder='UserName' name="Username" ></input></td>
    <td><input value={`Active`}type="text" placeholder='Status' name="Username" ></input></td>
  </tr>
  <tr calssName="user-management-column-buttons" >
    <td colspan='4'>

      <div className= "user-managment-buttons">
          <div className='user-button'>Change Password</div>
           <div className='user-button'> Save </div>
      </div>



    </td>

  </tr>

</table>

</div> */}