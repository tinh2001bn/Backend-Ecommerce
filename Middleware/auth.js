const jwt=  require('jsonwebtoken')
 const protect = async( req, res, next) =>{
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        console.log("token found");
        try {
          token = req.headers.authorization.split(" ")[1];
          jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
          })
          next();
        } catch (error) {
          console.error(error);
          res.status(401);
          throw new Error("Not authorized, token failed");
        }
 }
}

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
};
module.exports = {protect,admin};