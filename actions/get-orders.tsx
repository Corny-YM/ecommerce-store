import { Order } from "@/type";
import { storeInstance } from "@/libs";

const getOrders = async (userId: string): Promise<Order[]> => {
  const res = await storeInstance.get(`users/${userId}/orders`);
  return res.data;
};

export default getOrders;
