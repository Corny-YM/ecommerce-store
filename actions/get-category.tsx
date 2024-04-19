import { storeInstance } from "@/libs";
import { Category } from "@/type";

const getCategory = async (
  storeId: string,
  categoryId?: string | null
): Promise<Category> => {
  const res = await await storeInstance.get(
    `${storeId}/categories/${categoryId}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return res.data || [];
};

export default getCategory;
