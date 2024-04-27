import { Cart } from "@/type";
import { storeInstance } from "@/libs";

const getCarts = async (): Promise<Cart[]> => {
  const res = await storeInstance.get(`carts`);
  return res.data || [];
};

export default getCarts;
