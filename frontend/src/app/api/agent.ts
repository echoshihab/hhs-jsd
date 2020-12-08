import axios, { AxiosResponse } from "axios";
import { IPatient, IPatientEnvelope, IPatientFormValues } from "../models/patient";



axios.defaults.baseURL = process.env.REACT_APP_API_URL;



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

export default {
  Patients
}
