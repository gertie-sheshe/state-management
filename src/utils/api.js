const API_URL = "http://localhost:3000";

export const apiRequest = async (url) => {
  const result = await fetch(url);
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
