import { axiosPublic } from "../../Hooks/useAxiosPublic";

export const getallschedulefunction = async () => {
  const { data } = await axiosPublic("/api/schedule");
  return data;
};

export const addscheduleFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-schedule", payload);
  return data;
};

export const deleteScheduleFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-schedule/${id}`);
  return data;
};

export const updateScheduleFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/update-schedule/${id}`, payload);
  return data;
};

export const getallutilitiesfunction = async () => {
  const { data } = await axiosPublic("/api/all-utilities");
  return data?.data;
};

export const deleteutilitiesFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-utilities/${id}`);
  return data;
};

export const updateUtilitiesFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(
    `/api/update-utilities/${id}`,
    payload,
  );
  return data;
};

export const getAllKitchenFunction = async () => {
  const { data } = await axiosPublic("/api/all-kitchen");
  return data?.data;
};

export const addutilitiesFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-utilities", payload);
  return data;
};

export const getallfeaturefunction = async () => {
  const { data } = await axiosPublic("/api/all-feature");
  return data?.data;
};

export const deletefeatureFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-feature/${id}`);
  return data;
};

export const getAllServiceFunction = async () => {
  const { data } = await axiosPublic("/api/all-services");
  return data?.data;
};

export const addfeatureFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-feature", payload);
  return data;
};

export const updateFeatureFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/update-feature/${id}`, payload);
  return data;
};

export const getAllNotices = async () => {
  const { data } = await axiosPublic("/api/all-notices");
  return data?.data;
};

export const deleteNoticeFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-notice/${id}`);
  return data;
};

export const addnoticeFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-notice", payload);
  return data;
};

export const updatenoticeFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/notice-update/${id}`, payload);
  return data;
};

export const getAllLiveKitchen = async () => {
  const { data } = await axiosPublic("/api/all-video");
  return data?.data;
};

export const addLiveKitchenVideoFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/upload-video", payload);
  return data;
};

export const deleteKitchenVideoFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-kitchen-video/${id}`);
  return data;
};

export const bannerListFunction = async () => {
  const { data } = await axiosPublic("/api/all-banner");
  return data?.data;
};

export const deletebannerFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-banner/${id}`);
  return data;
};

export const addbannerFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-banner", payload);
  return data;
};

export const updateBannerFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/banner-update/${id}`, payload);
  return data;
};

export const chooseusBannerFunction = async () => {
  const { data } = await axiosPublic("/api/get-choose-image");
  return data?.data;
};

export const addchooseusBannerFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-choose-banner", payload);
  return data;
};

export const chooseusListsFunction = async () => {
  const { data } = await axiosPublic("/api/all-chooseus");
  return data?.data;
};

export const deleteChooseusBannerFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-choose-image/${id}`);
  return data;
};

export const updateChooseusBannerFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(
    `/api/update-choose-banner/${id}`,
    payload,
  );
  return data;
};

export const addChooseusListsFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-chooseus", payload);
  return data;
};

export const deleteChooseusListsFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-chooseus/${id}`);
  return data;
};

export const getAllPageFunction = async () => {
  const { data } = await axiosPublic("/api/all-page");
  return data?.data;
};

export const addPageFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-page", payload);
  return data;
};

export const deletePageFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/single-page/${id}`);
  return data;
};

export const updatePageFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/single-page/${id}`, payload);
  return data;
};

export const singlePageFunction = async (slug) => {
  const { data } = await axiosPublic(`/api/single-page/${slug}`);
  return data?.data;
};

export const getAllAppFunction = async () => {
  const { data } = await axiosPublic("/api/all-app");
  return data?.data;
};

export const addAppDataSectionFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-app", payload);
  return data;
};

export const updateAppDataSectionFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/update-app/${id}`, payload);
  return data;
};

export const deleteAppDataSectionFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/all-app-delete/${id}`);
  return data;
};

export const getAllFaqFunction = async () => {
  const { data } = await axiosPublic("/api/all-faq");
  return data?.data;
};

export const deleteFaqFunction = async (id) => {
  const { data } = await axiosPublic.delete(`/api/delete-faq/${id}`);
  return data;
};

export const AddFaqFunction = async (payload) => {
  const { data } = await axiosPublic.post("/api/create-faq", payload);
  return data;
};

export const UpdateFaqFunction = async ({ id, payload }) => {
  const { data } = await axiosPublic.put(`/api/update-faq/${id}`, payload);
  return data;
};

export const getAllCms = async () => {
  const { data } = await axiosPublic("/api/cms");
  return data?.data;
};

export const getWebsiteSetting = async () => {
  const { data } = await axiosPublic("/api/settings");
  return data?.data;
};

export const createWebsiteSetting = async (payload) => {
  const { data } = await axiosPublic.post("/api/settings", payload);
  return data;
};

export const getItemsFunction = async () => {
  const { data } = await axiosPublic.get("/api/items");
  return data?.data;
};

export const pendingInstituteUserFunction = async () => {
  const { data } = await axiosPublic("/api/institute-pending-users");
  return data?.users;
};

export const approvedInstituteUserFunction = async (payload) => {
  const { data } = await axiosPublic.post(
    "/api/institute-approved-users",
    payload,
  );
  return data;
};

export const allCostFunction = async () => {
  const { data } = await axiosPublic("/api/get-cost");
  return data?.data;
};
