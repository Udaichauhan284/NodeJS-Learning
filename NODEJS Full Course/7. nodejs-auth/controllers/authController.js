//first call the model which i created in models folder User schema
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register controller
const registerUser = async (req, res) => {
  try {
    //extact user information from our request body
    const { username, email, password, role } = req.body;

    //now check if the user is already exists in our database or not
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "user is already exists with same username or same email.",
      });
    }

    //now start the process of creating the user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user save in you db
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      return res.status(201).json({
        success: true,
        message: "user created successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "unable to register user! please try again.",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "some error occured! Please try again",
    });
  }
};

//login controller, which let user to login in the application
const loginUser = async (req, res) => {
  try {
    //first get the username and password from req
    const { username, password } = req.body;
    //now find it is that person in db or not
    const user = await User.findOne({ username });

    //now chck user the user
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user dosen't exixts",
      });
    }

    //now check the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials",
      });
    }

    //create user token, using the username, id, role create a token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    //now user checked and accessToken is created, now return the success
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

//now controller for changing the password
const changePassword = async (req, res) => {
    try {
        //first get the userId who is changing the password
        const userId = req.userInfo.userId;

        //extract old and new password
        const { oldPassword, newPassword } = req.body;

        //find the user which is current logged in by the access token and userId
        const user = await User.findById(userId);

        if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
        });
        }

        //check if the old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: "Old Password is not correct! Please try again",
        });
        }

        //now hash the new password
        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        //update the user password with new one
        user.password = newHashedPassword;
        await user.save();

        res.status(200).json({
        success: true,
        message: "Password changed successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
        success: false,
        message: "Some error occured! Please try again",
        });
    }
};

//now export these controller, so we can use these in routes
module.exports = { registerUser, loginUser, changePassword };
