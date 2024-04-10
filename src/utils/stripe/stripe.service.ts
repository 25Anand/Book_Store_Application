// src/stripe/stripe.service.ts

import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16',// Use whatever API latest version
    });
  }

  async createPaymentIntent(data: any) {
    try {
      const customer = await this.stripe.customers.create({
        email: data.email,
      });

      // Create a payment method
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: 'tok_visa', // Assuming you're using a test card token
        },
      });

      // Attach the payment method to the customer
      await this.stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customer.id,
      });

      // Create a payment intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(data.price * 100), 
        currency: 'usd',
        customer: customer.id,
        payment_method: paymentMethod.id,
        description: 'Purchase of new book',
        confirm: true,
        return_url: 'https://yourwebsite.com/return',
      });

      console.log('Payment intent created successfully');

      return paymentIntent;
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      if (error.raw && error.raw.code === 'rate_limit') {
        const delay = Math.pow(2, error.retryAfter) * 1000;
        console.log(`Rate limit error encountered. Retrying after ${delay} ms.`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.createPaymentIntent(data); // Retry the function
      } else {
        throw error;
      }
    }
  }
}
