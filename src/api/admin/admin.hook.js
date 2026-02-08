import { axiosPublic } from "../../Hooks/useAxiosPublic";

export const getallschedulefunction = async () => {
  const { data } = await axiosPublic("/api/schedule");
  return data;
};

export const addscheduleFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-schedule", payload);
  return data;
};

export const deleteScheduleFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-schedule/${id}`);
  return data;
};

export const updateScheduleFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/update-schedule/${id}`, payload);
  return data;
};
