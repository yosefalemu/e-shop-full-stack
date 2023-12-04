"use client";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { Rating } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
  singleProduct: any;
}

const HorizontalLine = () => {
  return <hr className="w-[30%] my-2" />;
};

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImage: SelectedImageType;
  quantity: number;
  price: number;
};
export type SelectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ singleProduct }) => {
  const { handleAddProduct, cartProducts, cartTotalQuantity } = useCart();
  const productRating =
    singleProduct.reviews.reduce(
      (acc: number, item: any) => item.rating + acc,
      0
    ) / singleProduct.reviews.length;

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: singleProduct.id,
    name: singleProduct.name,
    description: singleProduct.description,
    category: singleProduct.category,
    brand: singleProduct.brand,
    selectedImage: { ...singleProduct.images[0] },
    quantity: 1,
    price: singleProduct.price,
  });
  const [isProductInCart, setIsProductInCart] = useState(false);
  const router = useRouter();

  const handleColorSelect = useCallback(
    (value: SelectedImageType) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImage: value };
      });
    },
    [cartProduct.selectedImage]
  );

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: cartProduct.quantity + 1 };
    });
  }, [cartProduct.quantity]);

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => {
      return { ...prev, quantity: cartProduct.quantity - 1 };
    });
  }, [cartProduct.quantity]);

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const productIndex = cartProducts.findIndex(
        (item) => item.id === singleProduct.id
      );
      if (productIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  console.log(cartProducts);
  console.log(cartTotalQuantity);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-12
    "
    >
      <div>
        <ProductImage
          cartProduct={cartProduct}
          product={singleProduct}
          handleColorSelect={handleColorSelect}
        />
      </div>
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">
          {singleProduct.name}
        </h2>
        <HorizontalLine />
        <div className="flex gap-1 items-center">
          <Rating value={productRating} readOnly />
          <div>{singleProduct.reviews.length} reviews</div>
        </div>
        <HorizontalLine />
        <div className="text-justify">{singleProduct.description}</div>
        <HorizontalLine />
        <div>
          <span className="font-semibold mr-2">Category:</span>
          <span>{singleProduct.category}</span>
        </div>
        <div>
          <span className="font-semibold mr-2">Brand:</span>
          <span>{singleProduct.brand}</span>
        </div>
        <div
          className={singleProduct.inStock ? "text-teal-400" : "text-rose-500"}
        >
          {singleProduct.inStock ? "Instock" : "Out of stock"}
        </div>
        <HorizontalLine />
        {isProductInCart ? (
          <>
            <div className="flex items-center gap-1 my-2">
              <FaCircleCheck size={20} className="text-teal-400" />
              <p>Product is added to the cart</p>
            </div>
            <div className="max-w-[300px]">
              <Button
                label="View cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              cartProduct={cartProduct}
              images={singleProduct.images}
              handleColorSelect={handleColorSelect}
            />
            <HorizontalLine />
            <SetQuantity
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />
            <HorizontalLine />
            <div className="w-[300px]">
              <Button
                label="Add to cart"
                onClick={() => handleAddProduct(cartProduct)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
