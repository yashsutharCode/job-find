// src/utils/constant.js
const isDevelopment = import.meta.env.MODE === 'development';

// This is the key fix for new devices:
// In production, we use a relative path. The browser will 
// automatically turn "/api/v1" into "https://job-find-8.onrender.com/api/v1"
const BASE_URL = isDevelopment 
    ? "http://localhost:8000/api/v1" 
    : "/api/v1"; 

export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;