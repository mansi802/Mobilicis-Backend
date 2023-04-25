const fs = require("fs");
const Users = require("./Users");

const data = JSON.parse(fs.readFileSync("./sample_data.json", "utf-8"));

// console.log(data);
const importData = async () => {
  try {
    await Users.create(data);
    console.log("data successfully imported");
    // to exit the process
    process.exit();
  } catch (error) {
    console.log("error", error);
  }
};

// importData();
