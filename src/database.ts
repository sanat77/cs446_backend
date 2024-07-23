import mongoose from 'mongoose';

export const connectDB = async () => {
    const mongodb_uri = process.env.MONGODB_URI || '';
    mongoose
        .connect(mongodb_uri)
        .then(() => {
            console.log('MongoDB Connected!!');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });
};
