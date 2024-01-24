"use client";

import { useCart } from "@/hooks/useCart";
import formatPrice from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalPrice, handleRemoveCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const formatedPrice = formatPrice(cartTotalPrice);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit: any = async (e: React.FocusEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    stripe
      .confirmPayment({ elements, redirect: "if_required" })
      .then((response) => {
        if (!response.error) {
          toast.success("Payment success");
          handleRemoveCart();
          handleSetPaymentIntent(null);
          handleSetPaymentSuccess(true);
        }
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading text="Enter your details to complete the checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address information</h2>
      <AddressElement options={{ mode: "shipping" }} />
      <h2 className="font-semibold mb-2 mt-7">Payment information</h2>
      <PaymentElement options={{ layout: "tabs" }} id="payment-element" />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total:{formatedPrice}
      </div>
      <Button
        label={loading ? "Processing" : "Pay now"}
        disabled={loading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
