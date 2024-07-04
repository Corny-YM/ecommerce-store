import { storeInstance } from "@/libs";
import { Billboard } from "@/type";

export const index = async (storeId: string): Promise<Billboard[]> => {
  const res = await storeInstance.get(`${storeId}/billboards`);
  return res.data || [];
};

const getBillboard = async (
  storeId: string,
  billboardId?: string
): Promise<Billboard> => {
  const res = await storeInstance.get(`${storeId}/billboards/${billboardId}`);
  return res.data || [];
};

export default getBillboard;
