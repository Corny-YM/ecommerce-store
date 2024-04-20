import Container from "@/components/ui/container";
import ProductDetail from "./components/product-detail";

interface Props {
  params: { productId: string };
}

const ProductPage = async ({ params }: Props) => {
  return (
    <div className="bg-white">
      <Container>
        <ProductDetail productId={params.productId} />
      </Container>
    </div>
  );
};

export default ProductPage;
