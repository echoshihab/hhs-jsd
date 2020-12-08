import { RootStore } from "./rootStore";
import { observable, action, reaction, makeObservable } from "mobx";

export default class CommonStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );

  }

  @observable token: string | null = window.localStorage.getItem("jwt");

  @action setToken = (token: string | null) => {
    this.token = token;
  };



  @observable appLoaded = false;
  @action setAppLoaded = () => {
    this.appLoaded = true;
  };
}
