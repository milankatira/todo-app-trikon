import mongoose from 'mongoose';

/**
 * #### function to make connection with dataBase
 */

export const db = async () => {

  try {

    await mongoose.connect(process.env.MONGODB_URI as unknown as string);
    console.log('Mongodb connected successfully.');

  } catch (error) {

    console.log(process.env.MONGODB_URI);
    console.log('Database connection error: ', error);

  }

};