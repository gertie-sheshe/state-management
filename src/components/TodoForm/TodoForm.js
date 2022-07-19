import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "../../utils/api";

function TodoForm({ userId }) {
  const [todo, setTodo] = useState("");
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation(
    (options) => {
      const { data, id } = options;
      return createTodo(data, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userTodos");
        setTodo("");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      title: todo,
      completed: false,
    };

    addTodoMutation.mutate({ data: newTodo, id: userId });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <label style={{ marginRight: "10px" }} htmlFor="todo">
          Add Todo:
        </label>
        <input
          disabled={!userId}
          id="todo"
          type="text"
          value={todo}
          onChange={handleOnChange}
        />
        <button disabled={!userId} style={{ marginLeft: "5px" }} type="submit">
          Add
        </button>
      </form>
      {addTodoMutation.error && <p>Error: {addTodoMutation.error}</p>}
      {addTodoMutation.isLoading && <p>Adding Todo...</p>}
    </div>
  );
}

export default TodoForm;
