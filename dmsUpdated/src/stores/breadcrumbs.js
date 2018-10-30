import { observable, action, toJS } from 'mobx';

class BreadCrumbStore {

    @observable breadcrumbs = observable.map();

    @action add(folder) {
        const folderData = folder.data !== undefined ? folder.data : folder;
        let breadcrumbs = toJS(this.breadcrumbs.values());
        breadcrumbs.push(folderData);
        this.setBreadCrumbs(breadcrumbs);
    }

    @action filterByDate(folder) {
        let filteredBreadCrumbs;
        let breadcrumbs = toJS(this.breadcrumbs.values());
        if(folder.name.length === 4) {
            filteredBreadCrumbs = breadcrumbs.filter(breadcrumb => breadcrumb.name.length === 4);
        } else {
            filteredBreadCrumbs = breadcrumbs;
        }
        this.setBreadCrumbs(filteredBreadCrumbs);
    }

    @action getBy(folder) {
        const {id} = folder;
        let breadcrumbs = toJS(this.breadcrumbs.values());
        let filteredBreadCrumbs = breadcrumbs.filter(breadcrumb => breadcrumb.folderId !== id);
        this.setBreadCrumbs(filteredBreadCrumbs);
    }

    @action clear() {
        this.breadcrumbs.clear();
    }

    setBreadCrumbs(breadcrumbs) {
        this.breadcrumbs.clear();
        breadcrumbs.forEach((breadcrumb, key) => this.breadcrumbs.set(key, breadcrumb));
    }

}

export default new BreadCrumbStore();