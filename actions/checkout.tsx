import { storeInstance } from "@/libs";
import { Cart } from "@/type";

interface ICartData {
  quantity: number;
  cartId: string;
}

const updateCart = async (data: ICartData): Promise<Cart> => {
  const res = await storeInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
    productIds: items.map((item) => item.id),
  });
};

export default updateCart;
