import { Size } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getSizes;
