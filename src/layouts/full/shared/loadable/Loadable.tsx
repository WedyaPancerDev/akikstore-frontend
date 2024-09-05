import { Suspense } from "react";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
