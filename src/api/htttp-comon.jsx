import axios from "axios";
import { BASE_URL_BACKEND } from "../data/constants";

const defaultHeaders = {
  "Content-Type": "application/json",
  withCredentials: true,
};

export const getAxiosInstance = (isFileUpload = false) => {
  if (isFileUpload) {
    return axios.create({
      baseURL: BASE_URL_BACKEND,
      headers: {
        ...defaultHeaders,
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return axios.create({
      baseURL: BASE_URL_BACKEND,
      headers: defaultHeaders,
    });
  }
};