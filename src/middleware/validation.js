import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const {token} = req.header

  if (!token) {
    res.status(401).send({message: "You are not authorized"})
  }

  const validate = jwt.verify(token, process.env.JWT_SECRET)
  console.log(validate)

  next()
}

export default auth;