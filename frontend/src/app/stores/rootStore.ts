

import { createContext } from "react";
import { configure } from "mobx";
import PatientStore from "./patientStore";


configure({ enforceActions: "always" });

export class RootStore {
  patientStore: PatientStore;



  constructor() {
    this.patientStore = new PatientStore(this);


  }
}

export const RootStoreContext = createContext(new RootStore());
