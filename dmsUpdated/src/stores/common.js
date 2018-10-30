
import { observable, action, reaction } from "mobx";
import api from "./../utils/api";

class CommonStore {

    @observable appName = "Conduit";
    @observable token = window.localStorage.getItem("token");
    @observable appLoaded = false;
    @observable currency ="$";
    @observable tags = [];
    @observable isLoadingTags = false;
    constructor() {
        reaction(
          () => this.token,
          token => {
              if (token) {
                  window.localStorage.setItem("token", token);
                  
              } else {
                  window.localStorage.removeItem("token");
                  
              }
          }
      );
    }

    @action loadTags() {
        this.isLoadingTags = true;
        return api.Tags.getAll()
          .then(action(({ tags }) => { this.tags = tags.map(t => t.toLowerCase()); }))
          .finally(action(() => { this.isLoadingTags = false; }));
    }

    @action setToken(token) {
        this.token = token;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }

}

export default new CommonStore();