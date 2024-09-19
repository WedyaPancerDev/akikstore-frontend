import { Box } from "@mui/material";

import PageContainer from "components/Container/PageContainer";
import ChangePasswordModule from "./module/ChangePasswordModule";

const ChangePassword = (): JSX.Element => {
  return (
    <PageContainer title="AKIKSTORE - Ubah Password" description="#">
      <Box component="div" className="page-container">
        <ChangePasswordModule />
      </Box>
    </PageContainer>
  );
};

export default ChangePassword;
