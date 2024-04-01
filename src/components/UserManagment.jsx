
import {X} from 'react-bootstrap-icons';
import React, { useEffect, useState, useContext } from 'react';
import MyContext from './MyContext';

const UserManagment = () => {

  const {editProfileClicked, setEditProfileClicked} = useContext(MyContext);
  const {showUserManagment, setShowUserManagment} = useContext(MyContext);
  const { userList, setUserList} = useContext(MyContext);
  const {userTypeId} = useContext(MyContext);
  const [tempList, setTempList] = useState(userList);


useEffect(() => {
  if (userTypeId === 1 && editProfileClicked === true) {
    setTempList([userList[0]]);
  } else {
    setTempList(userList);
  }

}, [editProfileClicked]
)


  return (
    <>
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
            <th>Password | Status </th>

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
                  <input value={user.userEmail}type="text" placeholder='Email' name="Email" ></input>
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
                  <p class='user-managment-button'>Save</p>

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