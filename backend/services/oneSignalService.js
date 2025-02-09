import {Client} from 'onesignal-node';

const client = new Client({
  app: {appAuthKey: 'YOUR_REST_API_KEY', appId: 'YOUR_ONESIGNAL_APP_ID'},
});

export const sendNotification = async (message, data, userId) => {
  try {
    const response = await client.createNotification({
      contents: {en: message},
      include_player_ids: [userId],
      data: data,
    });
    console.log('Notification sent:', response.body);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
