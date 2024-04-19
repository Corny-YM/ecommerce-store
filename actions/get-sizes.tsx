import { storeInstance } from "@/libs";
import { Size } from "@/type";

const getSizes = async (storeId: string): Promise<Size[]> => {
  const res = await storeInstance.get(`${storeId}/sizes`);
  return res.data;
};

export default getSizes;
