import axiosInstance from "./axiosInstance";

const TOKEN = localStorage.getItem("auth_token");

// get request
const getRequest = async (endpoint, withJwt = false) => {
  let options = {
    method: "get",
    url: endpoint,
  };
  if (withJwt) {
    let token = TOKEN;
    options = {
      ...options,
      headers: { Authorization: `bearer ${token}` },
    };
  }
  let response = await axiosInstance(options);
  return response;
};

//* post request
const postRequest = async (endpoint, body, withJwt = false) => {
  let options = {
    url: `${endpoint}`,
    data: body,
    method: "post",
  };
  if (withJwt) {
    let token = TOKEN;
    options = {
      ...options,
      headers: { Authorization: `bearer ${token}` },
    };
  }
  let response = await axiosInstance(options);
  return response;
};

const putRequest = async (endpoint, body, withJwt = false) => {
  let options = {
    url: `${endpoint}`,
    data: body,
    method: "put",
  };
  if (withJwt) {
    let token = TOKEN;
    options = {
      ...options,
      headers: { Authorization: `bearer ${token}` },
    };
  }
  return await axiosInstance(options);
};

const DeleteRequest = async (endpoint, withJwt = false) => {
  let options = {
    url: `${endpoint}`,
    method: "delete",
  };
  if (withJwt) {
    let token = TOKEN;
    options = {
      ...options,
      headers: { Authorization: `bearer ${token}` },
    };
  }
  return await axiosInstance(options);
};

// handles uploads

const postFormData = async (endpoint, body) => {
  let token = TOKEN;
  let options = {
    method: "post",
    url: `/${endpoint}`,
    data: body,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `bearer ${token}`,
    },
  };
  return await axiosInstance(options);
};

const putFormData = async (endpoint, body) => {
  let token = TOKEN;
  let options = {
    method: "put",
    url: `${endpoint}`,
    data: body,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `bearer ${token}`,
    },
  };
  return await axiosInstance(options);
};

export {
  getRequest,
  postRequest,
  postFormData,
  putRequest,
  putFormData,
  DeleteRequest,
};
