import fs from 'fs';
import mongoose from 'mongoose';
import Tour from './../../src/models/tourModel';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI?.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD ?? '',
).replace('<DBNAME>', process.env.MONGODB_DBNAME ?? '');

void mongoose.connect(mongoURI as string).then();

const tours = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/tours-simple.json'), 'utf-8'),
);

const importData = async (): Promise<void> => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async (): Promise<void> => {
  try {
    await Tour.deleteMany({});
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

switch (process.argv[2]) {
  case '--import':
    void importData();
    break;
  case '--delete':
    void deleteData();
    break;
  default:
    console.log('Please specify --import or --delete');
    process.exit();
    break;
}

console.log(process.argv);
