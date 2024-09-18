import { Box } from "@mui/material";
import BannerTag from "components/BannerTag";
import PageContainer from "components/Container/PageContainer";
import CategoryModule from "./module/CategoryModule";

const Category = (): JSX.Element => {
  return (
    <PageContainer title="Kategori - AKIKSTORE" description="#">
      <BannerTag
        type="dashboard"
        dataDashboard={{
          title: "List Kategori",
          description:
            "Di sini Anda dapat melihat, menambah, mengedit, dan menghapus data kategori.",
        }}
      />

      <Box marginTop="20px">
        <CategoryModule />
      </Box>
    </PageContainer>
  );
};

export default Category;
