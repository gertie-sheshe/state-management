import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { getUsers, getUserTodos } from "../utils/api";

const usersAdapter = createEntityAdapter();
const todosAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return getUsers();
});

export const fetchUserTodos = createAsyncThunk(
  "users/fetchuserTodos",
  async (userId) => {
    return getUserTodos(userId);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      const usersEntries = action.payload.map((user) => {
        return { ...user, todos: todosAdapter.getInitialState() };
      });
      usersAdapter.setAll(state, usersEntries);
    },
    [fetchUserTodos.fulfilled]: (state, action) => {
      const userId = action.meta.arg;
      const userEntry = state.entities[userId];

      if (userEntry) {
        todosAdapter.setAll(userEntry.todos, action.payload);
      }
    },
  },
});

export const usersSelectors = usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
