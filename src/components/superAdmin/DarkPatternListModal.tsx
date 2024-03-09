import { Dialog, DialogTitle, FormControl, FormGroup, FormControlLabel, Switch, Button, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { AdminDarkPatternListProp, AdminPatterns } from '../../types';
import { sendFilteredPatterns } from '../../services/superAdminServices';
import AssignExpert from './AssignExpert';

const DarkPatternListModal: React.FC<AdminDarkPatternListProp> = ({ websiteId, websiteName, onClose, isOpen, patterns, websiteUrl}) => {
  
  const [darkPatternList, setDarkPatternList] = useState<AdminPatterns[]>([]);
  const [assignExpert, setAssignExpert] = useState(true);
  const expertId = localStorage.getItem("userId");

  const handleChange = (patternType:string, description:string, webpageUrl:string) => {
    // event: React.ChangeEvent<HTMLInputElement>
    const patternObj: AdminPatterns = {
      createdByExpertId: expertId? expertId: "",
      patternType: patternType,
      description: description,
      detectedUrl: webpageUrl,
    }

    setDarkPatternList((prevPatterns) => {
      // Check if the pattern with the same description already exists
      const isPatternExist = prevPatterns.some(
        (pattern) => pattern.description === patternObj.description
      );
  
      if (isPatternExist) {
        // If it exists, remove it
        return prevPatterns.filter(
          (pattern) => pattern.description !== patternObj.description
        );
      } else {
        // If it doesn't exist, add it
        return [...prevPatterns, patternObj];
      }
    });
  };

  const handleExpertSubmitted = () =>{
    if(patterns.length===0){
      onClose();
      window.location.reload();
    }
    else{
      setAssignExpert(false);
    }
  }

  const handleSubmit = async() => { 
    
    try {
      const resp = await sendFilteredPatterns(websiteId, darkPatternList);
      if(resp === 200) {
        // onClose();
        onClose();
        window.location.reload();
      };
    } catch (error) {
      console.error('Error is --', error);
      throw error;
    }
  };

  if(!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle sx={{
          marginLeft: "27%",
        }}>
          {assignExpert ? 'Assign Experts' : 'List of Dark Patterns'} 
        </DialogTitle>
        <DialogContent>
          {assignExpert ? (
            <AssignExpert handleExpertAssigned={handleExpertSubmitted} websiteId={websiteId} websiteName={websiteName} websiteUrl={websiteUrl} />
          ) : (
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  {patterns.map((pattern) => (
                    <>
                    {pattern.text!=='Text' &&
                      <FormControlLabel 
                        key={pattern.text}
                        sx={{
                            borderBottom: '1px solid #ccc',
                        }}
                      control={
                        <Switch onChange={() => handleChange(pattern.patternType, pattern.text, pattern.webpageUrl)} name={pattern.patternType} value={pattern.text}/>
                      }
                      label={ pattern.text+"  :  "+pattern.patternType+" : "+pattern.webpageUrl}
                      />
                    }
                  </> 
                  ))}
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
                </FormGroup>
              </FormControl>
             )}
         </DialogContent>   
        
    </Dialog>
  );
}

export default DarkPatternListModal