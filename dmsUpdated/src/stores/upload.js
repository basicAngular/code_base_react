import { observable, action, computed } from "mobx";
import api from "./../utils/api";
class UploadStore {

    @observable files = observable.map();
    @observable isUploading = false;

    @action clear() {
        this.files.clear();
    }

    @computed get inUpload() {
        return this.files.values();
    }

    @action progress(event, idx) {
        if (event.percent)
            this.files.get(idx).percentage = event.percent;
        if (event.percent === 100)
            this.files.delete(idx);
    }

    @action uploadFile(file) {

        this.isUploading = true;
        const url = "upload";
        const fileKey = file.name;
        const body = new FormData();
        body.append("file", file);
        this.files.set(file.name, { name: file.name, percentage: 0 });
        return api.Document.upload(url, body, fileKey, file, this.progress.bind(this, file), 0)
            .then((file) => file)
            .finally(action(() => {
                this.isUploading = false;

            }));
    }

    @action uploadDocs(file) {  
        this.isUploading = true;
        return this.files.set(file.uploadId, file);
    }

    @action update(file) {
        return this.files.set(file.uploadId, file);
    }

    @action delete(id) {
        this.files.delete(id);
    }
}

export default new UploadStore();