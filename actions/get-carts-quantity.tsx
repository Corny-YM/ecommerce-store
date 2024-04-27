import { storeInstance } from "@/libs";

const getCartsQuantity = async (
  userId: string
): Promise<{ quantity: number }> => {
  const res = await storeInstance.get(`users/${userId}/carts-quantity`);
  return res.data || 0;
};

export default getCartsQuantity;
