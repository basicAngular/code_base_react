import Vaccination from "./../models/Vaccination";
import { observable, action, computed } from "mobx";
import agent from "./../utils/api";

const LIMIT = 10;

export class VaccinationStore {

    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable vaccinationsRegistry = observable.map();
    @observable predicate = {};

    @computed get vaccinations() {
        return this.vaccinationsRegistry.values();
    };

    clear() {
        this.vaccinationsRegistry.clear();
        this.page = 0;
    }

    getVaccination(id) {
        return this.vaccinationsRegistry.get(id);
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
        if (this.predicate.myFeed) return agent.Vaccination.feed(this.page, LIMIT);
        if (this.predicate.favoritedBy) return agent.Vaccination.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
        if (this.predicate.tag) return agent.Vaccination.byTag(this.predicate.tag, this.page, LIMIT);
        if (this.predicate.author) return agent.Vaccination.byAuthor(this.predicate.author, this.page, LIMIT);
        return agent.Vaccination.all(this.page, LIMIT, this.predicate);
    }

    @action loadVaccinations() {
        this.isLoading = true;
        return this.$req()
        .then(action((vaccinations) => {
            this.vaccinationsRegistry.clear();
            vaccinations.forEach(vaccination => this.vaccinationsRegistry.set(vaccination.id, vaccination));
            this.totalPagesCount = Math.ceil(vaccinations.length / LIMIT);
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action loadVaccination(id, { acceptCached = false } = {}) {
        if (acceptCached) {
            const vaccination = this.getVaccination(id);
            if (vaccination) return Promise.resolve(vaccination);
        }
        this.isLoading = true;
        return agent.Vaccination.get(id)
        .then(action((vaccination) => {
            const vaccinationObj = Vaccination.fromApi(vaccination);
            this.vaccinationsRegistry.set(vaccination.id, vaccinationObj);
            return vaccinationObj;
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action createVaccination(vaccination) {
        return agent.Vaccination.create(vaccination)
      .then((vaccination) => {
          this.vaccinationsRegistry.set(vaccination.id, vaccination);
          return vaccination;
      });
    }

    @action updateVaccination(data) {
        return agent.Vaccination.update(data)
      .then((vaccination) => {
          this.vaccinationsRegistry.set(vaccination.id, vaccination);
          return vaccination;
      });
    }

    @action deleteVaccination(id) {
        this.vaccinationsRegistry.delete(id);
        return agent.Vaccination.del(id)
            .catch(action(err => { this.loadVaccinations(); throw err; }));
    }
}

export default new VaccinationStore();