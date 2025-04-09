import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadFiles } from '../services/api';

function FileUpload({ onFilesUploaded }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setError(null);
  };
  
  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    setError(null);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  // Trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };
  
  // Handle file upload
  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    
    try {
      // Progress simulation for demo purposes
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // Call API service to upload files
      const response = await uploadFiles(files, (progress) => {
        // Real progress would come from the API
        // setUploadProgress(progress);
      });
      
      clearInterval(interval);
      setUploadProgress(100);
      
      // Notify parent component about successful upload
      onFilesUploaded(files);
      
      // Wait a moment to show 100% progress
      setTimeout(() => {
        navigate('/');
      }, 500);
      
    } catch (err) {
      setError('An error occurred while uploading files. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };
  
  // Remove a file from the list
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Marketing Materials</h1>
      
      {/* Drop zone */}
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer mb-6 ${
          files.length > 0 ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-blue-500'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleBrowseClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
        />
        <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="mt-4 text-lg">Drag and drop files here, or click to browse</p>
        <p className="text-sm text-gray-500 mt-2">Support for PDF, DOCX, JPG, PNG (max 20MB per file)</p>
      </div>
      
      {/* File list */}
      {files.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Selected Files ({files.length})</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-white p-3 rounded shadow-sm">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {/* Upload progress */}
      {uploading && (
        <div className="mb-6">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm font-medium">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
          className={`px-4 py-2 text-white rounded ${
            files.length === 0 || uploading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload and Analyze'}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;