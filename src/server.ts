import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import router from './routes';
import bodyParser from 'body-parser';

import { connectDB } from './database';

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log('Server running on PORT:', PORT);
}).on('error', (error) => {
    throw new Error(error.message);
});
