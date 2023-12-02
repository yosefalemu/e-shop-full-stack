"use client";

import truncateText from "@/utils/truncate";
import formatPrice from "@/utils/formatPrice";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;
  return (
    <div
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-sm"
      onClick={() => router.push(`/product/${data.id}`)}
    >
      <div className="flex flex-col gap-1 items-center w-full">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            src={data.images[0].image}
            fill
            alt={truncateText(data.name)}
          />
        </div>
        <div className="mt-4 text-sm">{truncateText(data.name)}</div>
        <div>{<Rating value={productRating} readOnly />}</div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
