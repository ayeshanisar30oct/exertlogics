// import mongoose from 'mongoose';


// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log("DB connected!");
//       return mongoose;
//     }).catch((error) => {
//       console.error('Error connecting to MongoDB:', error);
//       throw new Error('Failed to connect to MongoDB');
//     });
//   }
//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     cached.promise = null;  // Reset cached.promise in case of failure
//     throw error;
//   }
//   return cached.conn;
// }

// export default dbConnect;

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI.replace('<PASSWORD>', process.env.MONGODB_PASSWORD);

if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local',
    )
    }

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('Db connected')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}

export default dbConnect