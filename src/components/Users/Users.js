import React from "react";

function Users({ handleSelectChange, error, isLoading, data }) {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <label htmlFor="users">Choose User: </label>
      <select onChange={handleSelectChange} name="users" id="users">
        <option defaultValue>Select User</option>
        {data?.map((user) => {
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
