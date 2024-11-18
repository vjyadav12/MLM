import mongoose from "mongoose";
const URL = "mongodb://0.0.0.0:27017/FUll_leged_website"
const Db_connection = async()=>{
    await mongoose.connect(URL)
    .then(()=>{
        console.log("db connection is done")

    })
    .catch(()=>{
        console.log("db Connection not done yet")
    })
}

export default Db_connection