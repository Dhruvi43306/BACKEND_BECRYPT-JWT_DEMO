const jwt = require("jsonwebtoken");

function authMiddlewear(req,res,next){
    try{
        const authheader = req.headers.authorization

        if(!authheader){
            return res.status(401).json({ message: "Unauthorized" });

        }
        const token = authheader.split(" ")[1]
        if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
        const decode = jwt.verify(token, 'shhhhh')
        req.user = decode
        next()
    }catch(err){
            res.status(401).send({ message: "Unauthorized" });

    }
}
module.exports = authMiddlewear