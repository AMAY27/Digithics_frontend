import { Dialog, DialogTitle } from '@mui/material'
import React from 'react'

const LoadingModal : React.FC<{isOpen: boolean}> = ({isOpen}) => {
    if(!isOpen) return null;
  return (
    <Dialog open={isOpen}>
        <DialogTitle sx={{
         padding: '5px',
         alignItems: 'center',
        }}> Loading...
        </DialogTitle> 
        
    </Dialog>
  )
}

export default LoadingModal