import { Navigate, Route, Routes } from 'react-router-dom';
import AddPostForm from './features/posts/AddPostForm';
import PostList from './features/posts/PostList';
import Layout from './components/Layout';
import EditPost from './features/posts/EditPost';
import PostPage from './features/posts/PostPage';
import UserList from './features/users/UserList';
import UserPage from './features/users/UserPage';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<PostPage />} />
          <Route path='edit/:postId' element={<EditPost />} />
        </Route>

        <Route path='user'>
          <Route path='/user' element={<UserList />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>

        {/* catch all - replace with 404 component */}
        <Route path='*' element={<Navigate to='/' replace />} />

      </Route>
    </Routes>
    </div>
  );
}

export default App;
