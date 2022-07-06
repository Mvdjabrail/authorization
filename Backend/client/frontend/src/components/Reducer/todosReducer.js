import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    todos: [],
    error: null,
    loading: true
}

// export default getTodo = createAsyncThunk(
//     'todo/get',
//     async ({ text, user }, thunkAPI) => {
//         try {
//             const res = await fetch("http://localhost:3000/todo")
//             const data = await res.json()

//             if (data.error) {
//                 return thunkAPI.rejectWithValue(data.error)
//             } else {
//                 return thunkAPI.fulfillWithValue(data)
//             }
//         } catch (error) {
//             thunkAPI.rejectWithValue(error)
//         }
//     }
// )
export const deleteTodos = createAsyncThunk(
    "todo/delete",
    async (el, thunkAPI) => {
        const state = thunkAPI.getState()

        try {
            await fetch(`http://localhost:3000/todo/${el._id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${state.auth.token}` }
            })
            return el._id

        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)

export const postTodos = createAsyncThunk(
    "todos/post",
    async (text, thunkAPI) => {
        const state = thunkAPI.getState()
      try {
        const res = await fetch("http://localhost:3000/todo", {
          method: "POST",
          headers: { "Content-type": "application/json", Authorization: `Bearer ${state.auth.token}` },
          body: JSON.stringify({ text }),
        });
        return res.json();
      } catch (error) {
        thunkAPI.rejectWithValue(error);
      }
    }
  );

export const fetchTodos = createAsyncThunk("todos/add", async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
        const res = await fetch(`http://localhost:3000/todo/${state.auth.user}`, {
            headers: {
                Authorization: `Bearer ${state.auth.token}`
            }
        });
        const data = await res.json();

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        } else {
            return thunkAPI.fulfillWithValue(data)
        }

    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});


export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
                state.error = null
                state.loading = true
            })
        builder
            .addCase(fetchTodos.rejected, (state, action) => {
                state.error = 'При запросе на сервер произошла ошибка'
            })
        builder
            .addCase(deleteTodos.fulfilled, (state, action) => {
                state.todos = state.todos.filter((el) => el._id !== action.payload)
            })
            builder
            .addCase(postTodos.fulfilled, (state, action)=> {
                state.todos.push(action.payload)
            })
    }
})

export default todoSlice.reducer
