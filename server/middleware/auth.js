const jwt = require('jsonwebtoken')

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    // {
    //   expiresIn: '48h',
    // }
  );
};

const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          console.log(err)
          return res.status(401).json("Invalid Token");
        }
        // console.log(user);
        req.user = user;
        next();
        return;
      });
    } else {
      return res.status(401).json("Token is not supplied.");
    }
  };
  
const verifyTokenAndAuthorization = (req, res, next) => {
  isAuth(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
const isAdmin = (req, res, next) => {
  // console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

  module.exports = {
    getToken,
    isAuth,
    isAdmin,
    // verifyToken,
    verifyTokenAndAuthorization,
    // verifyTokenAndAdmin,
  }