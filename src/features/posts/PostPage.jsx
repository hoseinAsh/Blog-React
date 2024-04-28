import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from '../../redux/postsSlice'
import { Link, useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostPage = () => {
  const {postId} = useParams()
  const post = useSelector((state) => selectPostById(state, Number(postId)))

  if(!post) {
    return (
      <section>
        <h2>Post not Found!!!</h2>
      </section>
    )
  }


  return (
    <div style={{
      width : '70vw',
      margin : '16px auto',
      border : '1px solid grey',
      borderRadius : '8px',
      padding : '8px'
    }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className='postCredit'>
        <Link to={`/post/edit/${postId}`}>Edit Post</Link>
        <PostAuthor userId={post.userId}/>
        <TimeAgo timestamp={post.date}/>
      </p>
      <ReactionButtons post={post}/>
    </div>
  )
}

export default PostPage