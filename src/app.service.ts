import { Injectable } from '@nestjs/common';
import data from '../data.json'; 

interface Cat {
  subscriptionActive: boolean;
  pouchSize: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
}

@Injectable()
export class AppService {
  private readonly POUCH_PRICES = {
    A: 55.50,
    B: 59.50,
    C: 62.75,
    D: 66.00,
    E: 69.00,
    F: 71.25,
  };

  getUserById(userId: string) {
    return data.find(user => user.id === userId);
  }

  calculateTotalPrice(cats: Cat[]): number {
    return cats
      .filter(cat => cat.subscriptionActive)
      .reduce((sum, cat) => sum + this.POUCH_PRICES[cat.pouchSize], 0);
  }
}