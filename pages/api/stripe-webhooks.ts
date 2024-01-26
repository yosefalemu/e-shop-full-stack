import Stripe from "stripe"
import { buffer } from "micro"
import { NextApiRequest, NextApiResponse } from "next"

export const config = {
    api: { bodyParser: false }
}

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, { apiVersion: "2023-10-16" })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]
    if (!sig) {
        return res.status(404).send("Missing stripe signature")
    }
    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    } catch (error) {
        return res.status(404).send("Webhook error" + error)
    }
    console.log("event in webhook", event);
    switch (event.type) {
        case "charge.succeeded":
            const charge: any = event.data.object as Stripe.Charge
            const address = {
                city: charge.shipping?.address.city,
                country: charge.shipping?.address.country,
                line1: charge.shipping?.address.line1,
                line2: charge.shipping?.address.line2,
                state: charge.shipping?.address.state,
            }
            if (typeof charge.payment_intent === "string") {
                const updatedOrder = await prisma?.order.update({
                    where: { paymentIntentId: charge.payment_intent },
                    data: { status: "complete", address: address }
                })
                console.log("updated order", updatedOrder);

            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.json({ recieved: "true" })
}
