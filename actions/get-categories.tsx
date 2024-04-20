import { storeInstance } from "@/libs";
import { Category } from "@/type";

const getCategories = async (storeId: string): Promise<Category[]> => {
  const res = await storeInstance.get(`${storeId}/categories`, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data || [];
};

export default getCategories;
