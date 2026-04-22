import React from "react";
import { useAllwiseInstituteUserOrderLists } from "../../api/cms/user.hook";

const ServicePage = () => {
  const { data } = useAllwiseInstituteUserOrderLists();

  console.log(data);

  return <div>ServicePage</div>;
};

export default ServicePage;
