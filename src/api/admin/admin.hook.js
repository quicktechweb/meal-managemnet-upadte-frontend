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
