import { products } from "@/utils/products";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
import ListRating from "./ListRating";
interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const singleProduct = products.find((item) => item.id === params.productId);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails singleProduct={singleProduct} />
        <div className="flex flex-col mt-20 gap-4">
          <div>Add rating</div>
          <div>
            <ListRating product={singleProduct} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Product;
