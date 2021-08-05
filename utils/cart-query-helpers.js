export const saveCart = async (data) => {
  const url = "/api/user/cart";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  if (result.error) {
    throw new Error(result.error);
  }
  return result.data;
};
