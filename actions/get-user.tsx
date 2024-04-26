import { User } from "@/type";
import { storeInstance } from "@/libs";

export interface IProductParams {
  data: User;
}

const getUser = async (user: User): Promise<User> => {
  const res = await storeInstance.post(`users`, { user });

  return res.data!;
};

export default getUser;
