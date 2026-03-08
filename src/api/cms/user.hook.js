import { useQuery } from "@tanstack/react-query";
import {
  approvedInstituteUserFunction,
  instituteUserListFunction,
} from "./user.api";

export const useApprovedInstituteUser = () => {
  return useQuery({
    queryKey: "approved_institute_user",
    queryFn: approvedInstituteUserFunction,
    retry: false,
  });
};

export const useInstituteUserList = () => {
  return useQuery({
    queryKey: "institute_user_list",
    queryFn: instituteUserListFunction,
    retry: false,
  });
};
