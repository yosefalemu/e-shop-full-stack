import { useCart } from "@/hooks/useCart";
import { FaCartShopping } from "react-icons/fa6";

const CartCounter = () => {
  const { cartTotalQuantity } = useCart();
  return (
    <div className="relative">
      <div>
        <FaCartShopping size={20} />
      </div>
      <div className="absolute top-[-12px] right-[-16px] text-white h-5 w-5 rounded-full flex items-center justify-center text-xs bg-slate-700">
        {cartTotalQuantity}
      </div>
    </div>
  );
};

export default CartCounter;
