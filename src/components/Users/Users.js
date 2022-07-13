import React from "react";

function Users({ users, handleUserChange }) {
  console.log("USERS", users);
  if (!users.length) {
    return null;
  }
  return (
    <>
      <label htmlFor="users">Choose User: </label>
      <select onChange={handleUserChange} name="users" id="users">
        <option defaultValue>Select User</option>
        {users.map((user) => {
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
