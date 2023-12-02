import { Rating } from "@mui/material";
interface ProductDetailsProps {
  singleProduct: any;
}

const HorizontalLine = () => {
  return <hr className="w-[30%] my-2" />;
};
const ProductDetails: React.FC<ProductDetailsProps> = ({ singleProduct }) => {
  const productRating =
    singleProduct.reviews.reduce(
      (acc: number, item: any) => item.rating + acc,
      0
    ) / singleProduct.reviews.length;
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-12
    "
    >
      <div>Image</div>
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
        <div>Color</div>
        <HorizontalLine />
        <div>Quantity</div>
        <HorizontalLine />
        <div>Add to cart</div>
      </div>
    </div>
  );
};

export default ProductDetails;
