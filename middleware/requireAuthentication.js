jwt = require("jsonwebtoken")

// const requireAuthentication = (req, res, next) =>{
//     //verify authentication
//     const {authorization} = req.headers
//     if(!authorization){
//         return res.status(401).json({error: "Authorization token required"})
//     }
//     const token = authorization.split(" ")[1]

//     try{
//         jwt.verify(token, process.env.SECRET_TOKEN)
//         next()
//     }catch (err){
//         console.log(err)
//         console.log(token)

//         return res.status(401).json({error: "Request is not authorized"})
        
//     }
// }

const requireAuthentication = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "Authorization token required" });
    }
  
    jwt.verify(token, process.env.SECRET_TOKEN, (err) => {
      if (err) {
        console.log("Token verification failed", err);
        return res.status(403).json({ error: "Request is not authorized" });
      }
  
      next();
    });
  };
module.exports = requireAuthentication

