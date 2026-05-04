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

export const individualUserPermissionFunction = async () => {
  const { data } = await axiosSecure.get(
    "/api/individual-user-role-permission",
  );
  return data?.data;
};

//  all wise create meal

export const userAllwiseCreateMealFunction = async (payload) => {
  const { data } = await axiosSecure.post(
    "/api/create-user-meal-allwise",
    payload,
  );
  return data;
};

// all wise routine create meal

export const userAllwiseRoutineCreateMealFunction = async (payload) => {
  const { data } = await axiosSecure.post(
    "/api/create-user-meal-allwise-routine",
    payload,
  );
  return data;
};

// daywise user package meal order

export const userDaywiseCreateMealFunction = async (payload) => {
  const { data } = await axiosSecure.post(
    "/api/create-user-meal-daywise",
    payload,
  );
  return data;
};

//day wise user routine meal order

export const userDaywiseRoutineCreateMealFunction = async (payload) => {
  const { data } = await axiosSecure.post(
    "/api/create-user-routine-meal-daywise",
    payload,
  );
  return data;
};

// all wise package create meal

export const userAllWiseGetMealFunction = async () => {
  const { data } = await axiosSecure.get("/api/allwise-user-meal-list");

  return data?.data;
};

// all wise routine create meal

export const userAllWiseRoutineGetMealFunction = async () => {
  const { data } = await axiosSecure.get("/api/allwise-user-meal-list-routine");

  return data?.data;
};

// day wise get user package meal order list
export const userDayWiseGetMealFunction = async () => {
  const { data } = await axiosSecure.get("/api/daywise-user-meal-list");

  return data?.data;
};

// day wise get user routine meal order list

export const userDayWiseRoutineGetMealFunction = async () => {
  const { data } = await axiosSecure.get("/api/daywise-user-routine-meal-list");

  return data?.data;
};

export const getMealOnOffFunction = async () => {
  const { data } = await axiosSecure.get("/api/meal-on-off-time");
  return data?.data;
};

export const getInstituteMealOnOffFunction = async () => {
  const { data } = await axiosSecure.get("/api/institute-meal-on-off-time");
  return data?.data;
};

export const createInstituteMealOnOffTimeFunction = async (payload) => {
  const { data } = await axiosSecure.post("/api/meal-on-off-time", payload);
  return data;
};

export const getInstituteUserMealOrderListsFunction = async () => {
  const { data } = await axiosSecure.get(
    "/api/allwise-institute-user-meal-order",
  );

  return data?.data;
};

export const addBalanceFunction = async (payload) => {
  const { data } = await axiosSecure.post("/api/add-balance", payload);
  return data;
};

export const globarDayWiseUserMealFunction = async () => {
  const { data } = await axiosPublic.get("/api/global-day-wise-user-meal");
  return data;
};

export const globarAllWiseUserMealFunction = async () => {
  const { data } = await axiosPublic.get("/api/global-all-wise-user-meal");
  return data;
};

export const inventoryProductListsFunction = async () => {
  const { data } = await axiosPublic.get("/api/inventory-product");
  return data?.data;
};

export const inventoryProductAddFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/inventory-product", payload);
  return data;
};

export const sellerListFunction = async () => {
  const { data } = await axiosPublic.get("/api/seller");
  return data?.data;
};

export const sellerCreateFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/seller", payload);
  return data;
};

export const buyerCreateFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/buyer", payload);
  return data;
};

export const buyerListFunction = async () => {
  const { data } = await axiosPublic.get("/api/buyer");
  return data?.data;
};

export const inventoryPurchaseProductsFunction = async (payload) => {
  const { data } = await axiosPublic.post(
    "/api/inventory-purchase-product",
    payload,
  );
  return data;
};

export const inventoryPurchaseProductListFunction = async () => {
  const { data } = await axiosPublic.get("/api/inventory-purchase-product");
  return data?.data;
};

export const inventoryGlobalAmountCreateFunction = async (payload) => {
  const { data } = await axiosPublic.post(
    "/api/inventory-global-amount",
    payload,
  );

  return data;
};

export const getInventoryGlobalAmountFunction = async () => {
  const { data } = await axiosPublic.get("/api/inventory-global-amount");
  return data;
};

export const getInventoryStockFunction = async () => {
  const { data } = await axiosPublic.get("/api/get-inventory-stock");
  return data?.data;
};
