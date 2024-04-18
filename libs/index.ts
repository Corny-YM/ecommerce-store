import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APP_API_URL;

export const storeInstance = axios.create({
  baseURL: baseURL,
});
