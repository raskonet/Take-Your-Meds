const Meds = require('../models/medsModel');
const User = require('../models/userModel');

exports.sendNotification = async () => {
  try {
    // Find medications due in the next hour
    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);
    
    const dueMeds = await Meds.find({
      notificationTime: {
        $gte: now,
        $lte: inOneHour
      }
    }).populate('userId', 'name email');

    for (const med of dueMeds) {
      if (med.userId) {
        // For browser notifications (if implemented on frontend)
        console.log(`🔔 Notification for ${med.userId.name}: Time to take ${med.name}`);
        
        // If you're using a browser notification system:
        if (typeof window !== 'undefined' && 'Notification' in window) {
          if (Notification.permission === 'granted') {
            new Notification(`Medicine Reminder`, {
              body: `Time to take ${med.name}`,
              icon: '/path-to-your-icon.png'  // Add your icon path
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('Error sending notifications:', err);
  }
};
