import AuthLayout from "layouts/full/AuthLayout";
import AuthRegister from "./module/AuthRegisterModule";

const Login = (): JSX.Element => {
  return (
    <AuthLayout title="Daftar Akun Baru" description="">
      <AuthRegister />
    </AuthLayout>
  );
};

export default Login;
