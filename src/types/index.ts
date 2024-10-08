export type BaseSVGProps = {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
};

export type Role = "admin" | "employee" | "customer";

export type ValidateProps = {
  role: string;
  user_id: string;
  status: "signin" | "signout";
  person: number;
  avatar: string;
};

export type ReactSelectValueProps = {
  label: string;
  value: string;
};
