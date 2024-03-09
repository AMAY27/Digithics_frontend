import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Celebration as CelebrationIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PhaseBadge from "../../components/client/PhaseBadge";
import { Website } from "../../types";
import { getWebsite } from "../../api";
import { toast } from "react-toastify";
import CertificateSection from "../../components/client/CertificateSection";
import ExpertFeedbackSection from "../../components/client/ExpertFeedbackSection";

const LinkText = ({ url }: { url: string }) => {
  return (
    <Box display="flex">
      <Typography
        variant="body1"
        component="span"
        color="primary"
        noWrap
        mr={"4px"}
      >
        <Link to={url} target="_blank">
          {url}
        </Link>
      </Typography>
      <Link to={url} target="_blank">
        <OpenInNewIcon sx={{ width: "20px", height: "20px" }} color="primary" />
      </Link>
    </Box>
  );
};

const WebsiteDetailsPage = () => {
  const { id } = useParams();
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
    if (id) fetchWebsiteDetails(id);
  }, [id]);

  return (
    <Container>
      <Paper
        sx={(theme) => ({
          background: theme.palette.background.paper,
          borderRadius: "8px",
        })}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              borderRight: { xs: "none", md: "1px solid #ccc" },
              borderBottom: { xs: "1px solid #ccc", md: "none" },
              padding: (theme) => theme.spacing(2),
            }}
          >
            <Typography variant="h4" mb={2}>
              {website?.websiteName}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              Website URL
            </Typography>
            <Typography variant="body1" mb={2}>
              {website && <LinkText url={website.baseUrl} />}
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">
              Additional URLs
            </Typography>
            {website?.additionalUrls && website.additionalUrls.length ? (
              <Box mb={2}>
                {website.additionalUrls.map((url, index) => (
                  <LinkText key={index} url={url} />
                ))}
              </Box>
            ) : (
              <Typography variant="body1" color="gray" mb={2}>
                No additional URLs
              </Typography>
            )}

            <Typography variant="subtitle1" fontWeight="bold">
              Website Status
            </Typography>
            {website && (
              <PhaseBadge
                isCompleted={website.isCompleted}
                isDarkPatternFree={website.isDarkPatternFree}
                sx={{
                  mb: 2,
                }}
              />
            )}

            <Typography variant="subtitle1" fontWeight="bold">
              Description
            </Typography>
            {website?.description ? (
              <Typography variant="body1">{website.description}</Typography>
            ) : (
              <Typography variant="body1" color="gray">
                No Description
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              padding: (theme) => theme.spacing(2),
            }}
          >
            {website && website.phase === "Published" ? (
              <>
                {website.isDarkPatternFree && (
                  <>
                    <CertificateSection {...website} />
                    <Divider
                      sx={{
                        my: 2,
                      }}
                    />
                  </>
                )}
                <Typography variant="h5" color="primary" mb={2}>
                  Website Feedbacks
                </Typography>
                {website.expertFeedback ? (
                  <ExpertFeedbackSection {...website} />
                ) : (
                  <Box
                    display="flex"
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Stack
                      spacing={2}
                      direction="column"
                      alignItems="center"
                      color="gray"
                    >
                      <CelebrationIcon
                        sx={{ width: "80px", height: "80px" }}
                        color="success"
                      />
                      <Typography
                        variant="subtitle1"
                        component="p"
                        color="green"
                      >
                        Hurray! No Feedbacks. Seems like your website is pretty
                        perfect and clean off Dark Patterns.
                      </Typography>
                    </Stack>
                  </Box>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center m-5 bg-gray-200 p-8 h-80 rounded-md">
                <p className="font-bold text-2xl">
                  Website evaluation in progress !!
                </p>
              </div>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default WebsiteDetailsPage;
