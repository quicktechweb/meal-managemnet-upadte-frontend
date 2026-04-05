import toast from "react-hot-toast";
import {
  addAppDataSectionFunction,
  addbannerFunction,
  addchooseusBannerFunction,
  addChooseusListsFunction,
  AddFaqFunction,
  addfeatureFunction,
  addLiveKitchenVideoFunction,
  addnoticeFunction,
  addPageFunction,
  addscheduleFunction,
  addutilitiesFunction,
  allCostFunction,
  allPackageFunction,
  allServiceTypeFunction,
  approvedInstituteUserFunction,
  bannerListFunction,
  chooseusBannerFunction,
  chooseusListsFunction,
  createItemFunction,
  createPackageFunction,
  createWebsiteSetting,
  deleteAppDataSectionFunction,
  deletebannerFunction,
  deleteChooseusBannerFunction,
  deleteChooseusListsFunction,
  deleteFaqFunction,
  deletefeatureFunction,
  deleteItemFunction,
  deleteKitchenVideoFunction,
  deleteNoticeFunction,
  deletePageFunction,
  deleteScheduleFunction,
  deleteutilitiesFunction,
  getAllAppFunction,
  getAllCms,
  getAllFaqFunction,
  getallfeaturefunction,
  getAllKitchenFunction,
  getAllLiveKitchen,
  getAllNotices,
  getAllPageFunction,
  getallschedulefunction,
  getAllServiceFunction,
  getallutilitiesfunction,
  getItemsFunction,
  getWebsiteSetting,
  pendingInstituteUserFunction,
  singlePageFunction,
  updateAppDataSectionFunction,
  updateBannerFunction,
  updateChooseusBannerFunction,
  UpdateFaqFunction,
  updateFeatureFunction,
  UpdateitemFunction,
  updatenoticeFunction,
  updatePageFunction,
  updateScheduleFunction,
  updateUtilitiesFunction,
} from "./admin.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-utilities"],
    mutationFn: updateUtilitiesFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-utilities"]);
        navigate("/admin/dashboard/service");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
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
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-utilities"],
    mutationFn: (payload) => addutilitiesFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-feature"]);
      navigate("/admin/dashboard/service");
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
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-feature"],
    mutationFn: (payload) => addfeatureFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-feature"]);
      navigate("/admin/dashboard/features");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdateFeature = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-feature"],
    mutationFn: updateFeatureFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-feature"]);
        navigate("/admin/dashboard/features");
      }
    },
  });
};

export const useGetNotices = () => {
  return useQuery({
    queryKey: ["get-all-notice"],
    queryFn: getAllNotices,
    retry: false,
  });
};

export const useDeleteNotice = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-notice"],
    mutationFn: (id) => deleteNoticeFunction(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-notice"]);
      }
    },
  });
};

export const useCreateNotice = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-notice"],
    mutationFn: (payload) => addnoticeFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-notice"]);
      navigate("/admin/dashboard/notices");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdateNotice = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-notice"],
    mutationFn: updatenoticeFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-notice"]);
        navigate("/admin/dashboard/notices");
      }
    },
  });
};

export const useAllLiveKitchenVideo = () => {
  return useQuery({
    queryKey: ["get-all-Video"],
    queryFn: getAllLiveKitchen,
    retry: false,
  });
};

export const useCreateKitchenvideo = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-live-kitchen-video"],
    mutationFn: (payload) => addLiveKitchenVideoFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-Video"]);
      navigate("/admin/dashboard/live-kitchen");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useDeleteKitchenvideo = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-notice"],
    mutationFn: (id) => deleteKitchenVideoFunction(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries("get-all-Video");
      }
    },
  });
};

export const useAllBanner = () => {
  return useQuery({
    queryKey: ["get-all-banner"],
    queryFn: bannerListFunction,
    retry: false,
  });
};

export const useDeletebanner = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: (id) => deletebannerFunction(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries("get-all-banner");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useCreateBanner = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-banner"],
    mutationFn: (payload) => addbannerFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-banner"]);
      navigate("/admin/dashboard/banner");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdateBanner = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-banner"],
    mutationFn: updateBannerFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-all-banner"]);
        navigate("/admin/dashboard/banner");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useChooseusBanner = () => {
  return useQuery({
    queryKey: ["choose-image"],
    queryFn: chooseusBannerFunction,
    retry: false,
  });
};

export const useAddChooseusBanner = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-choose-us-banner"],
    mutationFn: (payload) => addchooseusBannerFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-banner"]);
      navigate("/admin/dashboard/choose-us");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useChooseusLists = () => {
  return useQuery({
    queryKey: ["choose-lists"],
    queryFn: chooseusListsFunction,
    retry: false,
  });
};

export const useDeleteChooseusbanner = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["delete-banner"],
    mutationFn: (id) => deleteChooseusBannerFunction(id),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries("choose-image");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdateChooseusBanner = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-choose-us-banner"],
    mutationFn: updateChooseusBannerFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["choose-image"]);
        navigate("/admin/dashboard/choose-us");
      }
    },
  });
};

export const useAddChooseusLists = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-choose-us-list"],
    mutationFn: (payload) => addChooseusListsFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-choose-lists"]);
      navigate("/admin/dashboard/choose-us");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useDeleteChooseusList = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ["delete-choose-us"],
    mutationFn: (id) => deleteChooseusListsFunction(id),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-all-choose-lists"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useAllPage = () => {
  return useQuery({
    queryKey: ["all-page"],
    queryFn: getAllPageFunction,
    retry: false,
  });
};

export const useAddPage = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-page"],
    mutationFn: (payload) => addPageFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["all-page"]);
      navigate("/admin/dashboard/pages");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useDeletePage = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ["delete-page"],
    mutationFn: (id) => deletePageFunction(id),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["all-pages"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdatePage = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-page"],
    mutationFn: updatePageFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["all-pages"]);
        navigate("/admin/dashboard/pages");
      }
    },
  });
};

export const useSingleDynamicPage = (slug) => {
  return useQuery({
    queryKey: ["single-page", slug],
    retry: false,
    enabled: !!slug,
    queryFn: () => singlePageFunction(slug),
  });
};

export const useAllAppData = () => {
  return useQuery({
    queryKey: ["all-app"],
    queryFn: getAllAppFunction,
    retry: false,
  });
};

export const useCreateAppData = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-app"],
    mutationFn: (payload) => addAppDataSectionFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["all-app"]);
      navigate("/admin/dashboard/app-section");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdateAppData = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-app-data"],
    mutationFn: updateAppDataSectionFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["all-app"]);
        navigate("/admin/dashboard/app-section");
      }
    },
  });
};

export const useDeleteAppSection = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ["delete-app-section"],
    mutationFn: (id) => deleteAppDataSectionFunction(id),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["all-app"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useGetAllFaq = () => {
  return useQuery({
    queryKey: ["all-faq"],
    queryFn: getAllFaqFunction,
    retry: false,
  });
};

export const useDeleteFaq = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ["delete-faq"],
    mutationFn: (id) => deleteFaqFunction(id),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["all-faq"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useCreateFaqData = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["create-faq"],
    mutationFn: (payload) => AddFaqFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["all-faq"]);
      navigate("/admin/dashboard/faq");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdateFaqData = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-faq-data"],
    mutationFn: UpdateFaqFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["all-faq"]);
        navigate("/admin/dashboard/faq");
      }
    },
  });
};

export const useCmsData = () => {
  return useQuery({
    queryKey: ["cms"],
    queryFn: getAllCms,
    retry: false,
  });
};

export const useGetWebsiteData = () => {
  return useQuery({
    queryKey: ["web-setting"],
    queryFn: getWebsiteSetting,
    retry: false,
  });
};

export const useCreateWebsite = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["create-web-setting"],
    mutationFn: (payload) => createWebsiteSetting(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["web-setting"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useGetItems = () => {
  return useQuery({
    queryKey: "get-items",
    queryFn: getItemsFunction,
    retry: false,
  });
};

export const usePendingInstituteUser = () => {
  return useQuery({
    queryKey: "pending_institute_user",
    queryFn: pendingInstituteUserFunction,
    retry: false,
  });
};

export const useApprovedInstitute = () => {
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["approved-institute"],
    mutationFn: (payload) => approvedInstituteUserFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["pending_institute_user"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useAllCost = () => {
  return useQuery({
    queryKey: "all-cost",
    queryFn: allCostFunction,
    retry: false,
  });
};

export const useCreateItem = () => {
  // get - items;
  const query = useQueryClient();
  return useMutation({
    mutationKey: ["add-item"],
    mutationFn: (payload) => createItemFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-items"]);
      navigate("/admin/dashboard/item");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useDeleteItem = () => {
  const query = useQueryClient();

  return useMutation({
    mutationKey: ["delete-item"],
    mutationFn: (id) => deleteItemFunction(id),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-items"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useUpdateItem = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update-item"],
    mutationFn: UpdateitemFunction,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        query.invalidateQueries(["get-items"]);
        navigate("/admin/dashboard/item");
      }
    },
  });
};

export const useServiceType = () => {
  return useQuery({
    queryKey: "all-service-type",
    queryFn: allServiceTypeFunction,
    retry: false,
  });
};

export const useAddPackage = () => {
  const query = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["add-package"],
    mutationFn: (payload) => createPackageFunction(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      query.invalidateQueries(["get-packages"]);
      navigate("/admin/dashboard/packages");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export const useAllPackage = () => {
  return useQuery({
    queryKey: "all-packages",
    queryFn: allPackageFunction,
    retry: false,
  });
};
