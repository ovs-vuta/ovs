require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const {connectDB} = require("./db/config.js");
const authRoute = require('./routes/authRoutes.js');
const userRoute = require("./routes/userRoutes.js")
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require("node:path")
const cors = require('cors');

// define middleware
const staticPath = path.join(__dirname, "./public");
console.log(staticPath)
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
app.use("/static",express.static(staticPath));

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/users/", userRoute);

// define the first route
app.get('/', (req, res)=> res.send("Server is running...") );

// start the server listening for requests
connectDB()
app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}/`));