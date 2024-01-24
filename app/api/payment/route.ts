import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const orderTotalPrice = items.reduce((acc, item) => {
    const currentPrice = item.quantity * item.price;
    return acc + currentPrice;
  }, 0);
  return orderTotalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  console.log("data in route", body);
  console.log("current user in route", currentUser);


  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);
    if (current_intent) {
      const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });
      console.log("updated intent", updatedIntent);
      //update the order
      const existing_order = await prisma.order.findFirst({ where: { paymentIntentId: payment_intent_id } })

      console.log("exisiting order", existing_order);
      if (!existing_order) {
        return NextResponse.json({ error: "Invalid payment intent" }, { status: 400 })
      }
      const updatedorder = await prisma.order.update({ where: { paymentIntentId: payment_intent_id }, data: { amount: total, products: items } })

      console.log("updated order", updatedorder);
      return NextResponse.json({ paymentIntent: updatedIntent });
    }
  } else {
    //create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log("payment intent", paymentIntent);

    //create the order
    orderData.paymentIntentId = paymentIntent.id;
    await prisma.order.create({ data: orderData })
    return NextResponse.json({ paymentIntent });
  }
}
