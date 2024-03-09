import { Outlet } from "react-router-dom";
import Navbar from "../components/client/Navbar";
import { Box, Container, CssBaseline } from "@mui/material";
import withAuth from "../hoc/withAuth";
import { useContext, useEffect } from "react";
import { setRedirectCallback } from "../utils/AxiosHelper";
import AuthContext from "../context/AuthContext1";

const ClientDashboardLayout = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setRedirectCallback(() => {
      authContext?.logoutUser();
    });

    return () => {
      setRedirectCallback(null);
    };
  }, [authContext]);

  return (
    <Box sx={{ position: "relative" }}>
      <CssBaseline />
      <Navbar />
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          height: {
            md: "auto",
            lg: `calc(100vh - 88px)`,
          },
          overflowY: "auto",
          py: {
            xs: 2,
            md: 3,
          },
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
        component="main"
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default withAuth(ClientDashboardLayout);
