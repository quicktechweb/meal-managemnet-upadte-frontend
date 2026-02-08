import toast from "react-hot-toast";
import {
  addscheduleFunction,
  deleteScheduleFunction,
  getallschedulefunction,
} from "./admin.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useDeleteSchedule = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-schedule"],
    mutationFn: (id) => deleteScheduleFunction(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["schedule-admin"]);
      }
    },
  });
};
