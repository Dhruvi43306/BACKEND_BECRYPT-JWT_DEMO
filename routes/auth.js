const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../db/db")

const router = express.Router()


router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO auth_login (email, password) VALUES (?, ?)",
      [email, hashPassword]
    );

    res.status(201).send({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
});



//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [data] = await db.query(
      "SELECT * FROM auth_login WHERE email = ?",
  [email]
    );

    if (data.length === 0) {
      return res.status(401).send({ message: "User not found" });
    }
    console.log("data:",data)
    const user = data[0];
    console.log(user)    

    const isValid = await bcrypt.compare(password.toString(),
  user.password);
    if (!isValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
  { id: user.user_id, email: user.email },
  "shhhhh"
);

    res.send({
      message: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).send({ error: true, message: err.message });
  }
});


module.exports = router