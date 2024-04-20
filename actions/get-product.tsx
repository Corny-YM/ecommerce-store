import { Product } from "@/type";
import { storeInstance } from "@/libs";

const getProduct = async (
  storeId: string,
  productId: string
): Promise<Product> => {
  const res = await storeInstance.get(`${storeId}/products/${productId}`);
  return res.data;
};

export default getProduct;
