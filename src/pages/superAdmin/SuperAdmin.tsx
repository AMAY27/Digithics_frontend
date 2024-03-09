import { Box, Grid } from "@mui/material";
import ClientCard from "../../components/superAdmin/ClientCard";
import {getClientsDetails} from "../../services/superAdminServices"
import React, { useContext, useEffect } from "react";
import withSuperAdminAuth from "../../hoc/withSuperAdminAuth";
import { setRedirectCallback } from "../../utils/AxiosHelper";
import AuthContext from "../../context/AuthContext1";
import { useAdminContext } from "../../context/AdminContext";
import Navbar from "../../components/client/Navbar";

const SuperAdmin: React.FC = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
      setRedirectCallback(() => {
        authContext?.logoutUser();
      });
  
      return () => {
        setRedirectCallback(null);
      };
  }, [authContext]);

  const {clientDetails, setClientDetails} = useAdminContext();

  const getClientsDataList = async (): Promise<void> => {
    try {
      const clientsData = await getClientsDetails();
      setClientDetails(clientsData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    getClientsDataList();   
    //  eslint-disable-next-line
  }, []);

    return (
      <Box>
        <Navbar/>
        <Grid container spacing={3} style={{ margin: "1rem 0", width: "100%", justifyContent: 'center' }}>
        {clientDetails.map((client) => (
          <>
          {
              client.websites.length > 0 && (
                <Grid item xs={12} md={10} key={client.userId}>
              <ClientCard
                userId={client.userId}
                firstName={client.firstName}
                lastName={client.lastName}
                websites={client.websites} 
                email={client.email}
                role={client.role} 
                isExpertAssigned={client.isExpertAssigned}/>
                </Grid>
              )
            }
          </>
            ))}
          </Grid>
      </Box>
    );
  };
  
export default withSuperAdminAuth(SuperAdmin);