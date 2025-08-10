const mongoose = require('mongoose');

let isConnected = false;

async function connectDB(uri) {
  if (isConnected) return;

  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) throw new Error('MONGODB_URI is not set in .env');

  mongoose.set('strictQuery', true);

  try {
    const conn = await mongoose.connect(mongoUri);
    isConnected = true;
    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => console.error('❌ MongoDB runtime error:', err.message));
  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('⚠️  MongoDB disconnected');
  });
}

module.exports = { connectDB };
