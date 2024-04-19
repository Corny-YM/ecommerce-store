import { Color } from "@/type";
import { storeInstance } from "@/libs";

const getColors = async (storeId: string): Promise<Color[]> => {
  const res = await storeInstance.get(`${storeId}/colors`);
  return res.data;
};

export default getColors;
