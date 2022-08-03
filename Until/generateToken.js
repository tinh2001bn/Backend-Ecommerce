const jwt = require('jsonwebtoken');
  const accessToken =(id) => {
    return jwt.sign({id}, process.env.JWT_SEC,{expiresIn : "3d"})
  }
   module.exports = accessToken

