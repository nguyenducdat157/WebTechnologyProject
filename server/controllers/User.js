const User = require('../models/User');
const CryptoJS = require("crypto-js");
const router = require('../routes/auth');
const { getToken } = require('../middleware/auth');
const Order = require('../models/Order');
//UPDATE
exports.updateUserById = async (req, res) => {
  console.log(req.body);
    const user = await User.findById(req.params.id);
    const checkUser = await User.findOne({email : req.body.email});
    if(checkUser && checkUser._id.toString() !== req.params.id) {
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
      const userAndOrders = [];
      const users = await User.find({});
      for(let i = 0; i < users.length; i++) {
        const orders = await Order.find({ userId: users[i]._id });
        userAndOrders.push({
          _id: users[i]._id,
          name: users[i].name,
          email: users[i].email,
          isAdmin: users[i].isAdmin,
          numberOrder: orders.length
        })
      }
      res.send(userAndOrders);
    } catch (err) {
      res.status(500).json(err);
    }
};

//CHANGE PASSWORD
exports.changePassword = async (req, res) => {
  let user = await User.findById(req.params.id);
  let {current_password, new_password} = req.body;
  const OriginalPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SECRET
  ).toString(CryptoJS.enc.Utf8);

  console.log(OriginalPassword);
  console.log(current_password);

  const isMatch = OriginalPassword === current_password;
  //password dont't match
  if(!isMatch) {
      return res.status(401).json({
          success: false, 
          message: 'password is not match!' 
      })
  }

  new_password = await CryptoJS.AES.encrypt(
    new_password,
      process.env.PASS_SECRET
    ).toString();

  try {
    if(user) {
      user.password = new_password || user.password;
      await user.save();
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
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