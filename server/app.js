require("dotenv").config();
require("./config/db").connect();
var cors = require("cors");
const express = require("express");
const User = require("./model/User");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

//user register

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.status(400).send("error");
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    res.json({ status: "ok", user });
  } else {
    return res.status(400).send("error");
  }
});

// update user

app.put("/edit/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user

app.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all user

app.get("/api/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete user

app.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// // app.post("/register", async (req, res) => {
// //   const { name, email, password } = req.body;
// //   if (!(name && email && password)) {
// //     res.status(400).send("all fields required");
// //   }

// //   const existingUser = await User.findOne({ email });

// //   if (existingUser) {
// //     res.status(401).send("User existing");
// //   }

// //   const user = await User.create({
// //     name,
// //     email: email.toLowerCase(),
// //     password,
// //   });

// //   res.status(200).json(user);
// // });

// //user login

// app.get("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!(email && password)) {
//       res.status(400).send("field is missing");
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       res.status(400).send("not registered");
//     }
//     user.password = undefined;
//     res.status(200).json({ user });
//   } catch (error) {
//     console.log(error);
//   }
// });

// //create profile

// app.post("/create/profile", async (req, res) => {
//   const newProfile = new Profile(req.body);

//   try {
//     const savedProfile = await newProfile.save();
//     res.status(200).json(savedProfile);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //get profile

// app.get("/profile/:Id", async (req, res, next, id) => {
//   Profile.findById(id).exec((err, profile) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Profile not found in DB",
//       });
//     }
//     req.profile = profile;
//     next();
//   });
// });

module.exports = app;
