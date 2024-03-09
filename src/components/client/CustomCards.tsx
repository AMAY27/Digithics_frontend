import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Modal,
  Paper,
  SxProps,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Dangerous as DangerousIcon,
  HourglassTop as PendingIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import { KpiCardProps, WebsiteCardProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const kpiCardPalettes = {
  primary: {
    backgroundColor: "rgb(4, 132, 243)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(0, 100, 200)",
    iconColor: "rgb(1, 108, 210)",
  },
  secondary: {
    backgroundColor: "rgb(94, 53, 177)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(69, 39, 160)",
    iconColor: "rgb(69, 39, 160)",
  },
  success: {
    backgroundColor: "rgb(46, 125, 50)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(76, 175, 80)",
    iconColor: "rgb(27, 94, 32)",
  },
  error: {
    backgroundColor: "rgb(211, 47, 47)",
    color: "rgb(255, 255, 255)",
    borderColor: "rgba(224, 224, 224, 0.596)",
    extraColor: "rgb(229, 115, 115)",
    iconColor: "rgb(183, 28, 28)",
  },
};

export const KpiCard = ({ color, title, subtitle, icon }: KpiCardProps) => {
  const selectedTheme = kpiCardPalettes[color as keyof typeof kpiCardPalettes];

  return (
    <Paper
      sx={{
        padding: "18px",
        transition: (theme) =>
          `box-shadow 300ms ${theme.transitions.easing.easeInOut} 0ms`,
        boxShadow: "none",
        backgroundImage: "none",
        borderRadius: "8px",
        border: "none rgba(224, 224, 224, 0.596)",
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.color,
        overflow: "hidden",
        position: "relative",
        "&::before, &::after": {
          content: '""',
          position: "absolute",
          width: "210px",
          height: "210px",
          background: selectedTheme.extraColor,
          borderRadius: "50%",
          opacity: 0.5,
        },
        "&::before": {
          top: "-125px",
          right: "-15px",
        },
        "&::after": {
          top: "-85px",
          right: "-95px",
        },
      }}
    >
      <Grid container direction="column">
        <Grid item>
          <Avatar
            sx={{ borderRadius: 1, background: selectedTheme.iconColor }}
            variant="square"
            children={icon}
          />
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              margin: "14px 8px 6px 0px",
              lineHeight: "1.334em",
              fontSize: "2.125rem",
              fontWeight: "500",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            sx={{
              lineHeight: "1.334em",
              fontWeight: "500",
            }}
          >
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Website states
// In Progress >> isCompleted: false && phase: InProgress
// Rejected >> isCompleted: true && isDarkPatternFree: false
// Certified >> isCompleted: true && isDarkPatternFree: true
// Published >> isCompleted: true && phase: Published

export const WebsiteDashboardCard = ({
  websiteId,
  websiteName,
  isCompleted,
  isDarkPatternFree,
}: WebsiteCardProps) => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState<boolean>(false);
  // const onClose = () => setOpen(false);

  const getPaperStyles = (theme: Theme) => {
    let paperStyles: SxProps<Theme> = {
      padding: "18px",
      borderRadius: "8px",
      cursor: "pointer",
    };

    if (isCompleted === true && isDarkPatternFree === true) {
      paperStyles.boxShadow = `0px 2px 2px ${theme.palette.success.main}`;
      paperStyles.border = `1px solid ${theme.palette.success.main}`;
    } else if (isCompleted === true && isDarkPatternFree === false) {
      paperStyles.boxShadow = `0px 2px 2px ${theme.palette.error.main}`;
      paperStyles.border = `1px solid ${theme.palette.error.main}`;
    } else {
      paperStyles.boxShadow = `0px 2px 2px ${theme.palette.secondary.main}`;
      paperStyles.border = `1px solid ${theme.palette.secondary.main}`;
    }

    return paperStyles;
  };

  return (
    <>
      {/* <Paper elevation={2} sx={getPaperStyles} onClick={() => setOpen(true)}> */}
      <Paper
        elevation={2}
        sx={getPaperStyles}
        onClick={() => navigate(`/client/website/${websiteId}`)}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tooltip title={websiteName} arrow>
            <Typography noWrap variant="subtitle1">
              {websiteName}
            </Typography>
          </Tooltip>
          {isCompleted === true ? (
            isDarkPatternFree === true ? (
              <Grid item>
                <Tooltip title="Website Certified" arrow>
                  <VerifiedIcon
                    style={{ width: "50px", height: "50px" }}
                    color="success"
                  />
                </Tooltip>
              </Grid>
            ) : (
              <Grid item>
                <Tooltip title="Certification Failed" arrow>
                  <DangerousIcon
                    style={{ width: "50px", height: "50px" }}
                    color="error"
                  />
                </Tooltip>
              </Grid>
            )
          ) : (
            <Grid item>
              <Tooltip title="Website Certification in Progress" arrow>
                <PendingIcon
                  style={{ width: "50px", height: "50px" }}
                  color="secondary"
                />
              </Tooltip>
            </Grid>
          )}
        </Box>
      </Paper>

      {/* <WebsiteDetailsModal
        websiteId={websiteId}
        open={open}
        onClose={onClose}
      /> */}
    </>
  );
};

export const ImageCard = ({ imageUrl }: { imageUrl: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Card onClick={handleOpen}>
        <CardActionArea>
          <CardMedia component="img" image={imageUrl} alt="Paella dish" />
        </CardActionArea>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "100%", md: "70%" },
            height: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrl}
            alt="Feedback Screenshot"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%", // Limit image width to 100% of its container
              maxHeight: "100%",
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};
