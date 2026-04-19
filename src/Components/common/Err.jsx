import React from "react";

const Err = ({ name, errors }) => {
  return (
    <>
      {errors[name] ? (
        <p className="text-red-400 text-[10px] mt-0.5">
          * {errors[name].message}
        </p>
      ) : null}
    </>
  );
};

export default Err;
