import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const initialState = {
  status: "idle",
  posts: [],
  error: "",
  count : 0
};

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const getPosts = createAsyncThunk('post/fetchPosts', async () => {
    try {
        const res = await fetch(POST_URL);
        const data = await res.json();
        return data
    } catch(err) {
        console.log(err.massage);
    }
})

export const addNewPost = createAsyncThunk('post/addNewPost', async (initialPost) => {
    try {
        const res = await axios.post(POST_URL, initialPost);
        return res.data
    } catch (error) {
        console.log(error.massage);
    }
})

export const updatePost = createAsyncThunk('post/updatePost', async(initialPost) => {
    const {id} = initialPost
    try {
        const res = await axios.put(`${POST_URL}/${id}`, initialPost);
        return res.data;
    } catch (err) {
        console.log(err.massage);
        return initialPost
    }
})

export const deletePost = createAsyncThunk('post/deletePost', async(initialPost) => {
    const {id} = initialPost;
    try {
        const res = await axios.delete(`${POST_URL}/${id}`);
        if(res?.status === 200) {
            return initialPost
        } else {
            return `${res.status} : ${res.statusText}`
        }
    } catch (error) {
        console.log(error);
    }
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded : {
        reducer : (state, action) => {
            state.posts.push(action.payload)
        },
        prepare(title, content, userId) {
            return {
                payload : {
                    id : nanoid(),
                    title,
                    content,
                    date : new Date().toISOString(),
                    userId,
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                }
            }
        }
    },
    reactionsAdded : (state, action) => {
        const existingPost = state.posts.find(
            (post) => post.id === action.payload.postId
        );
        if(existingPost) {
            existingPost.reactions[action.payload.reaction]++
        }
    },
    increaseCount : (state) => {
        state.count = state.count + 1
    }
  },
  extraReducers(builder) {
    builder
        .addCase(getPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(getPosts.fulfilled, (state, action) => {
            state.status = 'success'

            let min = 1
            const loadedPosts = action.payload.map((post) => {
                post.date = sub(new Date(), {minutes : min++}).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                }
                return post
            });
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(getPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId);
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
                thumbsUp:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0
            };
            console.log(action.payload);
            state.posts.push(action.payload)
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            if(!action.payload?.id) {
                console.log('update could not complete');
                console.log(action.payload);
                return
            }
            const {id} = action.payload;
            action.payload.date = new Date().toISOString();
            const posts = state.posts.filter((post) => post.id !== id);
            state.posts = [...posts, action.payload]
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            if(!action.payload?.id) {
                console.log('delete could not complete');
                console.log(action.payload);
                return
            }
            const { id } = action.payload;
            const posts = state.posts.filter((post) => post.id !== id);
            state.posts = posts
        })
  }
});

export const {postAdded, reactionsAdded, increaseCount} = postsSlice.actions
export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status;
export const getPostsErr = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

export default postsSlice.reducer;
