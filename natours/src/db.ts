import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI?.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD ?? '',
).replace('<DBNAME>', process.env.MONGODB_DBNAME ?? '');

let connection;

try {
  connection = mongoose.connect(mongoURI as string);
  console.log('MongoDB connected successfully');
} catch (err) {
  console.log(err);
}

export default connection;
