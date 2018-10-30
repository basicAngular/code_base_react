var faker = require('faker');

function generateFolders() {
    var folders = [];

    for (var id = 0; id < 50; id++) {
        folders.push({
            "id": id,
            "name": faker.lorem.word(),
            "folderId": id <= 10 ? null : faker.random.number() % folders.length,
            "image": faker.random.boolean() ? faker.image.technics() : "",
            "fileType": "folder"
        });
    }
    return folders;
}

function generateFiles (folders) {
  var files = []

  for (var id = 0; id < 100; id++) {
    var tags = ([...Array(faker.random.number({min: 1, max: 10})).keys()]).map(el => {return faker.random.word()});
    files.push({
        "id": id,
        "name": faker.system.commonFileName("pdf"),
        "extension": "pdf",
        "path": "",
        "folderId": folders[faker.random.number({min:0, max: (folders.length - 1)})].id,
        "mime_type": "application/pdf",
        "size": faker.random.number({min: 1000, max: 5000}),
        "tags": tags,
        "author": faker.company.companyName(),
        "created_at": faker.date.recent(),
        "modified_at": faker.date.recent(),
        "date_relevance": faker.random.number({min: 2015, max: 2018}) + (faker.random.boolean() ? "-"+faker.random.number({min: 1, max: 12}) + (faker.random.boolean() ? "-"+faker.random.number({min: 1, max: 28}) : "") : ""),
        "fileType": "document",
        "is_user_upload": faker.random.boolean(),
        "is_visible": faker.random.boolean(),
        "is_sos": faker.random.boolean(),
        "is_tax_relevant": faker.random.boolean(),
        "is_favorite": faker.random.boolean(),
    });
  }

  return files;
}

function generateUsers() {
    var users = [];

    for (var id = 0; id < 5; id++) {
        users.push({
            "id": id,
            "email": faker.internet.email(),
            "first_name": faker.name.firstName(),
            "last_name": faker.name.lastName(),
            "birthday":faker.date.past(),
            "street":faker.address.streetAddress(),
            "city":faker.address.city(),
            "postal_code":faker.address.countryCode(),
            "phone":faker.phone.phoneNumber(),
            "tax_number":"",
            "is_turnover_tax_subject":"",
            "account_holder":faker.finance.accountName(),
            "account_iban":faker.finance.iban(),
            "account_bic":faker.finance.bic(),
            "role":"admin",
            "gender":"male"
        });
    }
    return users;
}

var folders = generateFolders();
var files = generateFiles(folders);
var users = generateUsers();

console.log("{");
console.log('"folders": ');
console.log(JSON.stringify(folders));
console.log(",");
console.log('"files": ');
console.log(JSON.stringify(files));
console.log(",");
console.log('"users": ');
console.log(JSON.stringify(users));
console.log("");
console.log("}");