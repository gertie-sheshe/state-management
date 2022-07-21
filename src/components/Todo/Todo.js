import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateTodo } from "../../utils/api";

function Todo({ todo }) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const [isDisabled, setIsDisabled] = useState(false);
  const isInitialMount = useRef(true);
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation(
    (options) => {
      const { data, id } = options;
      updateTodo(data, id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userTodos", todo.userId);
        setIsDisabled(!isDisabled);
      },
    }
  );

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const updatedTodo = { ...todo, completed: isChecked };
      updateTodoMutation.mutate({ data: updatedTodo, id: todo.id });
    }
  }, [isChecked]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setIsDisabled(!isDisabled);
  };

  return (
    <li key={todo.id}>
      <input
        disabled={isDisabled}
        onChange={handleOnChange}
        id={todo.id}
        type="checkbox"
        checked={isChecked}
      />
      <label htmlFor={todo.id}>{todo.title}</label>
    </li>
  );
}

export default Todo;
