import { products } from "@/utils/products";
import ProductDetails from "./ProductDetails";
import Container from "@/app/components/Container";
interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const productId = params.productId;
  const singleProduct = products.find((item) => item.id === productId);
  console.log(singleProduct);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails singleProduct={singleProduct} />
      </Container>
    </div>
  );
};

export default Product;
