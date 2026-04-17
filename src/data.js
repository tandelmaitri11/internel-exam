// Sample dataset for PushSubscription library
// This contains mock push subscription data for demonstration purposes

export const pushSubscriptions = [
  {
    endpoint: "https://fcm.googleapis.com/fcm/send/fake-endpoint-1",
    keys: {
      p256dh: "BOr82iUYrDBWQc5VW8yPBslYzFwR5-VTBGRBbuIo-Dn9sXNNiCmG8dKu-pKiHNIA",
      auth: "TIsAtNwnnwcV3d11_rmLDg"
    },
    userId: "user123",
    subscribedAt: "2023-10-01T10:00:00Z"
  },
  {
    endpoint: "https://fcm.googleapis.com/fcm/send/fake-endpoint-2",
    keys: {
      p256dh: "BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8",
      auth: "FPcF3EF1-EWK5wNybtMcSA"
    },
    userId: "user456",
    subscribedAt: "2023-10-02T14:30:00Z"
  },
  {
    endpoint: "https://fcm.googleapis.com/fcm/send/fake-endpoint-3",
    keys: {
      p256dh: "BOr82iUYrDBWQc5VW8yPBslYzFwR5-VTBGRBbuIo-Dn9sXNNiCmG8dKu-pKiHNIA",
      auth: "TIsAtNwnnwcV3d11_rmLDg"
    },
    userId: "user789",
    subscribedAt: "2023-10-03T09:15:00Z"
  }
];

// Function to add a new subscription (for library use)
export const addPushSubscription = (subscription) => {
  pushSubscriptions.push({
    ...subscription,
    subscribedAt: new Date().toISOString()
  });
};

// Function to remove a subscription by endpoint
export const removePushSubscription = (endpoint) => {
  const index = pushSubscriptions.findIndex(sub => sub.endpoint === endpoint);
  if (index > -1) {
    pushSubscriptions.splice(index, 1);
  }
};

// Function to get subscriptions by userId
export const getSubscriptionsByUser = (userId) => {
  return pushSubscriptions.filter(sub => sub.userId === userId);
};