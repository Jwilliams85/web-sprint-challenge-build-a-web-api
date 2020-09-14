const express = require ('express');

const actionRouter = require("./data/action/actionRouter")
const projectRouter = require("./data/project/projectRouter")


const helmet = require("helmet");
const server = express();


server.use(express.json())
 
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({message: "The server is online!"})//initial response 
})

server.use("/api/project", projectRouter)
server.use("/api/action", actionRouter)

module.exports = server;