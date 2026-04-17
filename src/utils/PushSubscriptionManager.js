/**
 * PushSubscriptionManager
 * Manages push subscriptions for the library notification system
 */

import { pushSubscriptions } from '../data';

export class PushSubscriptionManager {
  /**
   * Register a new push subscription for a user
   * @param {Object} userData - User data from registration
   * @param {PushSubscription} subscription - Push subscription object
   * @returns {Object} - Created subscription with user info
   */
  static registerPushSubscription(userData, subscription) {
    if (!userData || !subscription) {
      throw new Error('User data and subscription are required');
    }

    const newSubscription = {
      ...subscription,
      userId: userData.id,
      userEmail: userData.email,
      userName: userData.name,
      registeredAt: new Date().toISOString(),
      isActive: true,
    };

    pushSubscriptions.push(newSubscription);
    console.log('Push subscription registered:', newSubscription);
    return newSubscription;
  }

  /**
   * Unsubscribe a user from push notifications
   * @param {string} endpoint - The push subscription endpoint
   * @returns {boolean} - True if unsubscribed successfully
   */
  static unsubscribe(endpoint) {
    const index = pushSubscriptions.findIndex(sub => sub.endpoint === endpoint);
    if (index > -1) {
      const removed = pushSubscriptions.splice(index, 1);
      console.log('Unsubscribed:', removed[0]);
      return true;
    }
    console.warn('Subscription not found for endpoint:', endpoint);
    return false;
  }

  /**
   * Get all subscriptions for a specific user
   * @param {string} userId - The user ID
   * @returns {Array} - Array of subscriptions for the user
   */
  static getSubscriptionsByUserId(userId) {
    return pushSubscriptions.filter(sub => sub.userId === userId);
  }

  /**
   * Get subscription by email
   * @param {string} email - User email
   * @returns {Array} - Array of subscriptions
   */
  static getSubscriptionsByEmail(email) {
    return pushSubscriptions.filter(sub => sub.userEmail === email);
  }

  /**
   * Get all active subscriptions
   * @returns {Array} - Array of all active subscriptions
   */
  static getAllActiveSubscriptions() {
    return pushSubscriptions.filter(sub => sub.isActive === true);
  }

  /**
   * Get total subscription count
   * @returns {number} - Total number of subscriptions
   */
  static getTotalSubscriptionCount() {
    return pushSubscriptions.length;
  }

  /**
   * Deactivate a subscription without removing it
   * @param {string} endpoint - The push subscription endpoint
   * @returns {boolean} - True if deactivated successfully
   */
  static deactivateSubscription(endpoint) {
    const subscription = pushSubscriptions.find(sub => sub.endpoint === endpoint);
    if (subscription) {
      subscription.isActive = false;
      subscription.deactivatedAt = new Date().toISOString();
      console.log('Subscription deactivated:', subscription);
      return true;
    }
    return false;
  }

  /**
   * Reactivate a deactivated subscription
   * @param {string} endpoint - The push subscription endpoint
   * @returns {boolean} - True if reactivated successfully
   */
  static reactivateSubscription(endpoint) {
    const subscription = pushSubscriptions.find(sub => sub.endpoint === endpoint);
    if (subscription) {
      subscription.isActive = true;
      delete subscription.deactivatedAt;
      console.log('Subscription reactivated:', subscription);
      return true;
    }
    return false;
  }

  /**
   * Get subscription details
   * @param {string} endpoint - The push subscription endpoint
   * @returns {Object|null} - Subscription object or null if not found
   */
  static getSubscriptionDetails(endpoint) {
    return pushSubscriptions.find(sub => sub.endpoint === endpoint) || null;
  }

  /**
   * Update subscription metadata
   * @param {string} endpoint - The push subscription endpoint
   * @param {Object} metadata - Metadata to update
   * @returns {boolean} - True if updated successfully
   */
  static updateSubscriptionMetadata(endpoint, metadata) {
    const subscription = pushSubscriptions.find(sub => sub.endpoint === endpoint);
    if (subscription) {
      subscription.metadata = { ...subscription.metadata, ...metadata };
      subscription.lastUpdatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }

  /**
   * Get subscriptions statistics
   * @returns {Object} - Statistics object
   */
  static getStatistics() {
    const total = pushSubscriptions.length;
    const active = pushSubscriptions.filter(sub => sub.isActive === true).length;
    const inactive = total - active;

    return {
      totalSubscriptions: total,
      activeSubscriptions: active,
      inactiveSubscriptions: inactive,
      activationRate: total > 0 ? ((active / total) * 100).toFixed(2) : 0,
    };
  }

  /**
   * Export all subscriptions
   * @returns {Array} - Copy of all subscriptions
   */
  static exportAllSubscriptions() {
    return JSON.parse(JSON.stringify(pushSubscriptions));
  }

  /**
   * Clear all subscriptions (use with caution)
   * @returns {number} - Number of subscriptions cleared
   */
  static clearAllSubscriptions() {
    const count = pushSubscriptions.length;
    pushSubscriptions.length = 0;
    console.warn(`Cleared ${count} subscriptions`);
    return count;
  }
}

export default PushSubscriptionManager;
