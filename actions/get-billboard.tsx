import { storeInstance } from "@/libs";
import { Billboard } from "@/type";

const getBillboard = async (
  storeId: string,
  billboardId?: string
): Promise<Billboard> => {
  const res = await storeInstance.get(`${storeId}/billboards/${billboardId}`);
  return res.data || [];
};

export default getBillboard;
