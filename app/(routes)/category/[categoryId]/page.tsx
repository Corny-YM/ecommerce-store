import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import ProductList from "./components/product-list";
import FilterOptions from "./components/fitler-options";

interface Props {
  params: { categoryId: string };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  return (
    <div className="bg-white">
      <Container>
        <Billboard categoryId={params.categoryId} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <FilterOptions />
            <ProductList
              params={{
                categoryId: params.categoryId,
                colorId: searchParams.colorId,
                sizeId: searchParams.sizeId,
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
