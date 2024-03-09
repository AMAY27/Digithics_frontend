import React from "react";
import { Box } from "@mui/material";
import "./ProcessPage.css";

const ProcessPage = () => {
  return (
    <Box className="process-container">
      <Box
        sx={{
          fontSize: "3rem",
          color: "white",
          fontWeight: "600",
          marginTop: "3vw",
          textAlign: "center",
          display: { xs: "none", md: "block" },
        }}
      >
        Dark Patterns Detection Workflow
      </Box>
      <Box
        sx={{
          fontSize: "1.2rem",
          color: "rgba(255,255,255,.9)",
          fontWeight: "400",
          marginTop: "1vw",
          marginBottom: "4vw",
          textAlign: "center",
          display: { xs: "none", md: "block" },
        }}
      >
        Let's Get Started
      </Box>
      <Box data-aos="fade-right" className="timeline">
        <Box className="timeline-container left-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Submit Website URL
            </h2>
            <p>
              Website owner can submit website URL for dark pattern detection.
              Also can provide additional URLs as well as additional information
              related to website.
            </p>
          </Box>
        </Box>
      </Box>
      <Box data-aos="fade-left" className="timeline">
        <Box className="timeline-container right-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Dark Patterns Detection
            </h2>
            <p>
              It comprises two steps for detecting dark patterns, the first step involves
              detection using automation, and the second step involves manual detection by experts.
            </p>
          </Box>
        </Box>
      </Box>
      <Box data-aos="fade-right" className="timeline">
        <Box className="timeline-container left-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Feedback From Experts
            </h2>
            <p>
              Website owners will receive feedback from experts which can be useful
              for them to make website dark pattern free.
            </p>
          </Box>
        </Box>
      </Box>
      <Box data-aos="fade-left" className="timeline">
        <Box className="timeline-container right-timeline-container">
          <Box className="pic"></Box>
          <Box className="text-box">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                color: "rgb(255,255,255)",
              }}
            >
              Certification
            </h2>
            <p>
              Certification will be provided to those websites which are free of
              dark patterns. This certifications helps to ensure the authenticity of
              the website.
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProcessPage;
