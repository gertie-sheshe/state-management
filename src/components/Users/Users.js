import React from "react";
import { useDispatch } from "react-redux";
import { fetchUserTodos } from "../../features/usersSlice";

function Users({ users, isLoading }) {
  const dispatch = useDispatch();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleSelectChange = (e) => {
    e.preventDefault();
    dispatch(fetchUserTodos(Number(e.target.value)));
  };

  return (
    <>
      <label htmlFor="users">Choose User: </label>
      <select onChange={handleSelectChange} name="users" id="users">
        <option defaultValue>Select User</option>
        {users?.map((user) => {
          return (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Users;
