import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

type PageContainerProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const PageContainer = ({
  title,
  description,
  children,
}: PageContainerProps) => (
  <Fragment>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </Fragment>
);

export default PageContainer;
