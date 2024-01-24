"use client";
import { useCart } from "@/hooks/useCart";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
const CheckOutClinet = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();

  console.log("payment intent", paymentIntent);
  console.log("client secret", clientSecret);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);
      fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((response) => {
          console.log("response in checkout", response);

          setLoading(false);
          if (response.status === 401) {
            return router.push("/login");
          }
          return response.json();
        })
        .then((data) => {
          console.log("data in checkout", data);
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          console.log("Error", error);
          return;
        });
    }
  }, [cartProducts, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading checkout...</div>}
      {error && (
        <div className="text-rose-500 text-center">Something went wrong...</div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-teal-400 text-center">Payment success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => {
                router.push("/order");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutClinet;
