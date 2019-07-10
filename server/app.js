const express = require("express");
const app = express();
const http = require("http").Server(app);
const log = require("./modules/log");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const songRouter = require('./routers/song')
const Model = require('./model');

Model.connect();
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use('/song', songRouter)

require('./modules/io')(http)
http.listen(4201, "0.0.0.0");

log.print("Server is now active");
