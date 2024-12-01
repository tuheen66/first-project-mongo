import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers

app.use(express.json());
app.use(cors());

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
