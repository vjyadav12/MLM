import app from "./app.js";

const PORT = 5656;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})