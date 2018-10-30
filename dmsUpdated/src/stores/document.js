import {observable, action, computed} from "mobx";
import agent from "./../utils/api";
import api from "./../utils/api";
import _ from "lodash";

const LIMIT = 10;

export class DocumentStore {

    constructor(documentState) {
        var documents = this.documentsRegistry
        documentState.documents = observable({          
          get getDocuments() {
            return documents;  
          }
        });
    }
    @observable documents = observable.map();
    @observable isLoading = false;
    @observable isWorking = false;
    @observable uploading = observable.map();
    @observable tagsRegistry = observable.map();
    @observable documentsRegistry = observable.map();

    @computed get all() {
        return this.documentsRegistry.values();
    };

    @computed get uploadingFiles() {
        return this.uploading.values();
    }

    clear() {
        this.documentsRegistry.clear();
    }

    get(id) {     
        return this.documentsRegistry.get(id);
    }

    $req() {
        // if (this.predicate.myFeed) return agent.Document.feed(this.page, LIMIT);
        // if (this.predicate.favoritedBy) return agent.Document.favoritedBy(this.predicate.favoritedBy, this.page, LIMIT);
        // if (this.predicate.tag) return agent.Document.byTag(this.predicate.tag, this.page, LIMIT);
        // if (this.predicate.author) return agent.Document.byAuthor(this.predicate.author, this.page, LIMIT);
        return agent.Document.all();
    }

    @action loadTags() {
        let params = `_sort=name&_order=asc`;
        this.isLoading = true;
        return agent.Document.getByParam(params).then(action((Documents) => {
            let tags = [];
            Documents.forEach(doc=>{
                _.map(doc.tags,(tag)=>tags.push(tag));
            });
            let tag_count = _.countBy(tags);
            let arr = Object.keys(_.countBy(tags));
            arr.sort(function(a,b){return tag_count[b] - tag_count[a]});
            let topTags = arr.slice(0, 9);
            topTags.forEach((tag,key) => this.tagsRegistry.set(key, tag));
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action getByTags(tags) {
        this.isLoading = true;
        return this.$req()
               .then(action(Documents => {
                   let docs = Documents.filter(doc=>{
                       if (doc.tags) {
                           return tags.every(tag => doc.tags.includes(tag));
                       } else {
                           return [];
                       }
                   });
                   return Promise.resolve(docs);
               }))
               .finally(action(() => {
                   this.isLoading = false;
               }));
    }

    @action getByFolder(folderid) {
        this.isLoading = true;
        return agent.Document.getByParam('folderId='+folderid).then(action((Documents) => {
            this.documentsRegistry.clear();
            Documents.forEach(Document => this.documentsRegistry.set(Document.id, Document));
        }))
        .finally(action(() => { this.isLoading = false; }));
    }

    @action getByName(name) {     
        return agent.Document.getByParam('name_like='+name).then(action((Documents) => {
             this.documentsRegistry.clear();
             return Promise.resolve(Documents);
        }));
    }
    @action loadDocuments(id, { acceptCached = false } = {}) {
        if (acceptCached) {
            const Document = this.get(id);
            if (Document) return Promise.resolve(Document);
        }
        this.isLoading = true;
        return agent.Document.get(id)
            .then(action((Document) => {
                const DocumentObj = Document.fromApi(Document);
                this.documentsRegistry.set(Document.id, DocumentObj);
                return DocumentObj;
            }))
            .finally(action(() => { this.isLoading = false; }));
    }

    @action create(Document) {        
        return agent.Document.create(Document);
    }
    //need to register the uploaded file in registry
    @action upload(file,customer_id) {
        this.isUploading = true;
        const url = "upload";
        
        const fileKey = file.name;
        const body = new FormData();
        body.append("file", file);
        //body.append("customer_id", customer_id);
        //body.append("customer_id",);
        this.uploading.set(file.name, { name: file.name, percentage: 0 });
        return api.Document.upload(url, body, fileKey, file, this.progress.bind(this, file), 0)
            .then((file) => file)
            .finally(action(() => {
                this.isUploading = false;

            }));
    }
    
    @action progress(file, event, idx) {
        if (event.percent)
            this.uploading.get(file.name).percentage = event.percent;
        // if (event.percent === 100)
        //     this.uploading.delete(file.name);        
    }

    @action update(data) {
        this.isWorking = true;
        return agent.Document.update(data)
            .then(Document => {
                this.documentsRegistry.set(Document.id, Document);
                //this.load(data.id);
                return Document;
            })
            .catch(action(err => { throw err; }))
            .finally(action(() => { this.isWorking = false; }));
    }
    //need to set document registry
    @action loadAllDocuments() {
        let params = "_sort=name&_order=asc";
        return agent.Document.getByParam(params)
        .then(action(documents => {
            documents.forEach((Document,key) => this.documents.set(key, {...Document, fileType: "document"}));
            localStorage.setItem("files", JSON.stringify(documents));
        }));
    }

    @action delete(id) {
        this.isWorking = true;
        this.documentsRegistry.delete(id);
        return agent.Document.del(id)
            .then(() => this.loadAllDocuments())
            .catch(action(err => { throw err; }))
            .finally(action(() => { this.isWorking = false; }));
    }
    

}

export default DocumentStore;