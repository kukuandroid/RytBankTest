// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json());

// Simple "database" for demonstration
const users = [
  { username: 'fatimah', password: 'pass1234', id: 'fatimah123', name: 'Fatimah' },
];

// Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Simulate a JWT token or session ID
    const token = `fake-jwt-for-${user.id}-${Date.now()}`;
    res.json({ success: true, token, user: { id: user.id, name: user.name } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Logout Endpoint (optional, could just be client-side token deletion)
app.post('/api/auth/logout', (req, res) => {
  // In a real app, you might invalidate a token on the server
  res.json({ success: true, message: 'Logged out successfully' });
});


// New API: Get account balance (hardcoded)
app.get('/api/account-balance', (req, res) => {
  // Get userId from query or default to first user
  const userId = req.query.userId || (users[0] && users[0].id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  // Hardcoded balance for demonstration
  const balanceData = {
    accountId: user.id,
    userId: user.id,
    balance: 1400.12,
    currency: 'RM',
    name: user.name
  };
  res.json(balanceData);
});

// API: Perform money transfer
app.post('/api/transfer', (req, res) => {
    const { userId, amount, toAccount, note } = req.body;
    console.log("🚀 ~ req:", req.body)
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    // Hardcoded balance for demonstration
    let balance = 1400.12;
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Invalid transfer amount' });
    }
    if (amount > balance) {
      return res.status(400).json({ success: false, error: 'Insufficient balance' });
    }
    // Simulate transfer
    balance -= amount;
    res.json({
      success: true,
      message: `Transferred RM${amount} to account ${toAccount}`,
      newBalance: balance,
      currency: 'RM'
    });
});

app.listen(PORT, () => {
  console.log(`Fake Backend Server running on http://localhost:${PORT}`);
});