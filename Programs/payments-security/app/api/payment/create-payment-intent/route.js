import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POST = async (req) => {
  const { amount } = await req.json();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "INR",
    });

    return new NextResponse(
      paymentIntent.client_secret, {
        status: 200
      });
  } catch (error) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}