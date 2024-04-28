import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/usersSlice'
import { Link } from 'react-router-dom';

const UserList = () => {

    const users = useSelector(selectAllUsers);

    const renderUsers = users.map((user) => (
        <li key={user.id} className='nav-item' style={{listStyle : 'number'}}>
            <Link to={`/user/${user.id}`} className='text-dark' style={{textDecoration : 'none'}}>{user.name}</Link>
        </li>
    ))

  return (
    <div className='nav flex-column m-3'>
        <h2>Users :</h2>
        <ul >{renderUsers}</ul>
    </div>
  )
}

export default UserList