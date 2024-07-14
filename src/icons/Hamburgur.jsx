import React from "react";

const Hamburgur = ({ontap}) => {
  return <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  fill="none"
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  className="lucide lucide-align-justify"
  viewBox="0 0 24 24"
  onClick={ontap}
>
  <path d="M3 6L21 6"></path>
  <path d="M3 12L21 12"></path>
  <path d="M3 18L21 18"></path>
</svg>
};

export default Hamburgur;
