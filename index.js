require("dotenv").config();
const path = require("path");
const express= require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/connect");
const router = express.Router()
const app = express();


const serviceRouter = require("./routers/serviceRouters");
const repackRouter = require("./routers/repackRouter");
const hashRouter = require("./routers/hashRouter");

connectDB(process.env.MONGO_URL);

app.use(cors());
app.use(express.json());

app.use("/api/services/", serviceRouter);
app.use("/", repackRouter);
app.use("/hash", hashRouter);


const PORT = process.env.PORT || 8000;

mongoose.connection.once("open", () => {
    console.log("connected to MongoDB");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
mongoose.connection.on("error", (err) => {
    console.log(err);
})

