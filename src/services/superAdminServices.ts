import axios from 'axios';
import api from '../utils/AxiosHelper';
import { BASE_ML_URL } from '../utils/constatnt';
import { AdminPatterns } from '../types';

export const getClientsDetails = async() => {
    try {
      const response = await api.get(`/website/Client/details`);
      return response.data
    } catch (error) {
        console.error('Error is --', error);
        throw error; 
      }
  }

export const getExpertsDetails = async() => {
  try {
    const response = await api.get('/website/Expert/details');
    return response.data
  } catch (error) {
    console.error('Error is --', error);
    throw error;
  }
}

export const assignExperts = async(id: string, expertIds: string[], primaryExpertId: string) => {
  const body = {
    expertIds: expertIds,
    primaryExpertId: primaryExpertId
  };
  try {
    const response = await api.put(`website/${id}/assignExperts`, body);
    return response.status;
  } catch (error) {
    console.error('Error is --', error);
    throw error;
  }
}

export const runAutomation = async(id: string, webpageUrls: string[]) => {
  const body = {
    websiteUrl: webpageUrls
  };
  
  try {    
    const response = await axios.post(`${BASE_ML_URL}/darkPattern/webpageList`, body);
    return response.data; 
  } catch (error) {
    console.error('Error is --', error);
    throw error;
  }
}

export const sendFilteredPatterns = async(websiteId:string, patternList: AdminPatterns[]) => {
  try {
    const response = await api.put(`/website/${websiteId}/automatedPatterns`, patternList);
    return response.status
  } catch (error) {
    console.error('Error is --', error);
    throw error;
  }
}

export const checkPrimaryExpert = async(websiteId:string) => {
  try {
    const response = await api.get(`/website/${websiteId}`);
    if(response.data.expertDetails.length === 0) {
      return true;
    } else { return false; } 
  } catch (error) {
    console.error('Error is --', error);
    throw error;
  }
}
