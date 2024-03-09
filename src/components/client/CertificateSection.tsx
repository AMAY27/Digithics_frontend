import React, { useRef, useState } from "react";
import { BASE_SERVER_URL } from "../../utils/constatnt";
import { Website } from "../../types";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { generateCertification } from "../../api";

const CodeBlock = ({
  title,
  codeText,
}: {
  title: string;
  codeText: string;
}) => {
  const scriptTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (scriptTextareaRef.current) {
      scriptTextareaRef.current.select();
      document.execCommand("copy");
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }
  };

  return (
    <Box
      sx={{
        direction: "ltr",
        position: "relative",
        fontSize: "12px",
        border: "1px solid rgb(229, 234, 242)",
        borderRadius: "12px",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 1,
          backgroundColor: "rgba(243, 246, 249, 0.2)",
        }}
      >
        <Typography variant="body2" component="span" color="primary" ml={1}>
          {title}
        </Typography>
        <Tooltip
          title={copySuccess ? "Copied!" : "Copy Snippet"}
          placement="left"
        >
          <IconButton
            aria-label="copy-certificate"
            size="small"
            onClick={copyToClipboard}
          >
            <CopyIcon sx={{ width: 18, hright: 18 }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <pre
        style={{
          lineHeight: 1.5,
          margin: "auto",
          padding: "16px",
          backgroundColor: "#0F1924",
          color: "#f8f8f2",
          overflowX: "auto",
          borderRadius: "0 0 12px 12px",
        }}
      >
        <code>{codeText}</code>
      </pre>
      <textarea
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        ref={scriptTextareaRef}
        readOnly
        value={codeText}
      />
    </Box>
  );
};

const CertificateSection = ({ websiteId, certificationId }: Website) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<string>(certificationId);

  const certificateDiv = `<div id="vTenetCertificate"></div>`;

  const certificateScript = `<script>
    document.addEventListener("DOMContentLoaded", function () {
      fetch("${BASE_SERVER_URL}/website/1/certificationImageFetch")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((imageUrl) => {
          var img = document.createElement("img");
          img.src = imageUrl;
          img.width = 60;
          img.height = 60;
          
          var div = document.getElementById("vTenetCertificate");
          div.innerHTML = "";
          div.appendChild(img);
        })
        .catch((error) => {
          console.error(
            "There was a problem with the fetch operation:",
            error
          );
        });
    });
  </script>`;

  const generateCertificate = async () => {
    try {
      setLoading(true);

      const response = await generateCertification(websiteId);
      setCertificate(response.certificationId);

      toast.success("Your Certificate has been generated!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack>
      <Box display="flex" justifyContent="center" alignItems="center" pt={5}>
        <img
          src="/assets/vort-certificate.svg"
          alt="VORT certificate"
          height={250}
          width={250}
          style={{
            maxHeight: 250,
            overflow: "hidden",
          }}
        />
      </Box>
      {!certificate && (
        <Stack
          spacing={1}
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Click on the button to generate your certificate
          </Typography>
          <Button
            variant="contained"
            onClick={generateCertificate}
            disabled={loading}
          >
            Generate Certificate
          </Button>
        </Stack>
      )}

      {certificate && (
        <>
          <Stack mt={2} gap={1}>
            <Typography variant="h6" component="h6">
              Follow the steps below to have this certificate in your website
            </Typography>
            <Typography variant="body1" component="p">
              1. Copy the div and put it anywhere in your website's index page
            </Typography>
            <CodeBlock title="index.html" codeText={certificateDiv} />
            <Typography variant="body1" component="p">
              2. Paste the script below in your website to fetch for the
              certificate
            </Typography>
            <CodeBlock title="Your Certificate" codeText={certificateScript} />
            <Typography variant="body1" component="p">
              3. Voila! You can now scream to the world that your website is
              free from Dark patterns.
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CertificateSection;
