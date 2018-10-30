import { observable, action } from "mobx";
import Validator from "validatorjs";

class KressistFormStore {
    @observable inProgress = false;

    @observable fields = [
        {
            key: "firstName",
            value: "",
            label: "Vorname",
            placeholder: "",
            errors: [],
            rules: "required",
            dirty: false,
        },
        
    ];

    @action setValue(key, value) {
        this.fields[key].value = value;
    }

    @action validate() {

        Object.keys(this.fields).forEach(k => {

        });
        this.fields[key].errors = this.validator;
    }

    @action loadInitialData() {
        if (!this.articleSlug) return Promise.resolve();
        this.inProgress = true;
        return articlesStore.loadArticle(this.articleSlug, { acceptCached: true })
          .then(action((article) => {
              if (!article) throw new Error("Can't load original article");
              this.title = article.title;
              this.description = article.description;
              this.body = article.body;
              this.tagList = article.tagList;
          }))
          .finally(action(() => { this.inProgress = false; }));
    }

    @action reset() {
        this.fields.map();
    }

    @action setTitle(title) {
        this.title = title;
    }

    @action setDescription(description) {
        this.description = description;
    }

    @action setBody(body) {
        this.body = body;
    }

    @action addTag(tag) {
        if (this.tagList.includes(tag)) return;
        this.tagList.push(tag);
    }

    @action removeTag(tag) {
        this.tagList = this.tagList.filter(t => t !== tag);
    }

    @action submit() {
        this.inProgress = true;
        this.errors = undefined;
        const article = {
            title: this.title,
            description: this.description,
            body: this.body,
            tagList: this.tagList,
            slug: this.articleSlug,
        };
        return (this.articleSlug ? articlesStore.updateArticle(article) : articlesStore.createArticle(article))
        .catch(action((err) => {
            this.errors = err.response && err.response.body && err.response.body.errors; throw err;
        }))
        .finally(action(() => { this.inProgress = false; }));
    }
}

export default new KressistFormStore();