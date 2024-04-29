import { storeInstance } from "@/libs";

const checkout = async ({
  userId,
  cartIds,
}: {
  userId: String;
  cartIds: string[];
}): Promise<{ url: string }> => {
  const res = await storeInstance.post(`checkout`, {
    userId,
    cartIds,
  });
  return res.data;
};

export default checkout;
