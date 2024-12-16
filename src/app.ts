import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  });
};

app.get('/', test);

app.use(globalErrorhandler);
app.use(notFound);

export default app;
