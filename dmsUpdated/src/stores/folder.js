import Folder from "./../models/Folder";
import { observable, action, computed } from "mobx";
import agent from "./../utils/api";

export class FolderStore {

    constructor(folderState) {
        var folders = this.foldersRegistry
        folderState.folders = observable({          
          get getFolders() {
            return folders;  
          }
        });
    }

    @observable isLoading = false;
    @observable isWorking = false;
    @observable foldersRegistry = observable.map();

    @computed get all() {
        return this.foldersRegistry.values();
    };

    clear() {
        this.foldersRegistry.clear();
    }

    get(id) {     
        return this.foldersRegistry.get(id);
    }

    $req() {
        return agent.Folder.all();
    }

    @action loadAll() {
        this.isLoading = true;
        return this.$req()
            .then(action((folders) => {
                this.foldersRegistry.clear();
                folders.forEach(folder => this.foldersRegistry.set(folder.id, folder));
            }))
            .finally(action(() => { this.isLoading = false; }));
    }

    @action load(id, { acceptCached = false } = {}) {
        if (acceptCached) {
            const folder = this.get(id);
            if (folder) return Promise.resolve(folder);
        }
        this.isLoading = true;
        return agent.Folder.get(id)
            .then(action((folder) => {
                const folderObj = Folder.fromApi(folder);
                this.foldersRegistry.set(folder.id, folderObj);
                return folderObj;
            }))
            .finally(action(() => { this.isLoading = false; }));
    }

    @action create(folder) {
        this.isWorking = true;
        return agent.Folder.create(folder)
            .then((folder) => {
                this.foldersRegistry.set(folder.id, folder);
                return folder;
            })
            .catch(err => { throw err; })
            .finally(action(() => { this.isWorking = false; }));
    }

    @action update(data) {
        this.isWorking = true;
        return agent.Folder.update(data)
            .then((folder) => {
                this.foldersRegistry.set(folder.id, folder);
                //this.load(data.id);
                return folder;
            })
            .catch(action(err => { throw err; }))
            .finally(action(() => { this.isWorking = false; }));
    }

    @action delete(id) {
        this.isWorking = true;
        this.foldersRegistry.delete(id);
        return agent.Folder.del(id)
            .then(() => this.loadAll())
            .catch(action(err => { throw err; }))
            .finally(action(() => { this.isWorking = false; }));
    }

    @action getByName(name) {
        this.isLoading = true;
        return agent.Folder.getByParam('name_like='+name).then(action((folders) => {
            this.foldersRegistry.clear();
            folders.forEach(Folder => this.foldersRegistry.set(Folder.id, Folder));
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

}

export default FolderStore;