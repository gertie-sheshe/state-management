import React, { useEffect } from "react";
import Users from "../Users";
import TodoList from "../TodosList";
import TodoForm from "../TodoForm";
import { usersSelectors, fetchUsers } from "../../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(usersSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="App">
      <h1>Todos</h1>
      <main>
        <Users users={users} />
        <TodoList />
        <TodoForm />
      </main>
    </div>
  );
}

export default App;
