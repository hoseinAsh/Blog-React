import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    users : []
}

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = createAsyncThunk('user/fetchUsers', async () => {
    try {
        const response = await fetch(USERS_URL);
        const data = await response.json()
        return data
    } catch(err) {
        console.log(err.massage);
    }
})

const usersSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {},
    extraReducers(builder) {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = state.users.concat(action.payload)
            })
    }
});




export const selectAllUsers = (state) => state.users.users
export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer
