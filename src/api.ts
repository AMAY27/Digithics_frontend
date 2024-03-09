import {
  UserCredentials,
  UserRegistrationCredentials,
  WebsiteDetails,
} from "./types";
import api from "./utils/AxiosHelper";
import { extractUserDetails } from "./utils/DataHelper";
import { BASE_ML_URL } from "../src/utils/constatnt";
import axios from "axios";

// Function to Register User
export const registerUser = async (user: UserRegistrationCredentials) => {
  try {
    const response = await api.post("/user/signup", user);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to Log in User
export const loginUser = async (user: UserCredentials) => {
  try {
    const response = await api.post(`/user/signin`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to get the KPI data for client's dashboard
export const getClientDashboardKPIData = async () => {
  try {
    const user = extractUserDetails();

    const response = await api.get(`/website/clientKpi/${user?.sub}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get user details
export const getUserDetails = async () => {
  try {
    const user = extractUserDetails();

    const response = await api.get(`/user/${user?.sub}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get the user websites
export const getAllWebsites = async () => {
  try {
    const user = extractUserDetails();

    const response = await api.get(`/website?userId=${user?.sub}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get Website details through website Id
export const getWebsite = async (websiteId: string) => {
  try {
    const response = await api.get(`/website/${websiteId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get Dark pattern feedbacks for the rejected websites
export const getWebsiteFeedbackPatterns = async (websiteId: string) => {
  try {
    const response = await api.get(`/website/${websiteId}/pattern`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a website for certification
export const addWebsiteForCertification = async (website: WebsiteDetails) => {
  try {
    const user = extractUserDetails();
    const data = { ...website, userId: user?.sub };

    const response = await api.post(`/website`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to generate website certificate
export const generateCertification = async (websiteId: string) => {
  try {
    const response = await api.get(
      `/website/${websiteId}/generateCertification`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPatternPercentage = async (websiteUrl: string) => {
  try {
    const response = await axios.get(
      `${BASE_ML_URL}/darkPattern/freeCheck?url=${websiteUrl}`
    );
    return response.data;
  } catch (error) {
    console.error("Error is --", error);
    throw error;
  }
};
