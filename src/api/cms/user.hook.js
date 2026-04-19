import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approvedInstituteUserFunction,
  assignRolePermissionFunction,
  createInstituteRoleFunction,
  deleteInstituteRoleFunction,
  getInstituteRoleFunction,
  getPermissionFunction,
  individualUserPermissionFunction,
  instituteApprovedUsersFunction,
  instituteCreateUserMealFunction,
  instituteUserAdminDataFunction,
  instituteUserDeleteFunction,
  instituteUserListFunction,
  instituteUserMealTypeFunction,
  instituteUserRoleChangeFunction,
  locationFunction,
  updateInstituteProfileInfoFunction,
} from "./user.api";
import toast from "react-hot-toast";
import useInstituteAuth from "../../Hooks/useInstituteAuth";
import useLocalStorage from "../../Hooks/useLocalStorage";

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

export const useInstituteUserAdminData = (id) => {
  return useQuery({
    queryKey: ["institute-user-admin-data", id],
    queryFn: () => instituteUserAdminDataFunction(id),
    enabled: !!id,
    retry: false,
  });
};

export const useInstituteUserCreateMeal = (payload) => {
  return useMutation({
    mutationKey: ["create-user-meal"],
    mutationFn: (payload) => instituteCreateUserMealFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useApprovedInstituteUsers = () => {
  return useQuery({
    queryKey: ["approved-user"],
    queryFn: instituteApprovedUsersFunction,
    retry: false,
  });
};

export const useAllLocation = () => {
  return useQuery({
    queryKey: ["location"],
    queryFn: locationFunction,
    retry: false,
  });
};

export const useGetInstituteRole = () => {
  return useQuery({
    queryKey: ["institute-role"],
    queryFn: getInstituteRoleFunction,
    retry: false,
  });
};

export const useCreateInstituteRole = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["create-institute-role"],
    mutationFn: (payload) => createInstituteRoleFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["institute-role"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useDeleteInstituteRole = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-institue-role"],
    mutationFn: (roleId) => deleteInstituteRoleFunction(roleId),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["institute-role"]);
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const usePermissionFunction = () => {
  return useQuery({
    queryKey: ["website-permission"],
    queryFn: getPermissionFunction,
    retry: false,
  });
};

export const useAssignRolePermission = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["update-roles"],
    mutationFn: ({ roleId, payload }) =>
      assignRolePermissionFunction(roleId, payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["individual-user-permission"]);
      }
    },
  });
};

export const useInstituteUserRoleChange = () => {
  return useMutation({
    mutationKey: ["institute-user-role-change"],
    mutationFn: (payload) => instituteUserRoleChangeFunction(payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useInstituteUserDelete = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["institute-user-delete"],
    mutationFn: (payload) => instituteUserDeleteFunction(payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["approved-user"]);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useIndividualUserPermission = () => {
  const [token] = useLocalStorage("token", null);

  return useQuery({
    queryKey: ["individual-user-permission"],
    queryFn: individualUserPermissionFunction,
    retry: false,
    enabled: !!token,
  });
};
