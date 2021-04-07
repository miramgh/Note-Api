
const express = require('express')
const cors = require('cors')
const noteRoute = require('./routes/noteRoutes');
const app = express();

app.use(express.json());

app.use(cors())

app.use("/api/v1" , noteRoute);

const port = 3000 

app.get("/", (req, res)=>{
    res.send('server started')
})

app.listen(port , ()=>{console.log(`SERVER IS LISTENING ON PORT ${port}`)})

module.exports = app
