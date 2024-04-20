import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList
            title="Featured Products"
            params={{ isFeatured: true }}
          />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
