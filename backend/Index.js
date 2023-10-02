const express = require("express");
const cors = require('cors');
const https = require ('https')
const fs = require('fs')
const dotenv =  require ('dotenv')
const EventSchedulingAPI = require("./Src/api/eventScheduling")
const BoardMembersAPI = require("./Src/api/boardMembers-api")

const bodyParser = require("body-parser");
const userApi = require("./Src/api/Registraion.api")
const loginApi = require ('./Src/api/login.api')
const connectDB = require("./src/config/config");
const blogsRouter = require("./Src/Route/blogs");
const app = express();

const ProjectApi = require('./Src/api/projectApi');

const PORT = process.env.PORT || 5000;

const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
};



app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});

app.use(cors());

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
//  app.use(express.json());

connectDB();

// app.use('/', (req, res, next) => {
//   res.send('Hello from SSL server')
// })
app.use("/blogs", blogsRouter);
app.use("/Project", ProjectApi());

app.use("/eventScheduling",EventSchedulingAPI)
app.use("/boardMembers", BoardMembersAPI)
app.use("/user", userApi())
app.use('/login',loginApi())

const sslServer = https.createServer(options, app)

sslServer.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});