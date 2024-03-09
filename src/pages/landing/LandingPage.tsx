import React, { useState } from "react";
import { Box, Dialog, DialogTitle, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./LandingPage.css";
import NavbarPage from "./NavbarPage";
import ServicePage from "./ServicePage";
import ProcessPage from "./ProcessPage";
import Typography from "@mui/material/Typography";
import LandingModal from "../../components/landing/LandingModal";
import { getPatternPercentage } from "../../api";
import LinearProgress from "@mui/material/LinearProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from "./PaymentPage";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "@mui/material/Link";

const LandingPage = () => {
  const [isModalOpen, setIsmodalOpen] = useState<boolean>(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [urlForCheck, setUrlForCheck] = useState<string>("");
  const [percentage, setPercentage] = useState<number>();
  const handleWebsiteSubmitClick = async () => {
    if (urlForCheck === "") {
      toast.error("Please Enter the url", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setIsLoadingOpen(true);
      const data = await getPatternPercentage(urlForCheck);
      if (data.Percentage) {
        setUrlForCheck("");
        setIsLoadingOpen(false);
        setPercentage(data.Percentage);
        setIsmodalOpen(true);
      } else {
        setIsLoadingOpen(false);
        setUrlForCheck("");
        toast.error("Error while running detetction, try again", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  const handleWebsiteSubmitClose = () => {
    setIsmodalOpen(false);
    setUrlForCheck("");
  };

  const handleLoadingClose = () => {
    setIsLoadingOpen(false);
    setUrlForCheck("");
  };

  return (
    <>
      <Box
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          height: { xs: "auto", md: "auto", lg: "auto" },
          width: { xs: "100%", md: "100%", lg: "100%" },
          display: "flex",
          zIndex: "0",
          alignItems: "center",
          flexDirection: "column",
          position: "sticky",
          backgroundImage: `linear-gradient(to left, rgba(2, 24, 77, 0.984), rgba(3, 47, 129, 0.859)),url(${process.env.PUBLIC_URL}/assets/bgimage.svg)`,
        }}
      >
        <LandingModal
          isOpen={isModalOpen}
          onClose={handleWebsiteSubmitClose}
          percentage={percentage ? percentage : 0}
        />
        <Dialog
          open={isLoadingOpen}
          onClose={handleLoadingClose}
          fullScreen={false}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="span">
              Pattern Check by
              <span className="font-CustomFont font-bold text-blue-500">
                {" "}
                VORT
              </span>
            </Typography>
            <Typography>
              This may take few minutes. Don't refresh the page meanwhile.
            </Typography>
          </DialogTitle>
          <Box
            sx={{
              margin: "2rem",
            }}
          >
            <LinearProgress />
          </Box>
        </Dialog>
        <Box
          sx={{
            height: { xs: "100dvh", lg: "100dvh" },
            width: { xs: "100%", lg: "100%" },
          }}
        >
          <NavbarPage />
          <Box>
            <Grid
              container
              spacing={2}
              height={{
                xs: "inherit",
                md: "auto",
              }}
              sx={{
                marginTop: { xs: "2rem", md: "4rem" },
              }}
            >
              <Grid
                item
                md={7}
                xs={12}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  className="main-text"
                  sx={{
                    fontSize: { xs: "1.7rem", md: "3rem" },
                    textAlign: "center",
                    width: { xs: "90%", md: "80%" },
                    marginBottom: { xs: "1rem", md: "0" },
                  }}
                >
                  Get Started with <span className="text-white-500">Vort</span>
                </Box>
                <Box
                  className="main-text1"
                  sx={{
                    fontSize: { xs: ".8rem", md: "1.2rem" },
                    textAlign: "center",
                  }}
                >
                  VORT works as a Dark Patterns detector, specifically designed
                  to identify various types of deceptive online practices. It
                  primarily targets three common dark patterns:{" "}
                  <span>
                    Fake Scarcity, Fake Urgency, and Fake Social Proof.
                  </span>{" "}
                  You can easily check single webpage at a time for these dark
                  patterns by utilizing the "VORT" tool on your website. Conduct
                  a quick and complimentary check to ensure the absence of these
                  deceptive elements.
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  className="input-box"
                  marginTop="3rem"
                >
                  <input
                    type="text"
                    placeholder="Enter Your URL Here......"
                    onChange={(e) => setUrlForCheck(e.target.value)}
                    value={urlForCheck}
                    required
                  />
                  <button
                    className="search-btn"
                    onClick={handleWebsiteSubmitClick}
                  >
                    <SendIcon sx={{ color: "#9fa2a5" }} />
                  </button>
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    backgroundColor: "",
                  }}
                >
                  <img
                    src="/assets/2.png"
                    alt="..."
                    style={{
                      width: "100%",
                      height: "100%",
                      marginLeft: "15rem",
                      backgroundColor: "transparent",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* -------------------------------------------Section2------------------------------------------------- */}
        <Box
          sx={{
            marginTop: { xs: "3vw", md: "8vw" },
            height: { md: "40dvh" },
            width: { md: "100%" },
            display: "grid",
            placeItems: "center",
            fontSize: { xs: "3rem", md: "3rem" },
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <h1
            style={{
              padding: "5px",
              margin: "5px 0px",
              color: "white",
              fontWeight: "600",
            }}
          >
            Our Valuable Customer
          </h1>
          <Box className="_partner_">
            <Box className="_partner-items_">
              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/webwizards_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />

              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/webwizards_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/vps_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/webwizards_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />

              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
              <img
                src="/assets/binarybrenz_logo.png"
                alt="..."
                style={{
                  width: "12%",
                  height: "",
                  margin: "20px",
                }}
              />
              <img
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "6%",
                  height: "",
                  margin: "20px",
                  backgroundColor: "",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box>
          <ProcessPage />
        </Box>
        {/* --------------------------payment-------------------- */}
        <Box
          sx={{
            height: "auto",
            width: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PaymentPage />
        </Box>
        {/* --------------------------Service-------------------- */}
        <Box
          sx={{
            height: "auto",
            width: "90%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ServicePage />
        </Box>
        <Box
          sx={{
            height: { xs: "60rem", md: "auto" },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: "rgba(255,255,255,.1)",
            backdropFilter: "blur(10px)",
            marginTop: { xs: "3rem", md: "auto" },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: { xs: "auto", md: "auto" },
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: "12rem",
                    height: "14rem",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "2px solid transparent",
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Digital_Certificate_VORT.svg)`,
                    backgroundSize: "200px 200px",
                    marginTop: { xs: "3rem", md: "4rem" },
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "white",
                  marginTop: { xs: "3rem", md: "3rem" },
                  fontSize: "1.9rem",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Company Address
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "rgba(256,256,256,.7)",
                    fontSize: "1.2rem",
                    marginTop: 2,
                  }}
                >
                  Chemnitz University of Technology <br></br>Str. der Nationen
                  62, 09111,Chemnitz
                  <br></br>
                  <br></br>
                  <Box>
                    <MailOutlineIcon fontSize="large" className="icon-mail" />{" "}
                    <span
                      style={{
                        borderBottom: ".2rem solid rgba(256,256,256,.7)",
                      }}
                    >
                      vtenet125@gmail.com
                    </span>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "rgba(256,256,256,.7)",
                    fontSize: "1.2rem",
                    marginTop: 2,
                  }}
                ></Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  height: "auto",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "white",
                  fontSize: "1.9rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: { xs: "3rem", md: "3rem" },
                }}
              >
                Support
                <Box
                  sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    color: "#cccc",
                    fontSize: "1.4rem",
                    marginTop: "2rem",
                  }}
                >
                  <Box className="email-container">
                    <Link
                      style={{ color: "#cccc" }}
                      href="https://www.linkedin.com/in/v-tenet/"
                    >
                      <LinkedInIcon
                        fontSize="large"
                        className="icon-linkedin"
                      />
                    </Link>

                    <Link
                      style={{ color: "#cccc" }}
                      href="https://www.instagram.com/vtenet_2023/"
                    >
                      <InstagramIcon
                        fontSize="large"
                        className="icon-instagram"
                      />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <br></br>
          <Box
            sx={{
              color: "rgba(256,256,256,.7)",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            It is a Planspiel Web Engineering project at University of
            Technology Chemnitz.
            <span style={{ borderBottom: ".1rem solid #2B1B42" }}>
              {" "}
              © V-Tenet 2024.
            </span>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
