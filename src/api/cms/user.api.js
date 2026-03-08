import { axiosPublic } from "../../Hooks/useAxiosPublic";

export const approvedInstituteUserFunction = async () => {
  const { data } = await axiosPublic("/api/institute-approved-users");
  return data?.data;
};
