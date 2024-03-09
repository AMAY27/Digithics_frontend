import {
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Info as InfoIcon } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getWebsiteFeedbackPatterns } from "../../api";
import { PatternData, Website } from "../../types";
import { ImageCard } from "./CustomCards";

const FeedbackTitle = ({ feedback }: { feedback: string }) => {
  const patternDetails: {
    patternName: string;
    patternUrl: string;
  } = useMemo(() => {
    switch (feedback) {
      case "Scarcity":
        return {
          patternName: "Fake scarcity",
          patternUrl: "https://www.deceptive.design/types/fake-scarcity",
        };
      case "Social Proof":
        return {
          patternName: "Fake social proof",
          patternUrl: "https://www.deceptive.design/types/fake-social-proof",
        };
      case "Urgency":
        return {
          patternName: "Fake urgency",
          patternUrl: "https://www.deceptive.design/types/fake-urgency",
        };
      case "Forced Action":
        return {
          patternName: "Forced action",
          patternUrl: "https://deceptive.design/types/forced-action",
        };
      case "Obstruction":
        return {
          patternName: "Obstruction",
          patternUrl: "https://www.deceptive.design/types/obstruction",
        };
      case "Nagging":
        return {
          patternName: "Nagging",
          patternUrl: "https://www.deceptive.design/types/nagging",
        };
      case "Confirmshaming":
        return {
          patternName: "Confirmshaming",
          patternUrl: "https://www.deceptive.design/types/confirmshaming",
        };
      case "Disguised Ads":
        return {
          patternName: "Disguised ads",
          patternUrl: "https://www.deceptive.design/types/disguised-ads",
        };
      case "Preselection":
        return {
          patternName: "Preselection",
          patternUrl: "https://www.deceptive.design/types/preselection",
        };
      default:
        return {
          patternName: "Fake scarcity",
          patternUrl: "https://www.deceptive.design/types/fake-scarcity",
        };
    }
  }, [feedback]);

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h6" fontWeight="bold">
        {patternDetails.patternName}
      </Typography>
      <Tooltip title={`What is ${patternDetails.patternName}`} arrow>
        <IconButton
          aria-label="feedback-details"
          size="small"
          color="primary"
          href={patternDetails.patternUrl}
          target="_blank"
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

const FeedbackDetail = (props: PatternData) => {
  return (
    <Box
      sx={{
        my: (theme) => theme.spacing(2),
      }}
    >
      <FeedbackTitle feedback={props.patternType} />
      <Typography variant="subtitle1">
        Detected at:{" "}
        <Box display="flex">
          <Typography
            variant="body1"
            component="span"
            color="primary"
            noWrap
            mr={"4px"}
          >
            <Link href={props.detectedUrl} target="_blank">
              {props.detectedUrl}
            </Link>
          </Typography>
        </Box>
      </Typography>
      <Typography variant="body1" fontStyle="italic">
        {props.description}
      </Typography>

      {props.patternImageUrls && props.patternImageUrls.length > 0 && (
        <Box mt={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Feedback Images
          </Typography>
          <Grid container spacing={2}>
            {props.patternImageUrls.map((image, key) => (
              <Grid item key={key} xs={12} sm={6} md={3}>
                <ImageCard imageUrl={image} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

const ExpertFeedbackSection = ({
  websiteId: webId,
  expertFeedback,
  isDarkPatternFree,
}: Website) => {
  const [feedbackList, setFeedbackList] = useState<PatternData[]>([]);

  const fetchFeedbacks = async (webId: string): Promise<void> => {
    try {
      const response = await getWebsiteFeedbackPatterns(webId);
      setFeedbackList(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchFeedbacks(webId);
  }, [webId]);

  return (
    <Stack>
      <Typography variant="h5" fontWeight="bold">
        Overview
      </Typography>
      <Typography
        variant="body1"
        mb={2}
        sx={{
          borderBottom: "2px solid #ccc;",
          paddingBlock: "15px",
        }}
      >
        {expertFeedback}
      </Typography>
      {!isDarkPatternFree &&
        feedbackList.map((item) => {
          return <FeedbackDetail {...item} key={item.id} />;
        })}
    </Stack>
  );
};

export default ExpertFeedbackSection;
