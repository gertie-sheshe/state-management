export const apiRequest = async (url) => {
  const result = await fetch(url);
  const data = await result.json();

  return data;
};
