const API_URL = "http://localhost:3000";
const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const apiRequest = async (url, options) => {
  const result = await fetch(url, options);
  const data = await result.json();

  return data;
};

export const getUsers = () => {
  return apiRequest(`${API_URL}/users`);
};

export const getTodos = () => {
  return apiRequest(`${API_URL}/todos`);
};

export const getUserTodos = (userId) => {
  return apiRequest(`${API_URL}/users/${userId}/todos`);
};

export const updateTodo = (todoId, data) => {
  return apiRequest(`${API_URL}/todos/${todoId}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
};

export const createTodo = (data, userId) => {
  return apiRequest(`${API_URL}/users/${userId}/todos`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data),
  });
};
