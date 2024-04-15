import { Store } from "@/type";

const URL = `http://localhost:3000/api/`;

const getStores = async (): Promise<Store[]> => {
  const res = await fetch(`${URL}/stores`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getStores;
