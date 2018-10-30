import moment from "moment";
import faker from "faker";
faker.locale = "de";

const fileType = "document";

export default class Document {
    constructor() {
        this.id = "";
        this.name = "";
        this.path = "";
        this.extension = "";
        this.folderId = null;
        this.mime_type = "";
        this.size = "";
        this.tags = "";
        this.author = "";
        this.created_at = "";
        this.modified_at = "";
        this.date_relevance = "";
        this.is_user_upload = "";
        this.is_visible = "";
        this.is_sos = "";
        this.is_tax_relevant = "";
        this.is_favorite = "";
        this.fileType = fileType;
    }

    static fromApi(values) {
        let document = new Document();
        document.id = values.id.toString();
        document.name = values.name;
        document.path = values.path;
        document.extension = values.extension;
        document.folderId = values.folderId;
        document.mime_type = values.mime_type;
        document.size = values.size;
        document.author = values.author;
        document.tags = JSON.parse(values.tags);
        document.created_at = values.created_at;
        document.modified_at = values.modified_at;
        document.date_relevance = values.date_relevance;
        document.is_user_upload = values.is_user_upload === 1;
        document.is_visible = values.is_visible === 1;
        document.is_sos = values.is_sos === 1;
        document.is_tax_relevant = values.is_tax_relevant === 1;
        document.is_favorite = values.is_favorite === 1;
        document.fileType = fileType;
        return document;
    }

}
