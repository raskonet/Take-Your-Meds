const mongoose = require('mongoose');

const medsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A med must have a name'],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A med must belong to a user'],
  },
  notificationTime: {
    type: Date,
    required: [true, 'Notification time is required'],
  },
},{collection : 'meds'});

const Meds = mongoose.model('Meds', medsSchema);
module.exports = Meds;
