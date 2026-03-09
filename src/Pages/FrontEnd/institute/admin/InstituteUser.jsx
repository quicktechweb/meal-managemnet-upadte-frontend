import React from "react";
import { useInstituteUserList } from "../../../../api/cms/user.hook";
import PendingInstituteUserList from "./PendingInstituteUserList";

const InstituteUser = () => {
  const { data } = useInstituteUserList();

  console.log(data);

  return (
    <div>
      <PendingInstituteUserList users={data} />
    </div>
  );
};

export default InstituteUser;
