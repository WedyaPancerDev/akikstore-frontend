import loadable from "@loadable/component";
import PageContainer from "components/Container/PageContainer";

const Menus = loadable(() => import("components/Customers/Menus"));

const CustomerLanding = (): JSX.Element => {
  return (
    <PageContainer
      title="AKIKSTORE - Jual beli batu akik dan pusaka keramat"
      description="#"
    >
      <Menus />
    </PageContainer>
  );
};

export default CustomerLanding;
