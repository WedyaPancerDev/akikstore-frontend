import { BaseSVGProps } from "../types";

const Logo = ({ className, color }: BaseSVGProps) => {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22 42C33.0457 42 42 33.0457 42 22C42 10.9543 33.0457 2 22 2C10.9543 2 2 10.9543 2 22C2 33.0457 10.9543 42 22 42Z"
        stroke={color ?? "#374151"}
        strokeWidth="4"
      />
      <path
        d="M18 22C18 15.636 20.628 13.354 22 13C23.22 13.177 26 15.212 26 22C26 28.788 23.22 31 22 31C20.628 30.823 18 28.364 18 22Z"
        stroke={color ?? "#374151"}
        strokeWidth="4"
      />
      <path
        d="M18.0001 21C16.4461 19.462 11.6181 19.84 10.0001 20C9.51506 21.762 10.3521 25.492 12.2931 27.414C14.7201 29.817 16.6611 31 22.0001 31C23.5001 31 28.1151 30.555 30.6281 27.87C33.1401 25.188 33.3001 21.597 33.0001 20C31.5041 19.84 27.4361 19.467 26.0001 21"
        stroke={color ?? "#374151"}
        strokeWidth="4"
      />
    </svg>
  );
};

export default Logo;
