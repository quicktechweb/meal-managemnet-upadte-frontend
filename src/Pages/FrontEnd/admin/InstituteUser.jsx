import React from "react";
import { usePendingInstituteUser } from "../../../api/admin/admin.api";
import PendingInstituteUserList from "./PendingInstituteUserList";

const InstituteUser = () => {
  const { data } = usePendingInstituteUser();

  return (
    <div>
      <PendingInstituteUserList users={data} />
    </div>
  );
};

export default InstituteUser;
