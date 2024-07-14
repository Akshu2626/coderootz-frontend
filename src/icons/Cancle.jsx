import React from "react";

const Cancle = ({ontap}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="lucide lucide-x"
      viewBox="0 0 24 24"
      onClick={ontap}
    >
      <path d="M18 6L6 18M6 6l12 12"></path>
    </svg>
  );
};

export default Cancle;
