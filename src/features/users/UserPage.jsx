import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../../redux/usersSlice'
import { selectAllPosts } from '../../redux/postsSlice'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector((state) => selectUserById(state, Number(userId)))

    const UserPosts = useSelector((state) => {
        const allPosts = selectAllPosts(state);
        return allPosts.filter((post) => post.userId === Number(userId))
    });
    const UserPostTitles = UserPosts.map((post) => (
        <li key={post.id} className='nav-item' style={{listStyle : 'number'}}>
            <Link to={`/post/${post.id}`} className='text-dark' style={{textDecoration : 'none'}}>{post.title}</Link>
        </li>
    ))

  return (
    <div  className='nav flex-column m-3'>
        <h2>{user?.name} Posts : </h2>
        <ul>{UserPostTitles}</ul>
    </div>
  )
}

export default UserPage