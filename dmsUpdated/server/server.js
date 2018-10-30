const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({static: 'storage'});
const fileUpload = require('express-fileupload');
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use(fileUpload());


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
server.use((req, res, next) => {
  if (req.method === 'POST') {
    if (req.files) {
        Object.keys(req.files).forEach(fileKey => {
            let file = req.files[fileKey];
            const fileName = getRndInteger(10000, 99999) + "_" + file.name;
            let pathToFile = __dirname + "/storage/" + fileName;
            file.mv(pathToFile);
            req.body[fileKey] = fileName; 
          
        });
    }
  }
  // Continue to JSON Server router
  next()
})

server.post('/upload', (req, res) => {
    res.jsonp(req.body);
})

// Use default router
server.use(router)
server.listen(3004, () => {
})
