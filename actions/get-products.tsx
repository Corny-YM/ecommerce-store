import qs from "query-string";
import { Product } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: { ...query },
  });

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getProducts;
