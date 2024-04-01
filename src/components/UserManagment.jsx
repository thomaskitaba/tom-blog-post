import React from 'react';

const UserManagment = () => {
  const tempUser = {name: 'thomas kitaba', status: 'active'};


  return (
    <>
      <div className='user-management-container'>
        <div className='user-management-header'>
        <h2> manage User </h2>
        </div>
        <div className='userManagment-content'>
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
            <td><input value={`thomaskitaba`} type="text" placeholder='Fname' name="Fname" ></input></td>
            <td><input value={`thomaskitaba`} type="text" placeholder='Fname' name="Lname" ></input></td>
            <td><input value={`thomaskitaba`}type="text" placeholder='UserName' name="Username" ></input></td>
            <td><input value={`tomaskitaba@gmail.com`}type="text" placeholder='Email' name="Email" ></input></td>
            <td><input value={`thomaskitaba`}type="text" placeholder='UserName' name="Username" ></input></td>

          </tr>

        </table>

        </div>

      </div>
    </>
  )
}

export default UserManagment;