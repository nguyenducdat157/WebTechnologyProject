const jwt = require('jsonwebtoken')
const oldAuth = (req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if(!token) {
        return res.status(401).json({
            success: false,
            msg: 'No token, auth denied'
        })
    }

    //verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //set user id in req.user
        req.user = decoded.user;
        next();
    } catch (error) {
        req.status(401).json({
            success: false,
            msg: 'Token is not valid'
        })
    }
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log("authHeader:", authHeader)
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log(err)
          res.status(403).json("Token is not valid!");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };
  
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

  module.exports = {
    oldAuth,
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  }