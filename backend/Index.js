const express = require("express");
const cors = require('cors');
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

app.use(cors());
 app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
//  app.use(express.json());



connectDB();

app.use("/blogs", blogsRouter);
app.use("/Project", ProjectApi());

app.use("/eventScheduling",EventSchedulingAPI)
app.use("/boardMembers", BoardMembersAPI)
app.use("/user", userApi())
app.use('/login',loginApi())

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
