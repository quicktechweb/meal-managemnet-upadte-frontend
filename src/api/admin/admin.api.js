import toast from "react-hot-toast";
import {
  addfeatureFunction,
  addscheduleFunction,
  addutilitiesFunction,
  deletefeatureFunction,
  deleteScheduleFunction,
  deleteutilitiesFunction,
  getallfeaturefunction,
  getAllKitchenFunction,
  getallschedulefunction,
  getAllServiceFunction,
  getallutilitiesfunction,
  updateScheduleFunction,
  updateUtilitiesFunction,
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

export const useUpdateSchedule = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["update-schedule"],
    mutationFn: updateScheduleFunction,
    onSuccess: (data) => {
      if (data?.success) {
        console.log(data);

        toast.success(data?.message);
        query.invalidateQueries(["schedule-admin"]);
      }
    },
  });
};

export const useUtilitiesService = () => {
  return useQuery({
    queryKey: ["get-all-utilities"],
    queryFn: getallutilitiesfunction,
    retry: false,
  });
};

export const useDeleteUtilities = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-utilities"],
    mutationFn: (id) => deleteutilitiesFunction(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-utilities"]);
      }
    },
  });
};

export const useUpdateUtilities = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["update-utilities"],
    mutationFn: updateUtilitiesFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-utilities"]);
      }
    },
  });
};

export const useAllKitchen = () => {
  return useQuery({
    queryKey: ["all-kitchen"],
    queryFn: getAllKitchenFunction,
    retry: false,
  });
};

export const useCreateUtilites = () => {
  return useMutation({
    mutationKey: ["create-utilities"],
    mutationFn: (payload) => addutilitiesFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useGetFeature = () => {
  return useQuery({
    queryKey: ["get-all-feature"],
    queryFn: getallfeaturefunction,
    retry: false,
  });
};

export const useDeleteFeature = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-feature"],
    mutationFn: (id) => deletefeatureFunction(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-feature"]);
      }
    },
  });
};

export const useAllService = () => {
  return useQuery({
    queryKey: ["all-service"],
    queryFn: getAllServiceFunction,
    retry: false,
  });
};

export const useCreateFeature = () => {
  return useMutation({
    mutationKey: ["create-feature"],
    mutationFn: (payload) => addfeatureFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};
