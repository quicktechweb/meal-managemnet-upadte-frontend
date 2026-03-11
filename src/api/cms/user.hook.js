import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approvedInstituteUserFunction,
  instituteUserListFunction,
  instituteUserMealTypeFunction,
  updateInstituteProfileInfoFunction,
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

export const useUpdateInstituteProfileInfo = () => {
  return useMutation({
    mutationKey: ["update-institute-info-data"],
    mutationFn: updateInstituteProfileInfoFunction,
    // onSuccess: (data) => {
    //   if (data?.success) {
    //     toast.success(data?.message);
    //   }
    // },
  });
};

export const useInstituteUserMealType = () => {
  return useQuery({
    queryKey: "institute_user_meal_type",
    queryFn: instituteUserMealTypeFunction,
    retry: false,
  });
};
