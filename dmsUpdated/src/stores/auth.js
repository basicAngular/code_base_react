import { observable, action} from "mobx";
import commonStore from "./common";
import api from "./../utils/api";

class AuthStore {
    @observable isLoading = false;
    @observable isWorking = false;
    @observable isAuthenticated;
    @observable user;
    @observable isAuthenticating;

    @observable inProgress = false;
    @observable errors = undefined;
  
    @observable loginForm = {
        email: "",
        password: "",
    };

    @observable currentUser;
    @observable loadingUser;
    @observable updatingUser;
    @observable updatingUserErrors;
  
    constructor() {
        this.isAuthenticated = false;
    }

    @action setEmail(email) {
        this.loginForm.email = email;
    }
  
    @action setPassword(password) {
        this.loginForm.password = password;
    }
  
    @action reset() {
        this.loginForm.email = "";
        this.loginForm.password = "";
    }
  
    @action login() {
        this.inProgress = true;
        this.errors = undefined;
        return api.Auth.login(this.loginForm.email, this.loginForm.password)
            .then((user) => commonStore.setToken(user.access_token))
            .then(() => this.pullUser())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                if (!this.errors) {
                    this.errors = "Es liegt ein Problem mit dem Server vor.";
                }
                throw err;
            }))
            .finally(action(() => { this.inProgress = false; }));
    }
  
    @action logout() {
        commonStore.setToken(undefined);
        this.forgetUser();
        return new Promise(res => res());
    }

    @action pullUser() {
        this.loadingUser = true;
        return api.Auth.current()
            .then(action((user) => { this.user = user; this.isAuthenticated = true; }))
            .finally(action(() => { this.loadingUser = false; }));
    }
  
    @action updateUser(newUser) {
        this.updatingUser = true;
        return api.Auth.save(newUser)
            .then(action(({ user }) => { this.currentUser = user; }))
            .finally(action(() => { this.updatingUser = false; }));
    }
  
    @action forgetUser() {
        this.currentUser = undefined;
        this.user = undefined;
        this.isAuthenticated = false;
    }
  
    @action load(id) {
        this.isLoading = true;
        return api.User.get(id)
            .then(action(user => { this.user = user; this.isAuthenticated = true; }))
            .finally(action(() => { this.isLoading = false; }));
    }
  
    @action updateProfile(userData) {
        this.isWorking = true;
        return api.Profile.update(userData)
            .then(action(user => { this.user = user; }))
            .finally(action(() => { this.isWorking = false; }));
    }

    @action updatePassword(userData) {
        this.isWorking = true;
        return api.Profile.updatePassword(userData)
            .finally(action(() => { this.isWorking = false; }));
    }

}

const authStore = new AuthStore();

export default authStore;
