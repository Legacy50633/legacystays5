const  Death = require('../modals/death')
const info = require('./seed')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
 mongoose.connect('mongodb://0.0.0.0:27017/death',{
    useUnifiedTopology:true,
    useNewUrlParser:true
 })

const  db = mongoose.connection
db.on('error',console.error.bind(console,"connection error"))
db.once("open",()=>{
  console.log("Release")  
})


const seedDB = async()=>{
     
        await Death.deleteMany({})
       for(let i = 0;i < 3 ; i++){
             const ran = Math.floor(Math.random()*3);
            const list = new  Death({
                name:`${info[ran].name} `,
                date:`${info[ran].date}`,
                time:`${info[ran].time}`,
                cause:`${info[ran].cause}`
               
          
                
              
            })
            await list.save() 
       }
    
    }
    
    seedDB()