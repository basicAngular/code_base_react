import Krempler from "./../models/Krempler";
import { observable, action, computed } from "mobx";
import agent from "./../utils/api";

const LIMIT = 10;

export class KremplerStore {

    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable kremplersRegistry = observable.map();
    @observable predicate = {};

    @computed get kremplers() {
        return this.kremplersRegistry.values();
    };

    clear() {
        this.kremplersRegistry.clear();
        this.page = 0;
    }

    getKrempler(id) {
        return this.kremplersRegistry.get(id);
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
        if (this.predicate.myFeed) return agent.Krempler.feed(this.page, LIMIT);
        if (this.predicate.favoritedBy) return agent.Krempler.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
        if (this.predicate.tag) return agent.Krempler.byTag(this.predicate.tag, this.page, LIMIT);
        if (this.predicate.author) return agent.Krempler.byAuthor(this.predicate.author, this.page, LIMIT);
        return agent.Krempler.all(this.page, LIMIT, this.predicate);
    }

    @action loadKremplers() {
        this.isLoading = true;
        return this.$req()
        .then(action((kremplers) => {
            this.kremplersRegistry.clear();
            kremplers.forEach(krempler => this.kremplersRegistry.set(krempler.id, Krempler.fromApi(krempler)));
            this.totalPagesCount = Math.ceil(kremplers.length / LIMIT);
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action loadKrempler(id, { acceptCached = false } = {}) {
        if (acceptCached) {
            const krempler = this.getKrempler(id);
            if (krempler) return Promise.resolve(krempler);
        }
        this.isLoading = true;
        return agent.Krempler.get(id)
        // .then((krempler) => new Promise(resolve => setTimeout(() => resolve(krempler), 3000)))
        .then(action((krempler) => {
            const kremplerObj = Krempler.fromApi(krempler);
            this.kremplersRegistry.set(krempler.id, kremplerObj);
            return kremplerObj;
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action createKrempler(krempler) {
        return agent.Krempler.create(krempler)
      .then((krempler) => {
          this.kremplersRegistry.set(krempler.id, krempler);
          return krempler;
      });
    }

    @action updateKrempler(data) {
        return agent.Krempler.update(data)
      .then((krempler) => {
          this.kremplersRegistry.set(krempler.id, krempler);
          return krempler;
      });
    }

    @action deleteKrempler(id) {
        this.kremplersRegistry.delete(id);
        return agent.Krempler.del(id)
      .catch(action(err => { this.loadKremplers(); throw err; }));
    }
}

export default new KremplerStore();