import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

type cartContextType = {
  cartTotalQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddProduct: (product: CartProductType) => void;
};

interface Props {
  [propsName: string]: any;
}

export const cartContext = createContext<cartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const itemProducts: any = localStorage.getItem("eShopCartProducts");
    const cartProducts: CartProductType[] | null = JSON.parse(itemProducts);
    setCartProducts(cartProducts);
  }, []);
  const handleAddProduct = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product is successfully added to cart!", {
        id: "success1",
      });
      localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);
  const value = { cartTotalQuantity, cartProducts, handleAddProduct };
  return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(cartContext);
  console.log(context);

  if (context === null) {
    throw new Error("useCart must be with in cart context provider");
  }
  return context;
};
