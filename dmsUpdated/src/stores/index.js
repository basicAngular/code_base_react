import auth from "./auth";
import common from "./common";
import shopItem from "./shop_item";
import cartItem from "./cart_item";
import upload from "./upload";
import breadCrumbs from "./breadcrumbs";
import DocumentStore from "./document";
import FolderStore from "./folder";
import FileManagerStore from "./file";
import krempler from "./krempler";
import customer from "./customer";
import kressist from "./kressist";
import vaccination from "./vaccination";
import vaccinationStatus from "./vaccination_status";
import service from "./service";
import schedule from "./scheduler";
import news from "./news";

let documentState = {};
let folderSate = {};
const document = new DocumentStore(documentState);
const folder = new FolderStore(folderSate);
const file = new FileManagerStore(documentState, folderSate);

export default {
    authStore: auth,
    commonStore: common,
    shopItemStore: shopItem,
    cartItemStore: cartItem,
    documentStore: document,
    folderStore: folder,
    fileStore: file,
    uploadStore: upload,
    breadCrumbStore: breadCrumbs,
    kremplerStore: krempler,
    customerStore: customer,
    kressistStore: kressist,
    vaccinationStore: vaccination,
    vaccinationStatusStore: vaccinationStatus,
    serviceStore: service,
    scheduleStore: schedule,
    newsStore: news
};