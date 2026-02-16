import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.countrystatecity.in/v1",
  headers: {
    "X-CSCAPI-KEY": import.meta.env.VITE_COUNTRY_API_KEY,
  },
});
