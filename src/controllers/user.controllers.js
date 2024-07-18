import { pool } from "../db.js";


// Signup user
export const signupUser = async (req, res) => {
  console.log("req data: ", req.body)
  // Check if user exists 
  const user = await pool.query('SELECT * FROM users WHERE email=?;', [req.body.email])
  if (user[0].length) {
    console.log("User is: ", user[0])
    return res.status(501).send("User already exists")
  }


  if (req.body?.email && req.body?.password) {

    try {
      const [result] = await pool.query(`
        INSERT INTO users (email, password) VALUES (?, ?)
      `, [req.body.email, req.body.password]);
      return res.status(200).send({
        user_id : result.insertId,
        email: req.body.email
      });
    } catch (error) {
      console.log("Error trying to signup: ", error)
      return res.status(500).send("Error trying to signup")
    }
  }

  return res.status(500).send("There is no email or password")
}

// GET user by id
export const getUserById = async (req, res) => {
  console.log(req.params)
  if (req.params?.id) {
    const [rows] = await pool.query("SELECT id, email FROM users WHERE id=?", [req.params.id]);
    if (!rows.length) return res.status(404).send({"message":"User not found"});
    return res.status(200).send(rows[0]);
  }
  return res.status(500).send("User does not exists")
}