import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-app';

export const PORT = process.env.PORT || '8000';