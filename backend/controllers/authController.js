import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    console.log('register received');
    const {name, email, password} = req.body;
    const user = new User({name, email, password});
    await user.save();
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res
      .status(201)
      .json({token, user: {_id: user._id, name: user.name, email: user.email}});
  } catch (error) {
    res
      .status(400)
      .json({message: 'Registration failed', error: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({message: 'Invalid email or password'});
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
    res.json({
      token,
      user: {_id: user._id, name: user.name, email: user.email},
    });
  } catch (error) {
    res.status(400).json({message: 'Login failed', error: error.message});
  }
};
