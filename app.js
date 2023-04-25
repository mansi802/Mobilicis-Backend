const express = new require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("./importData");
const PORT = 5000 || process.env.PORT;
const router = require("./Routes");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
