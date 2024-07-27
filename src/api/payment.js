import Stripe from 'stripe';

const stripe = Stripe('sk_test_51PgtH5RpckN8qdhjucJDDOw45owc4rEfll6HubDjHikaC33ZsGUWlKUOOsbg8wm85nDIFB5buyeB5ob9hB7YZUIG00KeWfiR3w');

export async function handler(event) {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr', // or other supported currency
      payment_method_types: ['card', 'upi'],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
