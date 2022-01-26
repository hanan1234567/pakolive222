const mongoose = require("mongoose");
// const mongoURI = "mongodb://109.106.255.114:27017/InsafAcademy";
const mongoURI = "mongodb+srv://repla:repla@cluster0.ff9qb.mongodb.net/pakolive?retryWrites=true&w=majority"


const dbConnection = async function connection(){  
    try{    
        var connection = await mongoose.connect(mongoURI,{ useNewUrlParser: true })
        console.log("connection")
        return connection
    }catch(e){
        console.log("Error", e)
    }

}
module.exports = dbConnection