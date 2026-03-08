import { useQuery } from "@tanstack/react-query";
import { approvedInstituteUserFunction } from "./user.api";

export const useApprovedInstituteUser = () => {
  return useQuery({
    queryKey: "approved_institute_user",
    queryFn: approvedInstituteUserFunction,
    retry: false,
  });
};
