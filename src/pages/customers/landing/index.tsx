import loadable from "@loadable/component";
import PageContainer from "components/Container/PageContainer";

const Menus = loadable(() => import("components/Customers/Menus"));

const CustomerLanding = (): JSX.Element => {
  return (
    <PageContainer
      title="ANTIKSTORE - Jual Beli Barang Antik Terpercaya"
      description="#"
    >
      <Menus />
    </PageContainer>
  );
};

export default CustomerLanding;
