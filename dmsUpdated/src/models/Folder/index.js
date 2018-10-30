import faker from "faker";
faker.locale = "de";

const fileType = "folder";

export default class Folder {
    constructor() {
        this.id = "";
        this.name = "";
        this.image = "";
        this.folderId = null;
        this.fileType = fileType;
    }

    static fromApi(values) {
        let folder = new Folder();
        folder.id = values.id.toString();
        folder.name = values.name;
        folder.folderId = values.folderId;
        folder.image = values.image;
        folder.fileType = values.fileType;
        return folder;
    }


    static fromForm(values) {
        let folder = new Folder();
        folder.id = values.id;
        folder.name = values.name;
        folder.folderId = values.folderId;
        folder.fileType = fileType;
        return folder;
    }

    toForm() {
        return {
            "id": this.id,
            "name": this.name,
            "folderId": this.folderId,
            "fileType": this.fileType
        };
    }

    static empty() {
        return new Folder();
    }

    static random() {
        let folder = new Folder();
        folder.name =  faker.lorem.word();
        folder.image =  faker.random.boolean() ? faker.image.technics() : "";
        return folder;
    }
}
