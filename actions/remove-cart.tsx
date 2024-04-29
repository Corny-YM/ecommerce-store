import { storeInstance } from "@/libs";

const deleteCart = async ({
  userId,
  cartId,
}: {
  userId: string;
  cartId: string;
}): Promise<void> => {
  const res = await storeInstance.delete(`carts/${userId}`, {
    data: { cartId },
  });
  return res.data;
};

export default deleteCart;
