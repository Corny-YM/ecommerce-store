import { Category } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getCategories;
