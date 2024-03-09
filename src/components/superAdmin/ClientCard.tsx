import { Box, Grid, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import WebsiteCard from "../superAdmin/WebsiteCard";
import { AdminClientsDetails, AdminWebsites } from "../../types";

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

// to display sequence of clients along with websites list of each client
const ClientCard: React.FC<AdminClientsDetails> = ({firstName, lastName, websites}) => {
  return (
    <Box>
      <CustomPaper elevation={3} style={{ minHeight: "8rem" }} sx={{ backgroundColor: '#f0f0f0' }}>
      <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="span">
            {firstName} {lastName}
          </Typography>
        </Box>
      </Stack>
      
      <Grid container spacing={2} style={{ margin: "1rem 0", width: "100%", justifyContent: 'left' }}>
          {websites.map((website: AdminWebsites)   => (
            <Grid item xs={12} md={4} key={website.websiteId}>
              <WebsiteCard
                websiteId={website.websiteId}
                baseUrl={website.baseUrl}
                additionalUrls={website.additionalUrls}
                websiteName={website.websiteName}
                description={website.description}
              />
            </Grid>
          ))}
      </Grid>
    </CustomPaper>
    </Box>
    
  );
};

export default ClientCard;
