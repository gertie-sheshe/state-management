import React from "react";
// import { useMutation, useQueryClient } from "react-query";

function TodoList({ error, isLoading, data }) {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    console.log();
  };

  return (
    <form>
      <ul style={{ listStyleType: "none" }}>
        {data?.map((todo) => (
          <li key={todo.id}>
            <input
              onChange={handleOnChange}
              id={todo.id}
              type="checkbox"
              checked={todo.completed}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default TodoList;
