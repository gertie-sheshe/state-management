const API_URL = "http://localhost:3000";

export const apiRequest = async (url) => {
  const result = await fetch(url);
  const data = await result.json();

  return data;
};

export const getUsers = async () => {
  const url = `${API_URL}/users`;
  const data = await apiRequest(url);

  return data;
};

export const getTodos = async () => {
  const url = `${API_URL}/todos`;
  const data = await apiRequest(url);

  return data;
};

export const getUserTodos = async (userId) => {
  const url = `${API_URL}/users/${userId}/todos`;
  const data = await apiRequest(url);

  return data;
};
