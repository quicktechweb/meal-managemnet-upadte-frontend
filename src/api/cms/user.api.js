import { axiosPublic } from "../../Hooks/useAxiosPublic";

export const approvedInstituteUserFunction = async () => {
  const { data } = await axiosPublic("/api/institute-approved-users");
  return data?.data;
};

export const instituteUserListFunction = async () => {
  const { data } = await axiosPublic("/api/instituteuser-pending-users");
  return data?.users;
};
