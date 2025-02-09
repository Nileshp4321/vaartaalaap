import OneSignal from 'react-native-onesignal';

class OneSignalService {
  async init() {
    // Initialize OneSignal
    OneSignal.initialize(process.env.ONE_SIGNAL_APP_ID);

    // Request notification permissions (iOS only, on Android permissions are granted by default)
    const deviceState = await OneSignal.getDeviceState();
    if (deviceState.isSubscribed === false) {
      await OneSignal.Notifications.requestPermission(true);
    }

    // Set up notification handlers
    OneSignal.Notifications.addEventListener(
      'click',
      this.onNotificationClicked,
    );
    OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      this.onNotificationWillShowInForeground,
    );
  }

  onNotificationClicked = event => {
    console.log('OneSignal: notification clicked:', event);
    // Handle notification click here
  };

  onNotificationWillShowInForeground = event => {
    console.log('OneSignal: notification will show in foreground:', event);
    // You can either display the notification or prevent it from displaying
    event.preventDefault();
    // If you want to display it:
    // event.notification.display();
  };

  async getDeviceState() {
    return await OneSignal.getDeviceState();
  }

  async sendNotification(contents, data, userId) {
    const deviceState = await this.getDeviceState();
    const playerId = deviceState.userId;

    const notificationObj = {
      contents: {en: contents},
      include_player_ids: [playerId],
      data: data,
    };

    try {
      const response = await OneSignal.postNotification(notificationObj);
      console.log('Notification sent:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}

export default new OneSignalService();
