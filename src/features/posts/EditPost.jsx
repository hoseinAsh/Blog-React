import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost, selectAllPosts } from '../../redux/postsSlice';
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../redux/usersSlice";

const EditPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId ] = useState('');
    const [requestStatus , setRequestStatus] = useState('idle');

    const users = useSelector(selectAllUsers);
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    const dispatch = useDispatch();

    const UserName = useSelector((state) => {
        const allUsers = selectAllUsers(state);
        return allUsers.find((user) => user.id === Number(post.userId))
    });


    

    if(!post) {
        return (
            <section>
                <h2>Post not Found!</h2>
            </section>
        )
    }

    

    const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

    const onSavePostClicked = () => {
        if(canSave) {
            try {
                setRequestStatus('pending');
                dispatch(updatePost({id : post.id, title, body : content, userId, reactions: post.reactions})).unwrap();

                setTitle('');
                setContent('');
                setUserId('');
                navigate(`/post/${post.id}`)
            } catch(err) {
                console.error('Failed to save the post', err);
            } finally {
                setRequestStatus('idle')
            }
        }
    };

    const onDeletePostClicked = () => {
        try {
            setRequestStatus('pending');
            dispatch(deletePost({id : post.id})).unwrap();

            setTitle('');
            setContent('');
            setUserId('');
            navigate('/')
        }catch(err) {
            console.log('Failed to delete the post', err);
        }finally {
            setRequestStatus('idle')
        }
    }

    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));


  return (
    <section style={{
        width : '70vw',
        margin : '16px auto',
        border : '1px solid grey',
        borderRadius : '8px',
        padding : '8px'
      }}>
        <h2>Edit Post</h2>
        <form action="">
            <label htmlFor="postTitle">Post Title :</label>
            <input className="form-control" type="text" name="postTitle" id="postTitle" value={title} onChange={(e)=> setTitle(e.target.value)} />

            <label htmlFor="postAuthor">Author :</label>
            <select className="form-select" id="postAuthor" value={userId} onChange={(e)=> setUserId(Number(e.target.value))}>
                <option key={UserName.id} value={UserName.name}> {UserName.name}</option>
                {userOptions}
            </select>

            <label htmlFor="postContent">Post Content :</label>
            <input className="form-control" type="text" name="postContent" id="postContent" value={content} onChange={(e)=> setContent(e.target.value)}/>

            <button type="button" className="btn" onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            <button type="button" className="btn btn-dark" onClick={onDeletePostClicked}>Delete Post</button>
        </form>
    </section>
  )
}

export default EditPost