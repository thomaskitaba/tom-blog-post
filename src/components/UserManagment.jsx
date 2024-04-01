import React from 'react';
import {X} from 'react-bootstrap-icons';
const UserManagment = () => {
  const tempUser = {name: 'thomas kitaba', status: 'active'};


  return (
    <>
      <div className='user-management-container'>
        <div className='user-management-header-container'>
            <div className='user-management-header'><h2> manage User </h2></div>
            <div className='user-managment-header-close '> <X  className='user-managment-close'/> </div>
        </div>
        <div className='user-managment-content'>
        <table width='100%' className="user-table">
          <tr>

            <th>Fname | Lname</th>
            <th>UserName | Email</th>
            <th>Password | Status </th>
            <th>  </th>

          </tr>
          <tr className="user-managment-column">

            <td>

              <div className="user-managment-fname-email-container">
                <div className="user-managment-fname-email">
                  <input value={`thomas`}type="text" placeholder='Firs Name' name="fname" ></input>
                </div>
                <div className="user-managment-fname-email">
                  <input value={`Kitaba`}type="text" placeholder='Last Name' name="lname" ></input>
                </div>
              </div>
            </td>

            <td>
              <div className="user-managment-fname-email-container">
                <div className="user-managment-fname-email">
                  <input value={`tomaskitaba@gmail.com`}type="text" placeholder='Email' name="Email" ></input>
                </div>
                <div className="user-managment-fname-email">
                  <input value={`thomaskitaba`}type="text" placeholder='UserName' name="Username" ></input>
                </div>
              </div>
            </td>

            <td>
              <div className="user-table-pwd-status">
                <div className="select">
                    <select className='select-status' value={`active`} >
                      <option value="active">Active</option>
                      <option value="pending">Deleted</option>
                      <option value="danger">Suspended</option>
                      <option value="deleted">Unconfirmed</option>
                    </select>
                </div>
                  <div className="password-button">
                    <p class='user-managment-button'>Change Password</p>

                  </div>
              </div>

            </td>
            <td>
                <div className="save-button"><p className='user-managment-button'> Save </p></div>
            </td>
          </tr>


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