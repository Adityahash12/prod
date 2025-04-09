// src/services/api.js

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Upload files to the backend for analysis
 * @param {File[]} files - Array of file objects to upload
 * @param {function} onProgress - Callback for upload progress updates
 * @returns {Promise} Promise resolving to the upload result
 */
export const uploadFiles = async (files, onProgress) => {
  const formData = new FormData();
  
  // Append each file to the form data
  files.forEach((file, index) => {
    formData.append(`file-${index}`, file);
  });
  
  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      // Include this if you need to send cookies/auth headers
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload files');
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Fetch analysis results from the backend
 * @param {string} analysisId - ID of the analysis to fetch
 * @returns {Promise} Promise resolving to the analysis results
 */
export const getAnalysisResults = async (analysisId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/${analysisId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch analysis results');
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get the status of an analysis job
 * @param {string} analysisId - ID of the analysis to check
 * @returns {Promise} Promise resolving to the analysis status
 */
export const getAnalysisStatus = async (analysisId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/${analysisId}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch analysis status');
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get marketing insights report
 * @param {string} analysisId - ID of the analysis
 * @returns {Promise} Promise resolving to marketing insights
 */
export const getMarketingInsights = async (analysisId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/${analysisId}/marketing`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch marketing insights');
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get compliance report
 * @param {string} analysisId - ID of the analysis
 * @returns {Promise} Promise resolving to compliance findings
 */
export const getComplianceReport = async (analysisId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analysis/${analysisId}/compliance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch compliance report');
    }
    
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default {
  uploadFiles,
  getAnalysisResults,
  getAnalysisStatus,
  getMarketingInsights,
  getComplianceReport,
};