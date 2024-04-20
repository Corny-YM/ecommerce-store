import { Product } from "@/type";
import { storeInstance } from "@/libs";

export interface IProductParams {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (
  storeId: string,
  params: IProductParams
): Promise<Product[]> => {
  const res = await storeInstance.get(`${storeId}/products`, {
    headers: { "Content-Type": "application/json" },
    params: params,
  });

  return res.data || [];
};

export default getProducts;
