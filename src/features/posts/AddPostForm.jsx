import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAdded } from "../../redux/postsSlice";
import { selectAllUsers } from "../../redux/usersSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClick = () => {
    if(canSave) {
        try {
            setAddRequestStatus('loading')
            dispatch(postAdded(title, content, userId))
            setContent('')
            setTitle('')
        } catch(err) {
            console.log('there is an error');
        }
    }
  }

  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>{user.name}</option>
  ))
  return (
    <section style={{
      width : '70vw',
      margin : '16px auto',
      border : '1px solid grey',
      borderRadius : '8px',
      padding : '8px'
    }}>
      <h2>Add New Post</h2>
      <form action="">
        <label htmlFor="postTitle">Post Title :</label>
        <input
          type="text"
          className="form-control"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="postAuthor">Author :</label>
         <select id="postAuthor" className="form-select" value={userId} onChange={onAuthorChange}>
            <option value=""></option>
            {userOptions}
        </select>

        <label htmlFor="postContent">Post Content :</label>
        <input
          type="text"
          className="form-control"
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />

        <button className="btn btn-dark" type="button" onClick={onSavePostClick} disabled={!canSave}>
          Add Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
