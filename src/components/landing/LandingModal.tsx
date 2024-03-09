import React from 'react'
import { Dialog, DialogTitle, Typography, Box, Button} from '@mui/material'
import {styled} from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import '../../index.css';
import Link from "@mui/material/Link";

interface LandingModalProps {
    isOpen : boolean,
    onClose: () => void,
    percentage: number,
}

const LandingModal:React.FC<LandingModalProps> = ({isOpen, onClose, percentage}) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
    if(!isOpen) return null
  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen={false} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display:"flex",
          fontStyle:"normal",
          justifyContent: "center",
          alignItems:"center"
        }}
      >
        <Typography variant="h5" component="span">
          Pattern Check by <span className="font-CustomFont font-bold text-blue-500">VORT</span>
        </Typography>
      </DialogTitle>
      <Box
        sx={{
          margin:"2rem"
        }}
      >
        <BorderLinearProgress variant='determinate' value={percentage}/>
        <Typography sx={{display: "flex",justifyContent:"center", alignContent:"center", marginTop:"0.5rem"}}>{percentage}% dark pattern free text</Typography>
      </Box>
      <Box sx={{display: "flex",justifyContent:"center", alignContent:"center"}}>
        <Typography sx={{marginInline:"2rem", fontSize:"1.5rem"}}>
          {percentage===100 ? "Congratulations, VORT didn't detect any dark pattern in your website" : `${100-percentage}% of your webpage text contains dark patterns`}
        </Typography>
      </Box>
      <Box sx={{display: "flex",justifyContent:"center", alignContent:"center"}}>
        <Typography sx={{marginInline:"2rem", fontSize:"1.5rem"}}>
          Register with VORT to get in-depth expert evaluation and certification
        </Typography>
      </Box>
      <Box sx={{display: "flex",justifyContent:"center", alignContent:"center", marginBottom:"2rem", marginTop:"1rem"}}>
        <Link href="/signup">
        <Button
          type="submit"
          variant="contained"
        >
          Register
        </Button>
        </Link>
      </Box>
      <p className='flex justify-center pb-3 px-3 text-gray-400 text-sm'>VORT is our AI tool which detects presence of dark patterns in websites. The VORT detections may not be accurate every time.</p>
    </Dialog>
  )
}

export default LandingModal