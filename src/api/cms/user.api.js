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

export const instituteUserAdminDataFunction = async (id) => {
  const { data } = await axiosPublic.get(`/api/insituteuser-admin-data/${id}`);
  return data?.data;
};

export const instituteCreateUserMealFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-user-meal", payload);
  return data;
};

export const instituteApprovedUsersFunction = async () => {
  const { data } = await axiosSecure.get("/api/instituteuser-approved-user");
  return data?.users;
};

export const locationFunction = async () => {
  const { data } = await axiosPublic.get("/api/all-location");
  return data?.data;
};

export const getInstituteRoleFunction = async () => {
  const { data } = await axiosSecure.get("/api/roles");
  return data?.data;
};

export const createInstituteRoleFunction = async (payload) => {
  const { data } = await axiosSecure.post("/api/roles", payload);
  return data;
};

export const deleteInstituteRoleFunction = async (roleId) => {
  const { data } = await axiosSecure.delete(`/api/roles/${roleId}`);
  return data;
};

export const getPermissionFunction = async () => {
  const { data } = await axiosSecure.get("/api/permissions");
  return data?.data;
};

export const assignRolePermissionFunction = async (id, payload) => {
  const { data } = await axiosSecure.put(
    `/api/roles/${id}/permissions`,
    payload,
  );
  return data;
};

export const instituteUserRoleChangeFunction = async (payload) => {
  const { data } = await axiosSecure.patch(
    "/api/instituteuser-role-update",
    payload,
  );
  return data;
};

export const instituteUserDeleteFunction = async (payload) => {
  const { data } = await axiosSecure.delete("/api/instituteuser-delete", {
    data: payload,
  });
  return data;
};
