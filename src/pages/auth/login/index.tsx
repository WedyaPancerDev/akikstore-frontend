import AuthLogin from "./module/AuthLoginModule";
import AuthLayout from "layouts/full/AuthLayout";

const Login = (): JSX.Element => {
  return (
    <AuthLayout title="Masuk ke Akun" description="">
      <AuthLogin />
    </AuthLayout>
  );
};

export default Login;
