import TransactionDetailModule from "./module/TransactionDetailModule";
import PageContainer from "components/Container/PageContainer";

const TransactionsDetail = () => {
  return (
    <PageContainer
      title="ANTIKSTORE - Riwayat Transaksi Pelanggan"
      description="#"
    >
      <TransactionDetailModule />
    </PageContainer>
  );
};

export default TransactionsDetail;
