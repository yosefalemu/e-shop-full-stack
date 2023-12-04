"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import Heading from "../components/Heading";

const CartClient = () => {
  const { cartProducts } = useCart();
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <Link href="/" className="flex items-center gap-1 mt-2 text-slate-500">
          <IoMdArrowRoundBack size={20} />
          <span>Start shopping</span>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Heading text="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-1 items-center mt-3">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="col-span-1 justify-self-center">PRICE</div>
        <div className="col-span-1 justify-self-center">QUANTITY</div>
        <div className="col-span-1 justify-self-end">TOTAL</div>
      </div>
      <hr />
    </div>
  );
};

export default CartClient;
