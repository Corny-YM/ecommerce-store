import { OrderItem } from "@/type";
import { storeInstance } from "@/libs";

const getOrderDetails = async (
  userId: string,
  orderId: string
): Promise<OrderItem[]> => {
  const res = await storeInstance.get(`users/${userId}/orders/${orderId}`);
  return res.data;
};

export default getOrderDetails;
