const express = require("express");
const userRoute = require("./Routes/userRoute");
const partyRoute = require("./Routes/partyRoute");
const matchRoute = require("./Routes/matchRoute");
const connectDb = require("./Configuration/connectDb.js");
var cors = require('cors')
connectDb();
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

app.use(cors());

app.listen(port, (err) => {
  if (err) {
    console.error("Server Failed", err.message);
  } else console.log(`Server Started at PORT ${port} `);
});
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", partyRoute);
app.use("/api", matchRoute);
