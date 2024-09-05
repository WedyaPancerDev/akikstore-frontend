import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Income = (): JSX.Element => {
  return (
    <PageContainer title="Income - AKIKSTORE" description="#">
      <BannerTag type="income" />
      <Box></Box>
    </PageContainer>
  );
};

export default Income;
