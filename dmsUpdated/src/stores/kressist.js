import Kressist from "./../models/Kressist";
import { observable, action, computed } from "mobx";
import agent from "./../utils/api";

const LIMIT = 10;

export class KressistStore {

    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable kressistsRegistry = observable.map();
    @observable predicate = {};

    @computed get kressists() {
        return this.kressistsRegistry.values();
    };

    clear() {
        this.kressistsRegistry.clear();
        this.page = 0;
    }

    getKressist(id) {
        return this.kressistsRegistry.get(id);
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
        if (this.predicate.myFeed) return agent.Kressist.feed(this.page, LIMIT);
        if (this.predicate.favoritedBy) return agent.Kressist.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
        if (this.predicate.tag) return agent.Kressist.byTag(this.predicate.tag, this.page, LIMIT);
        if (this.predicate.author) return agent.Kressist.byAuthor(this.predicate.author, this.page, LIMIT);
        return agent.Kressist.all(this.page, LIMIT, this.predicate);
    }

    @action loadKressists() {
        this.isLoading = true;
        return this.$req()
        .then(action((kressists) => {
            this.kressistsRegistry.clear();
            kressists.forEach(kressist => this.kressistsRegistry.set(kressist.id, Kressist.fromApi(kressist)));
            this.totalPagesCount = Math.ceil(kressists.length / LIMIT);
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action loadKressist(id, { acceptCached = false } = {}) {
        if (acceptCached) {
            const kressist = this.getKressist(id);
            if (kressist) return Promise.resolve(kressist);
        }
        this.isLoading = true;
        return agent.Kressist.get(id)
        // .then((kressist) => new Promise(resolve => setTimeout(() => resolve(kressist), 3000)))
        .then(action((kressist) => {
            const kressistObj = Kressist.fromApi(kressist);
            this.kressistsRegistry.set(kressist.id, kressistObj);
            return kressistObj;
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action createKressist(kressist) {
        return agent.Kressist.create(kressist)
      .then((kressist) => {
          this.kressistsRegistry.set(kressist.id, kressist);
          return kressist;
      });
    }

    @action updateKressist(data) {
        return agent.Kressist.update(data)
      .then((kressist) => {
          this.kressistsRegistry.set(kressist.id, kressist);
          return kressist;
      });
    }

    @action deleteKressist(id) {
        this.kressistsRegistry.delete(id);
        return agent.Kressist.del(id)
      .catch(action(err => { this.loadKressists(); throw err; }));
    }
}

export default new KressistStore();