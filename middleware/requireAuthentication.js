jwt = require("jsonwebtoken")

const requireAuthentication = (req, res, next) =>{
    //verify authentication
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "Authorization token required"})
    }
    const token = authorization.split(" ")[1]

    try{
        jwt.verify(token, process.env.SECRET_TOKEN)
        next()
    }catch (err){
        console.log(err)
        console.log(token)

        return res.status(401).json({error: "Request is not authorized"})
        
    }
}
module.exports = requireAuthentication