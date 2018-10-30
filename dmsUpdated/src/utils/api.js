import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import commonStore from "stores/common";
import authStore from "stores/auth";

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = process.env.REACT_APP_API_URL + "/api";
const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
       authStore.logout();
    }
    return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
    if (commonStore.token) {
        req.set("authorization", `Bearer ${commonStore.token}`);
    }
};

const jsonPlugin = req => {
    req.set("Accept", "application/json");
};

const requests = {
    del: url =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .use(jsonPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .use(jsonPlugin)            
            .end(handleErrors)
            .then(responseBody),
    download: url =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .use(jsonPlugin)            
            .responseType("blob")
            .end(handleErrors)
            .then(responseBody),
    put: (url, body) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .use(jsonPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url, body) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .use(jsonPlugin)
            .end(handleErrors)
            .then(responseBody),
    upload: (url, body, fileKey, file, progressCallback, idx) => {
        let call = superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .use(jsonPlugin)
            
        Object.keys(body).forEach(key => {
            call = call.field(key, JSON.stringify(body[key]));
        });

        call = call
            .on("progress", event => progressCallback(event, idx))       
            .end(handleErrors)
            .then(responseBody);
        return call;
    }
};

const Auth = {
    current: () =>
        requests.get("/user"),
    login: (email, password) =>
        requests.post("/token"  , { 
            "grant_type": "password",
            "client_id": 7,
            "client_secret": process.env.REACT_APP_API_SECRET,
            "username": email,
            "password": password,
            "scope": ""
        }),
    register: (username, email, password) =>
        requests.post("/users", { user: { username, email, password } }),
    save: user =>
        requests.put("/user", { user })
};
const Document = {
    all: () =>
        requests.get("/documents"),
    del: id =>
        requests.del(`/documents/${id}`),
    get: id =>
        requests.get(`/documents/${id}`),
    update: document =>
        requests.put(`/documents/${document.id}`, document),
    create: document =>
        requests.post("/documents", document),
    getByParam: params =>
        requests.get(`/documents?${params}`),
    upload: (path, data, fileKey, file, progressCallback, idx) => 
        requests.upload(`/documents/${path}`,data, fileKey, file, progressCallback, idx)
};

const Folder = {
    all: () =>
        requests.get("/folders"),
    del: id =>
        requests.del(`/folders/${id}`),
    get: id =>      
        requests.get(`/folders/${id}`),
    update: folder =>
        requests.put(`/folders/${folder.id}`, folder),
    create: folder =>
        requests.post("/folders", folder),
    getByParam: params =>
        requests.get(`/files?${params}`)
};

const User = {
    get: id =>
        requests.get(`/users/${id}`),
    update: (id, data) =>
        requests.put(`/users/${id}`, data),
};

const Profile = {
    update: data => 
        requests.put("/profile", data),
    updatePassword: data => 
        requests.put("/profile/change-password", data),
};

const Krempler = {
    all: (page, lim = 10) =>
        requests.get("/kremplers"),
    del: id =>
        requests.del(`/kremplers/${id}`),
    get: id =>
        requests.get(`/kremplers/${id}`),
    update: krempler =>
        requests.put(`/kremplers/${krempler.id}`, krempler),
    create: krempler =>
        requests.post("/kremplers", krempler)
};


const Vaccination = {
    all: (page, lim = 10) =>
        requests.get("/vaccinations"),
    del: id =>
        requests.del(`/vaccinations/${id}`),
    get: id =>
        requests.get(`/vaccinations/${id}`),
    update: vaccination =>
        requests.put(`/vaccinations/${vaccination.id}`, vaccination),
    create: vaccination =>
        requests.post("/vaccinations", vaccination)
};

const ShopItem = {
    all: (page, lim = 10) =>
        requests.get("/shop"),
    del: id =>
        requests.del(`/shop/${id}`),
    get: id =>
        requests.get(`/shop/${id}`),
    update: shop_item =>
        requests.put(`/shop/${shop_item.id}`, shop_item),
    create: shop_item =>
        requests.post("/shop", shop_item)
};


const VaccinationStatus = {
    all: (page, lim = 10) =>
        requests.get("/vaccination_status"),
    del: id =>
        requests.del(`/vaccination_status/${id}`),
    get: id =>
        requests.get(`/vaccination_status/${id}`),
    update: vaccination_status =>
        requests.put(`/vaccination_status/${vaccination_status.id}`, vaccination_status),
    create: vaccination_status =>
        requests.post("/vaccination_status", vaccination_status)
};

const Kressist = {
    all: (page, lim = 10) =>
        requests.get("/kressists"),
    del: id =>
        requests.del(`/kressists/${id}`),
    get: id =>
        requests.get(`/kressists/${id}`),
    update: kressist =>
        requests.put(`/kressists/${kressist.id}`, kressist),
    create: kressist =>
        requests.post("/kressists", kressist)
};

const Customer = {
    all: (page, lim = 10) =>
        requests.get("/customers"),
    del: id =>
        requests.del(`/customers/${id}`),
    get: id =>
        requests.get(`/customers/${id}`),
    update: customer =>
        requests.put(`/customers/${customer.id}`, customer),
    create: customer =>
        requests.post("/customers", customer)
};

const Service = {
    all: (page, lim = 10) =>
        requests.get("/services"),
    create: service =>
        requests.post("/services", service),
    update: service =>
        requests.put(`/services/${service.id}`, service),
    del: id =>
        requests.del(`/services/${id}`),
}

const News = {
    all: (page, lim = 10) =>
        requests.get("/articles"),
    create: service =>
        requests.post("/articles", service),
    update: service =>
        requests.put(`/articles/${service.id}`, service),
    del: id =>
        requests.del(`/articles/${id}`),
}

const Scheduler = {
    all: (page, lim = 10) =>
        requests.get("/scheduler"),
    create: service =>
        requests.post("/scheduler", service),
    update: service =>
        requests.put(`/scheduler/${service.id}`, service),
    del: id =>
        requests.del(`/scheduler/${id}`),
}

const Tags = {
    getAll: () => requests.get("/tags")
};

export default {
    ShopItem,
    Auth,
    User,
    Profile,
    Document,
    Folder,
    Krempler,
    Kressist,
    Customer,
    Tags,
    Vaccination,
    VaccinationStatus,
    Service,
    Scheduler,
    News
};