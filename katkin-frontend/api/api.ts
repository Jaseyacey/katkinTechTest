import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api', (req: Request, res: Response) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/comms/your-next-delivery/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  res.send({
    title: 'Your next delivery',
    message: 'Your next delivery will be dispatched on 15th July 2021',
    totalPrice: '25.00',
    freeGift: true,
  });
});

app.listen(3001, () => console.log('Express server is running on localhost:3001'));