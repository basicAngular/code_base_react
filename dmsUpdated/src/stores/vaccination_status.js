import { observable, action, computed } from "mobx";
import agent from "./../utils/api";

const LIMIT = 10;

export class VaccinationStatusStore {

    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable registry = observable.map();
    @observable predicate = {};

    @computed get all() {
        return this.registry.values();
    };

    clear() {
        this.registry.clear();
        this.page = 0;
    }

    get(id) {
        return this.registry.get(id);
    }

    @action setPage(page) {
        this.page = page;
    }

    @action setPredicate(predicate) {
        if (JSON.stringify(predicate) === JSON.stringify(this.predicate)) return;
        this.clear();
        this.predicate = predicate;
    }

    $req() {
        if (this.predicate.myFeed) return agent.VaccinationStatus.feed(this.page, LIMIT);
        if (this.predicate.favoritedBy) return agent.VaccinationStatus.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
        if (this.predicate.tag) return agent.VaccinationStatus.byTag(this.predicate.tag, this.page, LIMIT);
        if (this.predicate.author) return agent.VaccinationStatus.byAuthor(this.predicate.author, this.page, LIMIT);
        return agent.VaccinationStatus.all(this.page, LIMIT, this.predicate);
    }

    @action loadAll() {
        this.isLoading = true;
        return this.$req()
        .then(action((vaccinations) => {
            this.registry.clear();
            vaccinations.forEach(vaccination => this.registry.set(vaccination.id, vaccination));
            this.totalPagesCount = Math.ceil(vaccinations.length / LIMIT);
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action load(id, { acceptCached = false } = {}) {
        if (acceptCached) {
            const vaccination = this.get(id);
            if (vaccination) return Promise.resolve(vaccination);
        }
        this.isLoading = true;
        return agent.VaccinationStatus.get(id)
        .then(action((vaccination) => {
            this.registry.set(vaccination.id, vaccination);
            return vaccination;
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action update(data) {
        return agent.VaccinationStatus.update(data)
        .then((vaccination) => {
            this.registry.set(vaccination.id, vaccination);
            return vaccination;
        });
    }

    @action delete(id) {
        this.registry.delete(id);
        return agent.VaccinationStatus.del(id)
            .catch(action(err => { this.loadAll(); throw err; }));
    }
}

export default new VaccinationStatusStore();