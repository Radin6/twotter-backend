import express from "express";
import { userMock } from "../mocks/userMock.js";
import { pool } from "../db.js";

const router = express.Router()

// GET user
router.get("/", (req, res)=> {
  res.send(userMock)
})

// POST signup
router.post("/signup", async (req, res) => {
  console.log(req.body)
  const user = await pool.query('SELECT * FROM users WHERE email=?;', [req.body.email])
  if (user[0].length) {
    console.log("User is: ", user[0])
    return res.status(501).send("User already exists")
  }
  

  if(req.body?.email && req.body?.password) {

    try {
      await pool.query(`
        INSERT INTO \`users\` (\`email\`, \`password\`) VALUES (?, ?)
      `, [req.body.email, req.body.password]);
      return res.status(200).send("Signup successful");
    } catch (error) {
      console.log("Error trying to signup: ", error)
      return res.status(500).send("Error trying to signup")
    }
  }

  return res.status(500).send("There is no email or password")
})

export default router;