import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import BillboardDashboard from "@/components/billboard-dashboard";

export const revalidate = 0;

const HomePage = async () => {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillboardDashboard />
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
