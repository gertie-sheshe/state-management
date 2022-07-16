import React from "react";

function TodoList({ error, isLoading, data }) {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {data?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </>
  );
}

export default TodoList;
