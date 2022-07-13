import React, { useEffect, useState } from "react";
import Users from "../Users";
import TodoList from "../TodosList";
import TodoForm from "../TodoForm";
import "./App.css";

import { apiRequest } from "../../utils/api";

function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await apiRequest("http://localhost:3000/users");
      setUsers(userData);
    };

    const fetchTodos = async () => {
      const todosData = await apiRequest("http://localhost:3000/todos");
      setTodos(todosData);
    };
    fetchUsers();
    fetchTodos();
  }, []);

  const filterTodos = (userId) => {
    const result = todos.filter((todo) => todo.userId === userId);
    setSelectedTodos(result);
  };

  const handleUserChange = (e) => {
    e.preventDefault();

    const userId = Number(e.target.value);
    filterTodos(userId);
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <main>
        <Users users={users} handleUserChange={handleUserChange} />
        <TodoList todos={selectedTodos} />
        <TodoForm />
      </main>
    </div>
  );
}

export default App;
