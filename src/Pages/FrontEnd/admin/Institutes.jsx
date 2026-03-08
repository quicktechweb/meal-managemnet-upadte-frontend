import React from "react";
import { usePendingInstituteUser } from "../../../api/admin/admin.api";
import PendingInstituteList from "./PendingInstituteList";

const Institutes = () => {
  const { data } = usePendingInstituteUser();

  return (
    <div>
      <PendingInstituteList users={data} />
    </div>
  );
};

export default Institutes;
