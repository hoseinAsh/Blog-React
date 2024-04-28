import { useSelector } from "react-redux";
import { selectAllPosts, getPostsErr, getPostsStatus } from "../../redux/postsSlice";

import React from 'react'

import PostExcerpt from "./PostExcerpt";

const PostList = () => {
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const postErr = useSelector(getPostsErr)
    
    let content
    if(postStatus === 'loading') {
        content = <p>loading...</p>
    }else if(postStatus === 'success') {
        const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date));
        content = orderedPosts.map((post) => <PostExcerpt post={post} key={post.id} />)
    } else if(postStatus === 'failed') {
        content = <p>{postErr}</p>
    }



  return (
    <section className="d-flex flex-column m-3">
        <h3>Posts :</h3>
        <div className="row gap-2 justify-content-around w-100"> 
            {content}
        </div>
    </section>
  )
}

export default PostList
