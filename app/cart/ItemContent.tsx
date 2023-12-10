import Image from "next/image";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import truncateTextForCart from "@/utils/truncateForCart";
import formatPrice from "@/utils/formatPrice";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProduct,
    handleIncreaseCartQunatity,
    handleDecreaseCartQuantity,
    cartTotalPrice,
    cartTotalQuantity,
  } = useCart();
  console.log("cartTotalPrice", cartTotalPrice);
  console.log("cartTotalQuantity", cartTotalQuantity);

  return (
    <>
      <div className="grid grid-cols-5 text-xs md:text-sm gap-4 py-4 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
          <Link href={`/product/${item.id}`}>
            <div className="relative w-[70px] aspect-square">
              <Image
                src={item.selectedImage.image}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <div className="flex flex-col justify-between">
            <Link href={`/product/${item.id}`}>
              <div>{truncateTextForCart(item.name)}</div>
            </Link>
            <div>{item.selectedImage.color}</div>
            <div>
              <button
                className="text-blue-500 underline"
                onClick={() => {
                  handleRemoveProduct(item);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 justify-self-center font-semibold">
          {formatPrice(item.price)}
        </div>
        <div className="col-span-1 justify-self-center">
          <SetQuantity
            cartCounter
            cartProduct={item}
            handleQuantityIncrease={() => {
              handleIncreaseCartQunatity(item);
            }}
            handleQuantityDecrease={() => {
              handleDecreaseCartQuantity(item);
            }}
          />
        </div>
        <div className="col-span-1 justify-self-end font-semibold">
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>
      <hr className="w-full" />
    </>
  );
};

export default ItemContent;
