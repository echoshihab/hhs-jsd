import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { IPatientEnvelope, IPatientFormValues } from "../models/patient";
import { IUser, IUserFormValues } from "../models/user";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error!");
  }

  const { status, config } = error.response;

  if (status === 404) {
      history.push("/notfound");
  }

  if (status === 401) {
    window.localStorage.removeItem("jwt");
    history.push("/");
    toast.error("Unauthorized, please login");
    return Promise.reject(error);
  }

  if (
    status === 400 && config.method === "get"
  ) {
    toast.error("Bad Request");
  }
  
  if (status === 500) {
    toast.error("Server error!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
}

const Patients = {
  list: (): Promise<IPatientEnvelope> =>
    axios
      .get("/patients")
      .then(responseBody),
  create: (patient: IPatientFormValues) => requests.post("/patients", patient),

};

const User = {
  current: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};


export default {
  Patients,
  User
}
