"use client";

import {
  CartProductType,
  SelectedImageType,
} from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any;
  handleColorSelect: (value: SelectedImageType) => void;
}
const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
      <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        {product.images.map((item: SelectedImageType) => {
          return (
            <div
              className={`relative w-[80%] aspect-square border-teal-700 ${
                cartProduct.selectedImage.color === item.color
                  ? "border-[1.2px]"
                  : "border-none"
              } rounded`}
              key={item.color}
              onClick={() => handleColorSelect(item)}
            >
              <Image
                src={item.image}
                alt={item.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="relative col-span-5 aspect-square">
        <Image
          src={cartProduct.selectedImage.image}
          alt={cartProduct.name}
          fill
          className="object-contain h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
