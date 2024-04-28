import { Cart } from "@/type";
import { storeInstance } from "@/libs";

const getCarts = async (userId: string): Promise<Cart[]> => {
  const res = await storeInstance.get(`carts/${userId}`);
  return res.data || [];
};

export default getCarts;
