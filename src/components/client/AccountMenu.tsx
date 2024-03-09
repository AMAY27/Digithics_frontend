import {
  // AccountBox as AccountBoxIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { AccountMenuProps } from "../../types";
import { createAvatarStyle } from "../../utils/DataHelper";
import AuthContext from "../../context/AuthContext1";

const menuPaperStyles = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    minWidth: 220,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const AccountMenu = ({ onProfile, onLogout }: AccountMenuProps) => {
  const authContext = useContext(AuthContext);
  const userName = authContext?.user
    ? `${authContext?.user.firstName} ${authContext?.user.lastName}`
    : "User";

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account Settings" arrow>
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar {...createAvatarStyle(userName)} />
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{ paper: menuPaperStyles }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography variant="body1" sx={{ p: 2, fontWeight: 600 }}>
          Welcome, {userName}
        </Typography>
        <Divider />
        {/* TODO: Open after implementing Profile page */}
        {/* <MenuItem onClick={onProfile}>
          <ListItemIcon>
            <AccountBoxIcon color="secondary" />
          </ListItemIcon>
          Profile
        </MenuItem> */}
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon color="secondary" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
