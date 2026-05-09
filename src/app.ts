import express, { application, Application, Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { AuthRoutes } from './modules/Auth/auth.route';
import routes from './routes';
import "./utils/cron"

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL!,
    ],
    credentials: true,
  })
);

app.use(passport.initialize());

//application routes
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

export default app;
