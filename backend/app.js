const express = require('express');
const morgan = require('morgan');
const cron = require('node-cron');
const medsRouter = require('./routes/medsRoutes');
const userRouter = require('./routes/userRoutes');
const sendNotification = require('./controllers/notificationController').sendNotification;
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/meds', medsRouter);
app.use('/api/v1/users', userRouter);

app.get('/', (req, res) => {
  res.send('Medicine Reminder API is running!');
});

// Cron job to check for notifications every minute
cron.schedule('* * * * *', () => {
  sendNotification();
});

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;

