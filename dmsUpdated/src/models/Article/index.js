import moment from "moment";
import faker from 'faker';
faker.locale = "de";

export default class Article {
    constructor() {
        this.id = "";
        this.title = "";
        this.content = "";
        this.creation_date = "";
        this.consumer_role = "";
    }

    static fromApi(values) {
        let article = new Article();
        article.id = values.id;
        article.title = values.title;
        article.content = values.content;
        article.creation_date = values.creation_date;
        article.consumer_role = values.consumer_role;
        return article;
    }

    static fromForm(values) {
        let article = new Article();
        article.id = values.id;
        article.title = values.title;
        article.content = values.content;
        article.creation_date = values.creation_date;
        article.consumer_role = values.consumer_role;
        return article;
    }

    toForm() {
        return {
            "id": this.id,
            "title": this.title,
            "content": this.content,
            "creation_date": this.creation_date,
            "consumer_role": this.consumer_role,
        };
        }

    static empty() {
        return new Article();
    }

    static random() {
        let article = new Article();
        article.title = faker.name.firstName();
        article.content = faker.name.lastName();
        article.creation_date = moment().format('YYYY-MM-DD');
        article.consumer_role = moment().format('YYYY-MM-DD');
        return article;

    }
}
