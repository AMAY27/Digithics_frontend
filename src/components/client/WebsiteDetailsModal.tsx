import React, { useEffect, useState } from "react";
import { Website } from "../../types";
import { toast } from "react-toastify";
import { getWebsite } from "../../api";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Celebration as CelebrationIcon,
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import PhaseBadge from "./PhaseBadge";
import CertificateSection from "./CertificateSection";

type WebsiteDetailsModalProps = {
  websiteId?: string;
  open: boolean;
  onClose: () => void;
};

const WebsiteDetailsModal = ({
  websiteId,
  open,
  onClose,
}: WebsiteDetailsModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [website, setWebsite] = useState<Website | null>(null);

  const fetchWebsiteDetails = async (webId: string): Promise<void> => {
    try {
      const response = await getWebsite(webId);
      setWebsite(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    if (open && websiteId) fetchWebsiteDetails(websiteId);

    return () => {
      setWebsite(null);
    };
  }, [open, websiteId]);

  return (
    <Dialog
      open={open}
      fullScreen={isMobile}
      maxWidth="md"
      fullWidth
      aria-labelledby="website-details"
      onClose={onClose}
    >
      <DialogTitle>
        <Typography variant="h5" component="span" color="primary">
          {website === null ? (
            <Skeleton width={210} animation="wave" />
          ) : (
            website.websiteName
          )}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 14,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction="column" gap={2}>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1">Website URL</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body1" color="primary">
                {website === null ? (
                  <Skeleton animation="wave" />
                ) : (
                  <Link to={website.baseUrl} target="_blank">
                    {website?.baseUrl}&nbsp;
                    <OpenInNewIcon sx={{ width: "20px", height: "20px" }} />
                  </Link>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1">Additional URLs</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              {website === null ? (
                <Skeleton variant="rectangular" animation="wave" height={100} />
              ) : website.additionalUrls?.length ? (
                <Stack>
                  {website.additionalUrls.map((url, index) => (
                    <Box display="flex">
                      <Typography
                        variant="body1"
                        component="span"
                        color="primary"
                        noWrap
                      >
                        <Link to={url} target="_blank">
                          {url}
                        </Link>
                      </Typography>
                      <Link to={url} target="_blank">
                        <OpenInNewIcon
                          sx={{ width: "20px", height: "20px" }}
                          color="primary"
                        />
                      </Link>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography variant="body1" component="span" color="gray">
                  No additional URLs
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1">Description</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              {website === null ? (
                <Skeleton animation="wave" />
              ) : website.description ? (
                <Typography variant="body1" component="span">
                  {website.description}
                </Typography>
              ) : (
                <Typography variant="body1" component="span" color="gray">
                  No Description
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle1">Website Status</Typography>
            </Grid>
            <Grid item xs={12} sm={9}>
              {website === null ? (
                <Skeleton animation="wave" />
              ) : (
                <PhaseBadge
                  isCompleted={website.isCompleted}
                  isDarkPatternFree={website.isDarkPatternFree}
                />
              )}
            </Grid>
          </Grid>

          {website?.phase === "Published" && (
            <>
              {website.isCompleted && website.isDarkPatternFree && (
                <CertificateSection {...website} />
              )}

              <Divider sx={{ mt: 2 }} />
              <Typography variant="h6" component="h6" color="primary">
                Website Feedbacks
              </Typography>

              {website === null ? (
                <Skeleton variant="rectangular" animation="wave" height={100} />
              ) : website.expertFeedback ? (
                <Box>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {website.expertFeedback}
                  </Typography>
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Stack
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    color="gray"
                  >
                    <CelebrationIcon sx={{ width: "50px", height: "50px" }} />
                    <Typography variant="body1" component="p">
                      Hurray! No Feedbacks. Seems like your website is pretty
                      perfect and clean off Dark Patterns.
                    </Typography>
                  </Stack>
                </Box>
              )}
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default WebsiteDetailsModal;
