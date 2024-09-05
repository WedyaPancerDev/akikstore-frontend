import React from "react";

interface IShinySingleBigProps extends React.SVGProps<SVGSVGElement> {}

const ShinySingleBig = ({
  className,
  ...props
}: IShinySingleBigProps): JSX.Element => {
  return (
    <svg
      {...props}
      width="265"
      height="214"
      viewBox="0 0 265 214"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M63.047 0H154L90.953 214H0L63.047 0Z"
        fill="url(#paint0_linear_439_7927)"
      />
      <path
        d="M174.047 0H265L201.953 214H111L174.047 0Z"
        fill="url(#paint1_linear_439_7927)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_439_7927"
          x1="77"
          y1="0"
          x2="77"
          y2="214"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C75ED" />
          <stop offset="1" stopColor="#4C75ED" stopOpacity="0.23" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_439_7927"
          x1="188"
          y1="0"
          x2="188"
          y2="214"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C75ED" />
          <stop offset="1" stopColor="#4C75ED" stopOpacity="0.23" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ShinySingleBig;
