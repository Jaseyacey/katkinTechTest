import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { Cat } from './types'; 

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/comms/your-next-delivery/:userId')
  getNextDelivery(@Param('userId') userId: string) {
    const user = this.appService.getUserById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activeCats = user.cats
      .filter((cat: any) => cat.subscriptionActive)
      .map((cat: any) => ({
        ...cat,
        pouchSize: cat.pouchSize as 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
      })) as Cat[];

    activeCats.forEach(cat => {
      if (!cat.name) {
        console.error('Missing name property for cat:', cat);
      }
    });

    const catNames = activeCats
      .map(cat => cat.name)
      .filter(name => name)
      .join(', ')
      .replace(/, ([^,]*)$/, ' and $1');

    console.log('Cat Names:', catNames);

    const totalPrice = this.appService.calculateTotalPrice(activeCats);
    const freeGift = totalPrice > 120;

    return {
      title: `Your next delivery for ${catNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
      totalPrice: totalPrice,
      freeGift,
    };
  }
}