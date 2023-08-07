const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const dbconnect = require('./utils/dbConnect');
const blogsRouter = require('./routes/v1/blogs.route');
const viewCount = require('./middleWare/viewCount');
const { rateLimit } = require('express-rate-limit');
const { limiter } = require('./middleWare/limiter');
const errorHandler = require('./middleWare/errorHandler');
const port = process.env.PORT || 5000;
const app = express();

// middle ware 
app.use(cors());
app.use(express.json());
//app.use(viewCount);
app.use(express.static('public'));
app.set('view engine','ejs');

// Apply the rate limiting middleware to all requests
//app.use(limiter)

// mongodb uri/ mongodb connect
dbconnect();

app.use("/api/v1/blogs", blogsRouter);

//run().catch(err => console.error(err));

app.get('/', (req, res) => {
    //  res.send((`hello from Mahsez_server ${port}`));
  //  res.sendFile(__dirname + '/public/text.html');
  res.render("home.ejs",{
    id:9,
    user: {
        name:'test'
    }
  })
});

app.all("*", (req, res) => {
    res.send('No Route Found')
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Mahsez_server app listening on port${port})`);
});

process.on("unhandledRejection", (err) =>{
    console.log(err.name, err.message);
    app.close( () =>{
        process.exit(1);
    })
})