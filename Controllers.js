const User = require("./Users");

// Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
const query1 = async (req, res) => {
  User.find({
    $and: [
      { income: { $lt: "$5" } },
      { car: { $in: ["BMW", "Mercedes-Benz"] } },
    ],
  })
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send("No users found.");
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database.");
    });
};

// Male Users which have phone price greater than 10,000.
const query2 = async (req, res) => {
  User.find({
    $and: [{ gender: "Male" }, { phone_price: { $regex: /^1\d{4,}$/ } }],
  })
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send("No users found.");
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database.");
    });
};

//Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
const query3 = async (req, res) => {
  try {
    const users = await User.find({
      last_name: { $regex: /^M/ }, // starts with "M"
      quote: { $exists: true, $type: "string", $regex: /.{16,}/ }, // quote length greater than 15
    }).exec();

    const filteredUsers = users.filter((user) => {
      const email = user.email.toLowerCase();
      const lastName = user.last_name.toLowerCase();
      return email.includes(lastName) && lastName.startsWith("m");
    });

    res.status(200).json(filteredUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit
const query4 = async (req, res) => {
  User.find({
    $and: [
      { car: { $in: ["BMW", "Mercedes", "Audi", "Mercedes-Benz"] } },
      { email: { $not: /\d/ } },
    ],
  })
    .then((users) => {
      if (users.length === 0) {
        res.status(404).send("No users found for the given conditions.");
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database.");
    });
};

//Show the data of top 10 cities which have the highest number of users and their average income.
const query5 = async (req, res) => {
  try {
    const cities = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          avgIncome: { $avg: "$income" },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      { $project: { city: "$_id", count: 1, avgIncome: 1, _id: 0 } },
    ]);
    res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = { query1, query2, query3, query4, query5 };
