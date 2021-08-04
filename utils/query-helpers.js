export const updateProfile = async (data) => {
  const url = "/api/user/profile";
  const res = await fetch(url, {
    method: "PUT",
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
export const createUser = async (data) => {
  const url = "/api/auth/signup";
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
  return result;
};

export const changePassword = async (data) => {
  const url = "/api/user/change-password";
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
  return result;
};

export const modifyAddress = async (data) => {
  function getMethod(data) {
    const PUT = !data.addressId && data.addressData;
    const PATCH = data.addressId && data.addressData;
    const DELETE = data.addressId && !data.addressData;
    if (PUT) return "PUT";
    if (PATCH) return "PATCH";
    if (DELETE) return "DELETE";
  }
  const url = "/api/user/address";
  const res = await fetch(url, {
    method: getMethod(data),
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  if (result.error) {
    throw Error(result.error);
  }
  return result.data;
};

export const getUserProfile = async () => {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Unexpected response from server!");
  const result = await res.json();

  if (!result.data) {
    throw new Error(result.error);
  }

  const userProfile = result.data;

  return userProfile;
};
