import { storeInstance } from "@/libs";
import { Cart } from "@/type";

interface ICartData {
  userId: string;
  storeId: string;
  productId: string;
  colorId: string;
  sizeId: string;
}

const addCart = async (data: ICartData): Promise<Cart> => {
  const res = await storeInstance.post(`carts`, data);
  return res.data || null;
};

export default addCart;
