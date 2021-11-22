const User = require('../models/User');
const CryptoJS = require("crypto-js");
const router = require('../routes/auth');
const { getToken } = require('../middleware/auth');
//UPDATE
exports.updateUserById = async (req, res) => {
    const checkUser = await User.findOne({email : req.body.email});
    if(checkUser) {
      return res.status(400).json({
        success: false,
        message: "Email ready existed"
      })
    }

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET
      ).toString();
    }
  
    try {
      const user = await User.findById(req.params.id);
      if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        await user.save();
        res.status(200).json({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: getToken(user),
        });
      }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


//DELETE BY ADMIN
exports.deleteUserByAdmin = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

//GET USER
exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
};

//GET ALL USER
exports.getAllUser = async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      res.status(500).json(err);
    }
};
