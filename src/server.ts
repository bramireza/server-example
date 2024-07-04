import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mainRouter from './routes';

const app: Express = express();

app.use(cors({
  origin: ['*'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

app.use('/api/v1', mainRouter)

export default app