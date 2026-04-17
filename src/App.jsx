import React, { useState } from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import PushSubscriptionManager from "./utils/PushSubscriptionManager";

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [stats, setStats] = useState({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    inactiveSubscriptions: 0,
    activationRate: 0,
  });

  const handleRegistrationSuccess = (userData) => {
    // Add user to registered users list
    setRegisteredUsers(prev => [...prev, userData]);

    // Simulate push subscription creation
    const mockSubscription = {
      endpoint: `https://fcm.googleapis.com/fcm/send/endpoint-${userData.id}`,
      keys: {
        p256dh: "BOr82iUYrDBWQc5VW8yPBslYzFwR5-VTBGRBbuIo-Dn9sXNNiCmG8dKu-pKiHNIA",
        auth: "TIsAtNwnnwcV3d11_rmLDg"
      }
    };

    try {
      // Register push subscription
      PushSubscriptionManager.registerPushSubscription(userData, mockSubscription);

      // Update statistics
      const updatedStats = PushSubscriptionManager.getStatistics();
      setStats(updatedStats);

      console.log("User registered with push subscription:", userData);
    } catch (error) {
      console.error("Error registering push subscription:", error);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1>Library Subscription System</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Registration Form Section */}
        <section className="registration-section">
          <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
        </section>

         {/* Statistics Section */}
        {/*<section className="statistics-section">
          <div className="stats-container">
            <h2>Subscription Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalSubscriptions}</div>
                <div className="stat-label">Total Subscriptions</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.activeSubscriptions}</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.inactiveSubscriptions}</div>
                <div className="stat-label">Inactive</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.activationRate}%</div>
                <div className="stat-label">Activation Rate</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Registered Users Section */}
        {registeredUsers.length > 0 && (
          <section className="users-section">
            <div className="users-container">
              <h2>Registered Users ({registeredUsers.length})</h2>
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Plan</th>
                      <th>Registered At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`plan-badge plan-${user.subscriptionPlan}`}>
                            {user.subscriptionPlan === 'basic' && 'Basic'}
                            {user.subscriptionPlan === 'premium' && 'Premium'}
                            {user.subscriptionPlan === 'enterprise' && 'Enterprise'}
                            {user.subscriptionPlan === 'student' && 'Student'}
                          </span>
                        </td>
                        <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2026 Library Push Subscription System | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;