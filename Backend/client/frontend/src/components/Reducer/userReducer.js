import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    signingUp: false,
    signingIn: false,
    error: null,
    user: localStorage.getItem('user'),
    token: localStorage.getItem('token'),
}

export const postUser = createAsyncThunk(
    "user/post",
    async ({ login, password }, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:3000/user", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ login, password }),
            })

            const data = await res.json()

            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            } else {
                return thunkAPI.fulfillWithValue(data)
            }
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    });


export const doLogin = createAsyncThunk(
    "user/login",
    async ({ login, password }, thunkAPI) => {
        try {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ login, password }),
            })

            const data = await res.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.user)

            if (data.error) {
                return thunkAPI.rejectWithValue(data.error)
            } else {
                return thunkAPI.fulfillWithValue(data)
            }
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logaut(state, action) {
            state.token = null;
            localStorage.clear(state.token)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postUser.fulfilled, (state, action) => {
                state.signingUp = false
                state.error = null
            })
        builder
            .addCase(postUser.rejected, (state, action) => {
                state.error = 'Такой пользователь уже существует'
            })
        builder
            .addCase(doLogin.fulfilled, (state, action) => {
                state.user = action.payload.user
                state.signingIn = false
                state.error = null
                state.token = action.payload.token
            })
        builder
            .addCase(doLogin.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export default userSlice.reducer
export const {logaut} = userSlice.actions
