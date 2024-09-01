import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../schema/userSchema.js';
import catchErrors from '../util/errorUtil.js';

const registerUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    let userObj = await User.findOne({ email });

    if (userObj) {
      res.status(401).json({
        msg: 'User already exists',
      });
    }

    const isAdmin = false;

    const salt = await bcrypt.genSalt(10);

    const hashPassword = bcrypt.hashSync(password, salt);
    console.log(hashPassword);

    let newUser = {
      firstName,
      lastName,
      email,
      password: hashPassword,
      isAdmin: isAdmin,
    };

    let savedUser = await new User(newUser).save();
    let user = savedUser.toObject();

    if (savedUser) {
      return res.status(201).json({
        msg: 'User Registration Success!',
        data: {
          ...user,
          password: null,
        },
        status: 'SUCCESS',
      });
    }
  } catch (error) {
    return catchErrors(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    let userObj = await User.findOne({ email });

    if (!userObj) {
      return res.status(404).json({
        msg: 'User Not Found',
        status: 'FAILED',
      });
    }

    let passwordCheck = await bcrypt.compare(password, userObj.password);

    if (!passwordCheck) {
      res.status(401).json({
        msg: 'Invalid Password',
        status: 'FAILED',
        data: null,
      });
    }

    let payload = {
      id: userObj._id,
      email: userObj.email,
    };

    let secretkey = process.env.JWT_SECRET_KEY;

    let { firstName, lastName, _id, createdAt, isAdmin } = userObj;

    if (payload && secretkey) {
      let token = jwt.sign(payload, secretkey);

      return res.status(200).json({
        msg: 'Login success',
        token: token,
        data: { email, firstName, lastName, _id, createdAt, isAdmin },
      });
    }
  } catch (error) {
    return catchErrors(error, res);
  }
};

const getData = async (req, res) => {
  try {
    let { id } = req.headers['theUser'];

    let userFound = await User.findById(id);

    if (!userFound) {
      return res.status(404).json({
        msg: 'User not found',
      });
    }

    let user = userFound.toObject();

    delete user.password;

    res.status(200).json({
      msg: 'SUCCESS',
      data: user,
    });
  } catch (err) {
    return catchErrors(err, res);
  }
};

export default {
  registerUser,
  loginUser,
  getData,
};
