import RecordDataEarn from "../RecordDataEarn/RecordDataEarn";
import ShowEarningData from "../ShowEarningData/ShowEarningData";

const Earn = () => {
  const monitizetion = "pending"; // your status value

  return (
    <div>
      {monitizetion === "approved" ? (
        <ShowEarningData />
      ) : (
        <RecordDataEarn />
      )}
    </div>
  );
};

export default Earn;
