const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { promisify } = require('util');

// Generate a JWT Token (usually called during user login)
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Protect middleware to ensure user is authenticated
exports.protect = async (req, res, next) => {
  try {
    // 1) Get the token from the header (Bearer token)
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // 4) Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Authentication failed',
    });
  }
};

// User login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password!',
    });
  }

  // 2) Check if user exists & password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  // 3) If everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
};

// Example protected route controller
exports.getMyProfile = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};

exports.signup = async (req, res) => {
  try {
    console.log('Received signup request with body:', req.body);
    
    const { name, email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email format!',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already in use!',
      });
    }

    // Create new user - remove the manual password hashing since it's handled in the pre-save middleware
    const newUser = await User.create({
      name,
      email,
      password, // Don't hash here, let the pre-save middleware handle it
    });

    // Generate token
    const token = signToken(newUser._id);

    // Send response
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (err) {
    console.error('Signup error:', err); // Log the actual error
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

