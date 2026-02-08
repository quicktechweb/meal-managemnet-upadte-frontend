import { axiosPublic } from "../../Hooks/useAxiosPublic";

export const getallschedulefunction = async () => {
  const { data } = await axiosPublic("/api/schedule");
  return data;
};

export const addscheduleFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-schedule", payload);
  return data;
};

