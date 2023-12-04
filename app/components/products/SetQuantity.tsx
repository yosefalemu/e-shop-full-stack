"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}
const btnStyle =
  "border-[1.2px] border-slate-300  px-2 rounded flex items-center justify-center text-xl";
const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center ">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div className="flex items-center gap-4">
        <button className={btnStyle} onClick={handleQuantityDecrease}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyle} onClick={handleQuantityIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
