import Stripe from "stripe";

const stripeClient = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default stripeClient;
