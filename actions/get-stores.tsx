import { Store } from "@/type";
import { storeInstance } from "@/libs";

const URL = process.env.NEXT_PUBLIC_APP_API_URL;

const getStores = async (): Promise<Store[]> => {
  const res = await storeInstance.get(`${URL}/stores`);

  return res.data || [];
};

export default getStores;
