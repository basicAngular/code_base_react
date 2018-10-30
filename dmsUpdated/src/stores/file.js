import {observable, action, computed, autorun, toJS} from "mobx";
import _ from "lodash";
import moment from "moment";
import agent from "./../utils/api";

export class FileManagerStore {

    constructor(documentState, folderState) {
        autorun(() => {
            this.loadAllDocuments().then(() => {
                this.loadAllFolders().then(() => {
                    this.applyGrouping("folder");
                });
            });
        });
        this.setSearch = this.setSearch.bind(this);
    }

    @observable isLoading = false;
    @observable isWorking = false;

    @observable files = observable.map();
    @observable folders = observable.map();
    @observable documents = observable.map();
    
    @observable searchRegistry = "";
    @observable groupingRegistry = "";
    @observable tagsRegistry = observable.map();
    @observable filtersRegistry = observable.map();
    @observable sortRegistry = {sortType: "name", sortOrder: "asc,desc"};

    @computed get getDocuments() {
        
        let documents = toJS(this.documents.values());
        documents = this.applySearch(documents);
        return documents;
    }

    @computed get file() {
        
        let documentsAndFolders = toJS(this.files.values());
        let getDocuments = documentsAndFolders.filter(file => file.fileType === "document");
        let getFolders = documentsAndFolders.filter(file => file.fileType === "folder");
        if(getFolders.length > 0) {
            getFolders = this.applySearch(getFolders);
            getFolders = this.applySorting(getFolders);
        }
        if(getDocuments.length > 0) {
            getDocuments = this.applySearch(getDocuments);
            getDocuments = this.applySorting(getDocuments);
            getDocuments = this.applyTags(getDocuments);
            getDocuments = this.applyFiltering(getDocuments);
        }
        documentsAndFolders = getFolders.concat(getDocuments);
        return documentsAndFolders;
    }

    @computed get authors() {
        
        let documents = toJS(this.documents.values());
        const authors = [...new Set(documents.map(item => item.author))];
        return authors;
    }

    @computed get emptyFolders() {
        
        let emptyFolders = [];
        let documents = toJS(this.documents.values());
        let folders = toJS(this.folders.values());
        let folderIds = folders.map(folder => {return folder.id;});
        folderIds.map(folderId => {
            let docLength = documents.find(doc => doc.folderId === folderId);
            let fodlerLength = folders.find(folder => folder.folderId === folderId);
            if(docLength === undefined && fodlerLength === undefined) {
                emptyFolders.push(folderId);
            }
            return null;
        });
        return emptyFolders;
    }

    applySearch(documentsAndFolders) {
        let searchParam = this.searchRegistry;
        if(searchParam.length !== 0) {
            documentsAndFolders = documentsAndFolders.filter(file => file.name.includes(searchParam));
        }
        return documentsAndFolders;
    }

    applySorting(documentsAndFolders) {
        const { sortType, sortOrder } = this.sortRegistry;
        switch(sortType) {
            case "name":
                if(sortOrder === "asc,desc") { 
                    documentsAndFolders = this.sortByName(documentsAndFolders, true);
                } else {
                    documentsAndFolders = this.sortByName(documentsAndFolders, false);
                }
                break;
            case "date_relevance":
                if(sortOrder === "asc,desc") { 
                    documentsAndFolders = this.sortByDate(documentsAndFolders, sortType, true);
                } else {
                    documentsAndFolders = this.sortByDate(documentsAndFolders, sortType, false);
                }
                break;
            case "size":
                if(sortOrder === "asc,desc") { 
                    documentsAndFolders = this.sortBySize(documentsAndFolders, true);
                } else {
                    documentsAndFolders = this.sortBySize(documentsAndFolders, false);
                }
                break;
            case "created_at":
                if(sortOrder === "asc,desc") { 
                    documentsAndFolders = this.sortByDate(documentsAndFolders, sortType, true);
                } else {
                    documentsAndFolders = this.sortByDate(documentsAndFolders, sortType, false);
                }
                break;
            case "modified_at":
                if(sortOrder === "asc,desc") { 
                    documentsAndFolders = this.sortByDate(documentsAndFolders, sortType, true);
                } else {
                    documentsAndFolders = this.sortByDate(documentsAndFolders, sortType, false);
                }
                break;
            default:
                return documentsAndFolders;
        }
        return documentsAndFolders;
    }
    
    applyTags(documentsAndFolders) {
        const tags = toJS(this.tagsRegistry.values());
        if(documentsAndFolders.length !== 0 && tags.length !== 0) {
            documentsAndFolders = documentsAndFolders.filter(doc => {
                if (doc.tags) {
                    return tags.every((tag) => doc.tags.includes(tag));
                } else {
                    return [];
                } 
            });
        }
        return documentsAndFolders;
    }

    applyFiltering(documentsAndFolders) {
        
        const filters = toJS(this.filtersRegistry.values());
        if(documentsAndFolders.length !== 0) {
            documentsAndFolders = documentsAndFolders.filter(doc => {
                return filters.every(filter => doc[filter] === true);
            });
        }
        return documentsAndFolders;
    }

    applyGrouping(groupType = null) {
        const folders = toJS(this.folders.values());
        const documents = toJS(this.documents.values());
        const type = groupType ? groupType : this.groupingRegistry;
        let groupedFiles = [];
        let isFolderGrouping = true;
        switch(type) {
            case "author":
                isFolderGrouping = true;
                groupedFiles = _.chain(documents)
                .groupBy("author").toPairs().map(currentItem => {
                    currentItem[2] = "folder";
                    currentItem[3] = currentItem[0];
                    return _.zipObject(["folderId","documents","fileType","name"], currentItem);
                })
                .value();
                groupedFiles.find(folder => {
                    if(folder.name === "") {
                        folder.name = "Unknown";
                    }
                    return null;
                });
                break;
            case "date":
                let getDocuments = documents.filter(doc => {return doc.date_relevance.length === 4;});
                let getFolders = _(documents)
                .groupBy(x => this.getYear(x.date_relevance))
                .map((value, key) => ({folderId: key, documents: value, name:key, type:"date", fileType:"folder"}))
                .value();
                isFolderGrouping = true;
                groupedFiles = getFolders.concat(getDocuments);
                break;
            case "folder":
                isFolderGrouping = true;
                
                groupedFiles = _.chain(folders).map(folder => {
                    return {folderId: folder.id, data: folder, name: folder.name, fileType: folder.fileType};
                })
                .value();
                break;
            case "document_all":
                isFolderGrouping = false;
                groupedFiles = documents.filter(doc => {return doc.folderId !== undefined && doc.folderId !== null});
                break;
            default:
                isFolderGrouping = false;
                groupedFiles = documents;
        }
        this.setFiles(groupedFiles,isFolderGrouping);
    }

    sortByName(files, asc) {
        files.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();
            if(asc) {
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
            } else {
                if (nameA > nameB) return -1;
                if (nameA < nameB) return 1; 
            }
            return null;
        });
        return files;
    }

    sortBySize(files, asc) {
        if(asc) {
            files.sort((fileA, fileB) => {
                return fileA.size - fileB.size;
            });
        } else {
            files.sort((fileA, fileB) => {
                return fileB.size - fileA.size;
            });
        }
        return files;
    }

    sortByDate(files, field, asc) {
        files.sort((a, b) => {
            let dateA = new Date(a[field]);
            let dateB = new Date(b[field]);
            if(asc) {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });
        return files;
    }

    setFiles(files, isFolderGrouping) {
        
        this.files.clear();
        if(isFolderGrouping) {
            files.forEach(file => this.files.set(file.folderId, file));
        } else {
            files.forEach(file => this.files.set(file.id, file));
        }
        this.isLoading = false;
    }
    
    getYear(date) {
        return moment(date).format("Y");
    }

    getMonth(date) {
        return moment(date).format("MMMM");
    }

    filterFiles(files = null) {
        let documentsAndFolders = !files ? toJS(this.files.values()) : files;
        documentsAndFolders = this.applySearch(documentsAndFolders);
        documentsAndFolders = this.applySorting(documentsAndFolders);
        documentsAndFolders = this.applyTags(documentsAndFolders);
        documentsAndFolders = this.applyFiltering(documentsAndFolders);
        return documentsAndFolders;
    }

    loadAllDocuments() {
        
        let params = "_sort=name&_order=asc";
        return agent.Document.getByParam(params)
        .then(action(documents => {
            // let documents = Documents;
            
            documents.forEach((Document,key) => this.documents.set(key, {...Document, fileType: "document"}));
            localStorage.setItem("files", JSON.stringify(documents));
            //localStorage.setItem("files", JSON.stringify(this.props.uploadStore.files.values()));
            //JSON.stringify(documents);
        }));
    }

    loadAllFolders() {
        
        return agent.Folder.all()
        .then(action((folders) => {
            
            this.folders.clear();
            folders.forEach((folder, key) => this.folders.set(key, {...folder, fileType: "folder"}));
        }));
    }

    $req() {
        return agent.Folder.all();
    }

    @action setHome() {
        let documents = toJS(this.documents.values());
        this.setFiles(documents);
    }

    @action setSearch(search) {
        if(search.length !== 0) {
            this.searchRegistry = search;
        } else {
            this.searchRegistry = "";
        }
    }

    @action clearSearch () {
        this.searchRegistry = "";
    }

    @action setSort(sort) {
        this.sortRegistry = sort;
    }
    
    @action setTags(tags) {
        if(tags.length !== 0) {
            tags.forEach((tag, key) => this.tagsRegistry.set(key, tag));
        } else {
            this.tagsRegistry.clear();
        }
    }

    @action setFilters(filters) {
        
        if(filters.length !== 0) {
            filters.forEach((filter, key) => this.filtersRegistry.set(key, filter));
        } else {
            this.filtersRegistry.clear();
        }
    }

    @action setGrouping(grouping) {
        if(grouping.length !== 0) {
            this.groupingRegistry = grouping;
        } else {
            this.groupingRegistry = "";
        }
        this.applyGrouping();
    }

    @action groupFolderByYear(documents) {
        let getDocuments = documents.filter(doc => {return doc.date_relevance.length === 4;});
        let getFolders = _(documents)
                        .groupBy(x => this.getMonth(x.date_relevance))
                        .map((value, key) => ({folderId: key, documents: value, name:key, fileType:"folder"}))
                        .value();
        const documentsAndFolders = getFolders.concat(getDocuments);
        this.files.clear();
        documentsAndFolders.forEach(file => this.files.set(file.folderId, file));
    }

    @action groupFilesByMonth(Documents) {
        let files = this.filterFiles(Documents);
        this.setFiles(files);
    }

    @action getByFolder(file) {
        
        let getFile = file.data !== undefined ? file.data :  file;
        let fileId = parseInt(getFile.id, 10);
        let folders = this.folders.values();
        let documents = this.documents.values();
        let getFoldersById = folders.filter(folder => {
                if(folder.id === fileId) {
                    return folder;
                }
            return null;
        });
        let getDocumentsById = documents.filter(document => {
            if(document.folderId === fileId) {
                return document;
            }   
            return null;
        });
        //let files = getDocumentsById.concat(getFoldersById);
        let files = getDocumentsById;
        this.files.clear();
        files.forEach((Document,key) => this.files.set(key, Document));
    }

    @action reload() {
        
        this.loadAllDocuments().then(() => {
            this.loadAllFolders();
        });
    }
}

export default FileManagerStore;