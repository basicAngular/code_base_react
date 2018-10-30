import Article from "./../models/Article";
import { observable, action, computed } from "mobx";
import agent from "./../utils/api";

const LIMIT = 10;

export class NewsStore {

    constructor() {
        this.getArticle = this.getArticle.bind(this);
    }
    
    @observable page = 0;
    @observable isLoading = false;
    @observable totalPagesCount = 0;
    @observable articleRegistry = observable.map();

    clear() {
        this.articleRegistry.clear();
        this.page = 0;
    };

    @computed get articles() {
        return this.articleRegistry.values();
    };

    @action loadArticles() {
        this.isLoading = true;
        this.articleRegistry.clear();
        return agent.News.all()
        .then(article => {
            article.forEach(article => this.articleRegistry.set(article.id, Article.fromApi(article)));
            this.totalPagesCount = Math.ceil(article.length / LIMIT);
            this.isLoading = false;
        });
    }

    @action getArticle(id) {
        return this.articleRegistry.get(id);
    }

    @action addArticle(article) {
        const articleData = {
            title: article.title,
            content: article.content,
            creation_date: article.creation_date,
            consumer_role: article.role[0]
        }
        return agent.News.create(articleData)
        .then(article => {
            this.articleRegistry.set(article.id, article);
            return article;
        });
    }

    @action updateArticle(article) {
        return agent.News.update(article)
        .then(article => {
            this.articleRegistry.set(article.id, article);
            return article;
        });
    }

    @action deleteArticle(id) {
        this.articleRegistry.delete(id);
        return agent.News.del(id).catch(action(err => { this.loadArticles(); throw err; }));
    }
}

export default new NewsStore();