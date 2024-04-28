import { storeInstance } from "@/libs";
import { Cart } from "@/type";

interface ICartData {
  quantity: number;
  cartId: string;
}

const updateCart = async (data: ICartData): Promise<Cart> => {
  const res = await storeInstance.patch(`carts`, data);
  return res.data || null;
};

export default updateCart;
