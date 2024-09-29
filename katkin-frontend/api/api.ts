import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3002',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const users = [
  {
    id: 'ff535484-6880-4653-b06e-89983ecf4ed5',
    firstName: 'Kayleigh',
    cats: [
      { name: 'Dorian', subscriptionActive: true },
      { name: 'Ocie', subscriptionActive: true },
    ],
  },
];

app.get('/api/comms/your-next-delivery/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const activeCats = user.cats.filter(cat => cat.subscriptionActive);
  const catNames = activeCats.map(cat => cat.name).join(', ').replace(/, ([^,]*)$/, ' and $1');

  res.json({
    title: `Your next delivery for ${catNames}`,
    message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
    totalPrice: 25.00, 
    freeGift: true,
  });
});

app.listen(3001, () => console.log('Express server is running on localhost:3001'));