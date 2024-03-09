import React, { useState } from 'react';
import { UserCredentials } from '../../types';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext1';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';


const SuperAdminSignin = () => {

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<UserCredentials>({
        email: "",
        password: "",
        role: "SuperAdmin"
    })

    const authContext = useContext(AuthContext)
    if(!authContext) {
        return null
    };

    const {loginUser} = authContext

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails(prevCredentials => ({
            ...prevCredentials,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e: React.FormEvent)  => {
        try {
            e.preventDefault();
            const loginSuccess = await loginUser(userDetails);
            if (loginSuccess) {
                navigate('/superAdmin');
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <Grid container sx={{
        width: "100%",
        height: "screen",
        marginTop: "10%",
        justifyContent: "center"
    }}>
      <Grid item>
        <Paper elevation={3} sx={{
        padding: "20px",
        alignItems: "center",
      }}>
          <Typography variant="h5" gutterBottom sx={{
            paddingLeft: "27%",
          }}>
            Login Super Admin
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              type="email"
              label="Enter Email"
              placeholder="Enter Email"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              name="password"
              type="password"
              label="Enter Password"
              placeholder="Enter Password"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SuperAdminSignin