const { json } = require("stream/consumers")

const { request } = require("http")
const express = require("express")
const { name } = require("ejs")
const path = require("path")
const fs = require("fs")
const { send } = require("process")
const app = express()

app.set('views','./views')
app.set("view engine",'ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'styles')))

app.get("/",(req,res) => {
    fs.readFile("./Databases/data.json","utf8", (err,data) => {
        res.render("index.ejs")
    })
})
app.get("/increase",(req,res) => {
    fs.readFile("./Databases/data.json","utf8", (err,data) => {
        res.render("increase.ejs")
    })
})
app.get("/data",(req,res) => {
    fs.readFile("./Databases/data.json",'utf8',(err,data) => {
        res.json(JSON.parse(data))
    })
})
app.get("/data/:userId",(req,res) => {
    const userId = req.params.userId;
    const filePath = './Databases/data.json'
    fs.readFile(filePath,'utf8',(err,data) => {
        let jsonData = JSON.parse(data)
        if(!jsonData[userId]) {return res.json({})}
        res.json(jsonData[userId])
    })})
app.post("/data/:userId", (req,res) => {
    const userId = req.params.userId;
    const newData = req.body;
    const filePath = './Databases/data.json'

    fs.readFile(filePath,'utf8',(err,data) => {
        let jsonData = JSON.parse(data)
        if(!jsonData[userId]) {
            jsonData[userId] = newData[userId]
            fs.writeFile(filePath,JSON.stringify(jsonData,null,4),
            (err) => {console.log(err)})
        }})})
app.put("/data/:userId",(req,res) => {
    const userId = req.params.userId;
    const newData = req.body;
    const filePath = './Databases/data.json'
    fs.readFile(filePath,'utf8',(err,data) => {
        let jsonData = JSON.parse(data)
        if(jsonData[userId]) {
            jsonData[userId] = newData[userId]
            fs.writeFile(filePath,JSON.stringify(jsonData,null,4),
            (err) => {console.log(err)})
        }})})
app.listen(3001,() => {
    console.log("Hello New Project")
})