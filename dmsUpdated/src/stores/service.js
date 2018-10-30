import Service from "./../models/Service";
import { observable, action, computed } from "mobx";
import { formatDate } from "./../utils/helpers";
import agent from "./../utils/api";

const LIMIT = 10;

export class ServiceStore {

    constructor() {
        this.getService = this.getService.bind(this);
    }

    @observable page = 0;
    @observable isLoading = false;
    @observable totalPagesCount = 0;
    @observable servicesRegistry = observable.map();

    @computed get services() {
        return this.servicesRegistry.values();
    };

    clear() {
        this.servicesRegistry.clear();
        this.page = 0;
    };

    getService(id) {
        return this.servicesRegistry.get(id);
    };

    @action loadServices() {
        this.isLoading = true;
        this.servicesRegistry.clear();
        return agent.Service.all()
        .then(services => {
            if(services!==null){
                services.forEach(service => this.servicesRegistry.set(service.id, Service.fromApi(service)));
                this.totalPagesCount = Math.ceil(services.length / LIMIT);
                this.isLoading = false;
            }
            
        });
    }

    @action createService(service) {
        return agent.Service.create(service)
        .then(service => {
            service.contract_start = formatDate(service.contract_start.date);
            service.cancellation_date = formatDate(service.cancellation_date.date);
            this.servicesRegistry.set(service.id, service);
            return service;
        });
    }

    @action updateService(service) {
        return agent.Service.update(service)
        .then(service => {
            service.contract_start = formatDate(service.contract_start.date);
            service.cancellation_date = formatDate(service.cancellation_date.date);
            this.servicesRegistry.set(service.id, service);
            return service;
        });
    }

    @action deleteService(id) {
        this.servicesRegistry.delete(id);
        return agent.Service.del(id).catch(action(err => { this.loadServices(); throw err; }));
    }
}

export default new ServiceStore();