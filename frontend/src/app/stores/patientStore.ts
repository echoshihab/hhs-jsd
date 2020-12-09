import {
  observable,
  action,
  runInAction,
  makeObservable,
  computed,
} from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import { IPatientFormValues } from "../models/patient";
import { RootStore } from "./rootStore";



export default class PatientStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;

    

  }

  @observable patientsRegistry = new Map();
 
  @observable patientsCount = 0;

  @observable submitting = false;

  @computed get patients(){
     const test = Array.from(this.patientsRegistry.values())
     return test;
  }

  @action loadPatients = async () => {
    try {
      const patientsEnvelope = await agent.Patients.list();
      const {patients, patientsCount} = patientsEnvelope;
      runInAction(() => {
        patients.forEach((patient) => {
          this.patientsRegistry.set(patient.id, patient);
     
        });
        
        this.patientsCount = patientsCount;
      });
    } catch (error) {
      throw error;
    }
   
  };

  @action createPatient = async (patient: IPatientFormValues) => {
    this.submitting = true;
    try {
      patient.healthCardNumber = parseInt(patient.healthCardNumber.toString());
      await agent.Patients.create(patient);
      runInAction(() => {
        this.loadPatients();
      });
      history.push("/dashboard");
    } catch (error) {
      if (error.status === 409)
        toast.error(`${error.data.errors.patient}!`)
      else{
        throw error;
      }
    }
    runInAction(() => {
      this.submitting = false;
    });
  };






}
 

  