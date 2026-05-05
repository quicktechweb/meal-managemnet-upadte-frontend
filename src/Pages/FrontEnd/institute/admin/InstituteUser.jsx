import React from "react";
import {
  useInstituteUserList,
  useInstituteUserMealType,
} from "../../../../api/cms/user.hook";
import PendingInstituteUserList from "./PendingInstituteUserList";

const InstituteUser = () => {
  const { data } = useInstituteUserList();

  return (
    <div>
      <PendingInstituteUserList users={data} />
    </div>
  );
};

export default InstituteUser;
