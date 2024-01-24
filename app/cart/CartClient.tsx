"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import formatPrice from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface CartClientProps {
  currentUser: SafeUser | null;
}
const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const { cartProducts, handleRemoveCart, cartTotalPrice } = useCart();
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
      <div className="grid grid-cols-5 text-xs gap-4 pb-1 items-center mt-8">
        <div className="col-span-2 justify-self-start font-semibold">
          PRODUCT
        </div>
        <div className="col-span-1 justify-self-center font-semibold">
          PRICE
        </div>
        <div className="col-span-1 justify-self-center font-semibold">
          QUANTITY
        </div>
        <div className="col-span-1 justify-self-end font-semibold">TOTAL</div>
      </div>
      <hr />
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <hr />
      <div className="md:flex mt-4 justify-between">
        <div className="max-w-[90px]">
          <Button
            label="Clear cart"
            outline
            small
            onClick={() => {
              handleRemoveCart();
            }}
          />
        </div>
        <hr className="md:no-underline my-4" />
        <div className="flex flex-col gap-2 text-sm items-start">
          <div className="flex items-center gap-4 font-bold text-base">
            <p>subtotal</p>
            <p>{formatPrice(cartTotalPrice)}</p>
          </div>
          <p className="font-extralight text-slate-500">
            Taxes and shipping calculated at checkout
          </p>
          <Button
            label={currentUser ? "Checkout" : "Login to checkout"}
            onClick={() => {
              {
                currentUser ? router.push("/checkout") : router.push("/login");
              }
            }}
          />
          <Link href="/" className="flex items-center gap-2">
            <IoMdArrowRoundBack />
            <span>Continue shipping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
