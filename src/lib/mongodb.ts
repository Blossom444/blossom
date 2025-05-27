import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

console.log('MongoDB URI:', MONGODB_URI);

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase() {
  try {
    console.log('Checking cached connection...');
    if (cached.conn) {
      console.log('Using cached connection');
      return cached.conn;
    }

    if (!cached.promise) {
      console.log('Creating new connection...');
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      });
    }

    try {
      console.log('Awaiting connection...');
      cached.conn = await cached.promise;
      console.log('Connection established');
    } catch (e) {
      console.error('Connection error:', e);
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error('Error in connectToDatabase:', error);
    throw error;
  }
} 