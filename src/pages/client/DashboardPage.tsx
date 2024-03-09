import {
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ErrorOutline as ErrorOutlineIcon,
  Folder as FolderIcon,
  HourglassTop as HourglassTopIcon,
  Menu as MenuIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import WebsiteOnboardingForm from "../../components/client/WebsiteOnboardingForm";
import { getAllWebsites, getClientDashboardKPIData } from "../../api";
import { DashboardKPI, WebsiteResponse } from "../../types";
import { toast } from "react-toastify";
import {
  KpiCard,
  WebsiteDashboardCard,
} from "../../components/client/CustomCards";
import { useNavigate } from "react-router-dom";

const initialKpiData: DashboardKPI = {
  totalWebsites: "",
  websitesCertified: "",
  websitesInProgress: "",
  websitesRejected: "",
};

const DashboardPage = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [kpiData, setKpiData] = useState<DashboardKPI>(initialKpiData);
  const [websiteDataList, setWebsiteDataList] = useState<WebsiteResponse[]>([]);
  const [onboardingForm, setOnboardingForm] = useState<boolean>(false);

  const getWebsiteList = async (): Promise<void> => {
    try {
      const websites = await getAllWebsites();
      setWebsiteDataList(websites);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const getDashboardKPIData = async (): Promise<void> => {
    try {
      const data = await getClientDashboardKPIData();
      setKpiData(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleOnboardingSuccess = (): void => {
    getWebsiteList();
    getDashboardKPIData();
  };

  useEffect(() => {
    getWebsiteList();
    getDashboardKPIData();
  }, []);

  return (
    <>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title={kpiData.totalWebsites}
            subtitle="Total Websites"
            color="primary"
            icon={<MenuIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title={kpiData.websitesInProgress}
            subtitle="Certification In Progress"
            color="secondary"
            icon={<HourglassTopIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title={kpiData.websitesCertified}
            subtitle="Websites Published"
            color="success"
            icon={<VerifiedIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KpiCard
            title={kpiData.websitesRejected}
            subtitle="Websites Rejected"
            color="error"
            icon={<ErrorOutlineIcon />}
          />
        </Grid>
      </Grid>

      <Grid flex={1} container spacing={2}>
        <Grid item xs={12} md={7} order={isMobile ? 2 : 1}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: (theme) => theme.spacing(2),
              color: (theme) => theme.palette.text.secondary,
              background: (theme) => theme.palette.background.paper,
              borderRadius: 2,
              height: "100%",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" component="span" color="primary">
                Recent Websites
              </Typography>
              {websiteDataList.length > 6 && (
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  onClick={() => navigate("/client/websites")}
                >
                  View all
                </Button>
              )}
            </Stack>

            {websiteDataList.length === 0 ? (
              <Stack
                spacing={2}
                color="gray"
                flex={1}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 2 }}
              >
                <FolderIcon
                  sx={{
                    width: {
                      xs: 80,
                      md: 100,
                    },
                    height: {
                      xs: 80,
                      md: 100,
                    },
                  }}
                />
                <Typography variant="h6" textAlign="center">
                  No websites certified yet. Click on button below to certify
                  your first website
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOnboardingForm(true)}
                >
                  Certify your website
                </Button>
              </Stack>
            ) : (
              <Grid container spacing={3} padding={2}>
                {websiteDataList.slice(0, 6).map((website) => (
                  <Grid item xs={12} md={6} key={website.websiteId}>
                    <WebsiteDashboardCard {...website} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} order={isMobile ? 1 : 2} flex={1}>
          <Paper
            elevation={0}
            sx={{
              padding: (theme) => theme.spacing(2),
              color: (theme) => theme.palette.text.secondary,
              background: (theme) => theme.palette.background.paper,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "100%",
            }}
          >
            <Typography variant="h4" color="primary">
              Certify your website
            </Typography>
            <VerifiedIcon
              sx={{ m: 4, width: 100, height: 100 }}
              color="primary"
            />
            <Typography variant="body1" sx={{ mb: 2 }}>
              Ensure the integrity of your website by leveraging the power of
              our AI technology and a team of dedicated experts who specialize
              in detecting dark patterns. With our comprehensive certification
              process, we provide a secure and transparent digital experience
              for your audience.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOnboardingForm(true)}
            >
              Certify your website
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <WebsiteOnboardingForm
        fullScreen={isMobile}
        open={onboardingForm}
        onClose={() => setOnboardingForm(false)}
        onSuccess={handleOnboardingSuccess}
      />
    </>
  );
};

export default DashboardPage;
