"use client";

import {
  CartProductType,
  SelectedImageType,
} from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  images: SelectedImageType[];
  cartProduct: CartProductType;
  handleColorSelect: (value: SelectedImageType) => void;
}
const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                key={image.color}
                className={`h-7 w-7 rounded-full border-teal-300 ${
                  cartProduct.selectedImage.color === image.color
                    ? "border-[1.5px]"
                    : "border-none"
                } flex items-center justify-center`}
                onClick={() => handleColorSelect(image)}
              >
                <div
                  className="h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer"
                  style={{ background: image.color }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
