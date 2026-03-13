import { axiosPublic } from "../../Hooks/useAxiosPublic";
import { axiosSecure } from "../../Hooks/useAxiosSecure";

export const approvedInstituteUserFunction = async () => {
  const { data } = await axiosPublic("/api/institute-approved-users");
  return data?.data;
};

export const instituteUserListFunction = async () => {
  const { data } = await axiosSecure("/api/instituteuser-pending-users");
  return data?.users;
};

export const updateInstituteProfileInfoFunction = async ({ id, payload }) => {
  const { data } = await axiosSecure.patch(`/api/instituteuser/${id}`, payload);
  return data;
};

export const instituteUserMealTypeFunction = async () => {
  const { data } = await axiosSecure("/api/user-meal-type-lists");
  return data;
};
