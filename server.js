const express = require("express")


const authRoutes = require("./backend/routes/auth")
const authMiddleWear = require("./backend/middlewear/authMiddlewear")
const app = express()
app.use(express.json())

app.use("/api/auth",authRoutes)


app.get("/api/dashboard", authMiddleWear, (req, res) => {
  res.send({
    message: "Welcome to dashboard",
    user: req.user
  });
});




app.listen(3000,()=>{
    console.log("Server started at 3000")
})