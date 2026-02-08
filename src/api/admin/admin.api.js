import toast from "react-hot-toast";
import { addscheduleFunction, getallschedulefunction } from "./admin.hook";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useScheduleAdminData = () => {
  return useQuery({
    queryKey: ["schedule-admin"],
    queryFn: getallschedulefunction,
    retry: false,
  });
};

export const useCreateSchedule = () => {
  return useMutation({
    mutationKey: ["create-schedule"],
    mutationFn: (payload) => addscheduleFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};
