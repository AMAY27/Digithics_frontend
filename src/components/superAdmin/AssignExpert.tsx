import React, { useEffect, useState } from 'react';
import {AdminExperts, AdminAssignProps } from '../../types';
import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, InputLabel, Link, MenuItem, Select, Switch, Typography} from '@mui/material';
import { assignExperts, getClientsDetails, getExpertsDetails } from '../../services/superAdminServices';
import { useAdminContext } from '../../context/AdminContext';

const AssignExpert: React.FC<AdminAssignProps> = ({handleExpertAssigned, websiteId, websiteName, websiteUrl}) => {

    const [expertIds, setExpertIds] = useState<string[]>([]);
    const [experts, setExperts] = useState([]);
    const [primaryExpertId, setPrimaryExpertId] = useState("");
    const {setClientDetails} = useAdminContext();
    
    useEffect(() => {
        handleAssignToClick();
      }, []);

    const handleSubmit = async() => {
        const updatedExpertIds = [...expertIds, primaryExpertId];
        const resp = await assignExperts(websiteId? websiteId: "", updatedExpertIds, primaryExpertId? primaryExpertId: "");
        if(resp === 200) {
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
          handleExpertAssigned();
          // onClose();
          // window.location.reload();
        }
      };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedUserId = event.target.name;
  
        if (expertIds.includes(selectedUserId)) {
          setExpertIds((prevIds) => prevIds.filter((id) => id !== selectedUserId));
        } else {
          setExpertIds((prevIds) => [...prevIds, selectedUserId]);
        }
      };

    const handleAssignToClick = async () => {
        const resp = await getExpertsDetails();
        if(resp) {
          setExperts(resp)
        }
      };

  return (
    <>
       <DialogTitle sx={{
        display: "flex",
        alignItems: "center",
        fontSize: "20px"
       }}>
            <Typography sx={{ marginRight: "5px" }}>{websiteName}</Typography>
            <Link href={websiteUrl}>{websiteUrl}</Link>
        </DialogTitle>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Primary expert</InputLabel>
            <Select
              id="primaryexpert"
              value={primaryExpertId}
              label="Select primary expert"
              onChange={(e) => setPrimaryExpertId(e.target.value)}
              >
              {experts.map((expert: AdminExperts) => (
                <MenuItem value={expert.userId}>{expert.firstName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        <DialogContent>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  {experts.map((expert: AdminExperts) => (
                      expert.userId !== primaryExpertId ? 
                      <FormControlLabel 
                      control={
                        <Switch onChange={handleChange} value={expert.userId} name={expert.userId}/>
                      }
                      label={expert.firstName}
                      />
                      : null
                  ))}
                </FormGroup>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>Assign</Button>
        </DialogActions>
    </>
  );
}; 

export default AssignExpert