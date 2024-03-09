import React from "react";
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavbarPage = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{ backgroundColor: "Transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Link href="/">
              <img
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "7rem",
                  height: "6rem",
                  margin: "2.2vw",
                }}
              />
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { md: "none", xs: "flex" } }}
          >
            <Link href="/">
              <img
                src="/assets/logo.png"
                alt="..."
                style={{
                  width: "3rem",
                  height: "3rem",
                  margin: "2vw",
                }}
              />
            </Link>
          </Typography>
          <Link href="/signup">
            <Button
              sx={{
                marginRight: "3vw",
                fontSize: {
                  xs: "var(--h1-size, 12px)",
                  md: "var(--h1-size, 18px)",
                },
                lineHeight: 1.5,
                fontWeight: "var(--base-text-weight-semibold, 600)",
                padding: { xs: ".5rem", md: ".7wv" },
                borderRadius: { xs: ".5rem", md: ".5rem" },
                border: "0.1rem solid rgb(230, 230, 230)",
                color: "#e1eef3",
                backgroundColor: "transparent",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(to left, rgba(158, 75, 154, 0.859))",
                  border: " solid transparent",
                  color: "#efefef",
                  textTransform: "capitalize",
                },
              }}
              color="inherit"
            >
              Sign up
            </Button>
          </Link>
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              marginRight: "3vw",
              fontSize: {
                xs: "var(--h1-size, 12px)",
                md: "var(--h1-size, 18px)",
              },
              lineHeight: 1.5,
              fontWeight: "var(--base-text-weight-semibold, 600)",
              padding: { xs: ".5rem", md: ".7wv" },
              borderRadius: { xs: ".5rem", md: ".5rem" },
              border: "0.1rem solid rgb(230, 230, 230)",
              color: "#e1eef3",
              backgroundColor: "transparent",
              textTransform: "capitalize",
              "&:hover": {
                backgroundImage:
                  "linear-gradient(to left, rgba(158, 75, 154, 0.859))",
                border: " solid transparent",
                color: "#efefef",
                textTransform: "capitalize",
              },
            }}
            color="inherit"
          >
            Sign in
          </Button>
          <Menu
            sx={{
              mt: "1.8rem",
              "& .MuiMenu-paper": { backgroundColor: "" },
              color: "white",
            }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "purple" }}
              href="/signin"
            >
              <MenuItem onClick={handleClose}>As a Client</MenuItem>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "purple" }}
              href="/expertsignin"
            >
              <MenuItem onClick={handleClose}>As an Expert</MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavbarPage;
