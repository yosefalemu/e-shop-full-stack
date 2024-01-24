import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { json } from "stream/consumers";

type cartContextType = {
  cartTotalQuantity: number;
  cartTotalPrice: number;
  cartProducts: CartProductType[] | null;
  handleAddProduct: (product: CartProductType) => void;
  handleRemoveProduct: (product: CartProductType) => void;
  handleRemoveCart: () => void;
  handleIncreaseCartQunatity: (product: CartProductType) => void;
  handleDecreaseCartQuantity: (product: CartProductType) => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

interface Props {
  [propsName: string]: any;
}

export const cartContext = createContext<cartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const itemProducts: any = localStorage.getItem("eShopCartProducts");
    const cartProducts: CartProductType[] | null = JSON.parse(itemProducts);
    const eshopPaymentIntent: any = localStorage.getItem("eshopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eshopPaymentIntent);
    setCartProducts(cartProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotal = () => {
      if (cartProducts) {
        const { totalPrice, totalQuantity } = cartProducts.reduce(
          (acc, item) => {
            const itemPrice = item.price * item.quantity;
            acc.totalPrice += itemPrice;
            acc.totalQuantity += item.quantity;
            return acc;
          },
          {
            totalPrice: 0,
            totalQuantity: 0,
          }
        );
        setCartTotalPrice(totalPrice);
        setCartTotalQuantity(totalQuantity);
      }
    };
    getTotal();
  }, [cartProducts]);

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

  const handleRemoveProduct = useCallback(
    (product: CartProductType) => {
      if (product) {
        const filteredProducts = cartProducts?.filter(
          (item) => item.id !== product.id
        );
        setCartProducts(filteredProducts || null);
        toast.success("Product is successfully removed from cart!", {
          id: "success2",
        });
        localStorage.setItem(
          "eShopCartProducts",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleRemoveCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQuantity(0);
    setCartTotalPrice(0);
    toast.success("Cart is cleared", {
      id: "success3",
    });
    localStorage.setItem("eShopCartProducts", JSON.stringify(null));
  }, [cartProducts]);

  const handleIncreaseCartQunatity = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 20) {
        toast.error("Opps! Max product quantity reached");
        return;
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const exsitingIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (exsitingIndex > -1) {
          updatedCart[exsitingIndex].quantity = ++updatedCart[exsitingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleDecreaseCartQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === 1) {
        toast.error("Opps! Min product quantity reached");
        return;
      }
      if (cartProducts) {
        updatedCart = [...cartProducts];
        const exsitingIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (exsitingIndex > -1) {
          updatedCart[exsitingIndex].quantity = --updatedCart[exsitingIndex]
            .quantity;
        }
        setCartProducts(updatedCart);
        localStorage.setItem("eShopCartProducts", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );
  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("eshopPaymentIntent", JSON.stringify(val));
    },
    [cartProducts]
  );

  const value = {
    cartTotalQuantity,
    cartTotalPrice,
    cartProducts,
    handleAddProduct,
    handleRemoveProduct,
    handleRemoveCart,
    handleIncreaseCartQunatity,
    handleDecreaseCartQuantity,
    paymentIntent,
    handleSetPaymentIntent,
  };
  return <cartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(cartContext);

  if (context === null) {
    throw new Error("useCart must be with in cart context provider");
  }
  return context;
};
