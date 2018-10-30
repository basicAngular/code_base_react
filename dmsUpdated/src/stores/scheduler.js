import Scheduler from "./../models/Scheduler";
import { observable, action, computed } from "mobx";
import { formatDate } from "./../utils/helpers";
import agent from "./../utils/api";

const LIMIT = 10;

export class SchedulerStore {

    constructor() {
        this.getEvent = this.getEvent.bind(this);
    }

    @observable page = 0;
    @observable isLoading = false;
    @observable totalPagesCount = 0;
    @observable eventRegistry = observable.map();

    @computed get events() {
        return this.eventRegistry.values();
    };

    clear() {
        this.eventRegistry.clear();
        this.page = 0;
    };

    getEvent(id) {
        return this.eventRegistry.get(id);
    };
    

    @action loadEvents() {
        this.isLoading = true;
        this.eventRegistry.clear();
        this.isLoading = false;
        return agent.Scheduler.all()
        .then(events => {
            events.forEach(event => this.eventRegistry.set(event.id, Scheduler.fromApi(event)));
            this.totalPagesCount = Math.ceil(events.length / LIMIT);
            this.isLoading = false;
        });
        
    }

    @action createEvent(event) {
        return agent.Scheduler.create(event)
        .then(event => {
            event.start = formatDate(event.start);
            event.end = formatDate(event.end);
            this.eventRegistry.set(event.id, event);
            return event;
        });
    }

    @action updateEvent(event) {
        return agent.Scheduler.update(event)
        .then(event => {
            event.start = formatDate(event.start);
            event.end = formatDate(event.end);
            this.eventRegistry.set(event.id, event);
            return event;
        });
    }

    @action deleteEvent(id) {
        this.eventRegistry.delete(id);
        return agent.Scheduler.del(id).catch(action(err => { this.loadEvents(); throw err; }));
    }
}

export default new SchedulerStore();