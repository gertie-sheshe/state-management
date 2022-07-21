import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserTodos } from "../../utils/api";
import Users from "../Users";
import TodoList from "../TodosList";
import TodoForm from "../TodoForm";
import "./App.css";

function App() {
  const [userId, setUserId] = useState(null);

  const todos = useQuery(["userTodos", userId], () => getUserTodos(userId), {
    enabled: userId !== null,
  });

  const handleSelectChange = (e) => {
    e.preventDefault();
    setUserId(Number(e.target.value));
  };

  return (
    <div className="App">
      <h1>Todos</h1>
      <main>
        <Users handleSelectChange={handleSelectChange} />
        <TodoList {...todos} />
        <TodoForm userId={userId} />
      </main>
    </div>
  );
}

export default App;
