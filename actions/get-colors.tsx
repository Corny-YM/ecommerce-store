import { Color } from "@/type";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
  const res = await fetch(URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

export default getColors;
