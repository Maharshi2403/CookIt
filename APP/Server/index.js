const express = require("express");
const jwt = require("jsonwebtoken");
const Users = require("./User.model");
const key = "Maharshi2024";
const app = express();
const cors = require("cors");

// Middlewares
// Zod
// Database - Mongoose
app.use(cors());
app.use(express.json());
async function cheackUserExist(req, res, next) {
  const userName = req.body.username;

  const username = await Users.findOne({ username: userName });

  if (username) {
    res.status(200).send({
      msg: "User already exists!!!!, Tye with anothe Username.",
    });
  } else {
    next();
  }
}

async function authUser(req, res, next) {
  const usrnm = req.body.userName;
  const pswrd = req.body.password;

  const user = await Users.findOne({ username: usrnm });
  if (!user) {
    res.status(401).send({ msg: "User not found!" });
  }
  if (user.password === pswrd) {
    next();
  } else {
    res.status(401).send({
      msg: "Invalie credentials. Please tyr again!!",
    });
  }
}
app.post("/signup", cheackUserExist, async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;

  const users = new Users({
    username: username,
    password: password,
  });


  await users.save();
  const token = jwt.sign(
    {
      username: username,
      password: password,
    },
    key,
    { algorithm: "HS256" }
  );

  res.status(200).send({
    msg: "User has been created.",
    token: token,
  });
});

app.post("/signin", authUser, (req, res) => {
  const username = req.body.username;
  const pass = req.body.password;
  const tkn = req.headers["authorization"].split(" ")[1];
  console.log(tkn.toString());
  jwt.verify(tkn, key, function (err, decoded) {
    if (err) {
      const token = jwt.sign(
        {
          username: username,
          password: pass,
        },
        key,
        { algorithm: "HS256" }
      );
      tkn = token;

      res.status(200).send({token: token.toString()});
    }

    if (decoded) {
      res.status(200).send({
        msg: "You logged in Successfully",
        token: tkn,
      });
    }
  });
});

app.listen(3000, (err) => {
  console.log("Server is Listnig on 3000");
});
