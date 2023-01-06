const express = require("express");
const death = express();
const path = require("path");
const Death = require("./modals/death")
const details = require("./Seeds/seed")
const session = require("express-session")
const flash = require("connect-flash")
const method = require("method-override")
const mongoose = require("mongoose");
mongoose.set('strictQuery',true)
mongoose.connect("mongodb://0.0.0.0:27017/death",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection
db.on("error",console.error.bind(console,"connection error"))
db.once("open",()=>{
    console.log("I am Ryuk")

})


death.use(express.urlencoded({extended:true}))
death.set('view engine','ejs')
death.set('views',path.join(__dirname,'views')) 
death.use(express.static('public'))
death.use(method("_method"))
const sessionConfig = {

       
    secret:"hope",
     resave:false,
     saveUninitialized:true,
     cookie:
     {
         httpOnly:true,
         expires:Date.now() +1000*60*60*7,
         maxAge:1000*60*60*7
     }
} 
death.use(session(sessionConfig))
death.use(flash())
death.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

death.get('/death',(req,res)=>{
    res.render("home")
})

death.get("/death/about",(req,res)=>{
    res.render("about")
})
death.get("/death/rules",(req,res)=>{
    res.render("rules")
})

death.get("/death/sinner",async(req,res)=>{
    const deaths = await Death.find({})
    req.flash('error',"Welcome Ryuk!")
    res.render("sinners",{deaths})
})
death.get('/death/new',(req,res)=>{
    res.render('god')
})
death.post("/death/sinners",async(req,res)=>{
    const death = new Death(req.body.death)
     await death.save()
     req.flash('error',"Successfully Created!")
     res.redirect("/death/rules")
    
})
death.get("/death/:id",async(req,res)=>{
    const sinner = await Death.findById(req.params.id)
    res.render("show",{sinner})
})


death.get('/death/:id/edit',async(req,res)=>{
    const sinner = await Death.findById(req.params.id)
    res.render('edit',{sinner})
})

death.put('/death/:id',async(req,res)=>{
    const {id } = req.params
    const death = await Death.findByIdAndUpdate(id,{...req.body.death})
    req.flash('error',"Successfully Edited!")
    res.redirect(`/death/${death._id}`)
})




death.delete('/death/:id',async(req,res)=>{
    const {id} = req.params
    await Death.findByIdAndDelete(id)
    req.flash('error',"Successfully Erased!")
    res.redirect('/death/sinner')
})

death.listen(3000,(req,res)=>{
    console.log("Death Awaits")

})


