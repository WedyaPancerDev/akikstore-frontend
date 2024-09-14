import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";

const Staff = (): JSX.Element => {
  return (
    <PageContainer title="Staff - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "Manajemen Staff",
          description:
            "Di sini Anda dapat melihat, menambah, mengedit, dan menghapus data staff.",
        }}
      />
      <Box marginTop="20px"></Box>
    </PageContainer>
  );
};

export default Staff;
