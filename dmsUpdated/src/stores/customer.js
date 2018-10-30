import Customer from "./../models/Customer";
import { observable, action, computed } from "mobx";
import agent from "./../utils/api";

const LIMIT = 10;

export class CustomerStore {

    @observable isLoading = false;
    @observable page = 0;
    @observable totalPagesCount = 0;
    @observable customersRegistry = observable.map();
    @observable predicate = {};

    @computed get customers() {
        return this.customersRegistry.values();
    };

    clear() {
        this.customersRegistry.clear();
        this.page = 0;
    }

    getCustomer(id) {
        return this.customersRegistry.get(id);
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
        if (this.predicate.myFeed) return agent.Customer.feed(this.page, LIMIT);
        if (this.predicate.favoritedBy) return agent.Customer.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
        if (this.predicate.tag) return agent.Customer.byTag(this.predicate.tag, this.page, LIMIT);
        if (this.predicate.author) return agent.Customer.byAuthor(this.predicate.author, this.page, LIMIT);
        return agent.Customer.all(this.page, LIMIT, this.predicate);
    }

    @action loadCustomers() {
        this.isLoading = true;
        return this.$req()
        .then(action((customers) => {
            this.customersRegistry.clear();
            customers.forEach(customer => this.customersRegistry.set(customer.id, Customer.fromApi(customer)));
            this.totalPagesCount = Math.ceil(customers.length / LIMIT);
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action loadCustomer(id, { acceptCached = false } = {}) {
        if (acceptCached) {
            const customer = this.getCustomer(id);
            if (customer) return Promise.resolve(customer);
        }
        this.isLoading = true;
        return agent.Customer.get(id)
        .then(action((customer) => {
            const customerObj = Customer.fromApi(customer);
            this.customersRegistry.set(customer.id, customerObj);
            return customerObj;
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action createCustomer(customer) {
        return agent.Customer.create(customer)
      .then((customer) => {
          this.customersRegistry.set(customer.id, customer);
          return customer;
      });
    }

    @action updateCustomer(data) {
        return agent.Customer.update(data)
      .then((customer) => {
          this.customersRegistry.set(customer.id, customer);
          return customer;
      });
    }

    @action deleteCustomer(id) {
        this.customersRegistry.delete(id);
        return agent.Customer.del(id)
      .catch(action(err => { this.loadCustomers(); throw err; }));
    }
}

export default new CustomerStore(); 