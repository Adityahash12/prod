import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import MarketingInsights from './components/MarketingInsights';
import ComplianceReport from './components/ComplianceReport';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes, set to true
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  // Handler for when files are successfully uploaded
  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
    setAnalysisStatus('loading');
    
    // Simulate API call and processing time
    setTimeout(() => {
      setAnalysisStatus('success');
      setAnalysisResults({
        marketingInsights: {
          audienceSegments: ['Young Professionals', 'Parents', 'Seniors'],
          topKeywords: ['reliable', 'innovative', 'trustworthy'],
          sentimentScore: 4.2,
          competitorComparison: 'Above average in customer satisfaction metrics'
        },
        complianceFindings: {
          regulatoryIssues: [],
          disclaimerRequirements: ['Add financial risk disclaimer', 'Include privacy policy reference'],
          industryStandards: 'Meets 95% of industry standard requirements',
          improvementSuggestions: ['Add accessibility features', 'Update legal disclosures']
        }
      });
    }, 3000);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {isAuthenticated && <Sidebar />}
        <div className="flex flex-col flex-1 overflow-hidden">
          {isAuthenticated && <Navbar />}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route 
                path="/" 
                element={
                  isAuthenticated ? 
                  <Dashboard 
                    uploadedFiles={uploadedFiles}
                    analysisStatus={analysisStatus}
                    analysisResults={analysisResults}
                  /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/upload" 
                element={
                  isAuthenticated ? 
                  <FileUpload onFilesUploaded={handleFilesUploaded} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/marketing-insights" 
                element={
                  isAuthenticated && analysisResults ? 
                  <MarketingInsights insights={analysisResults.marketingInsights} /> : 
                  <Navigate to="/" />
                } 
              />
              <Route 
                path="/compliance-report" 
                element={
                  isAuthenticated && analysisResults ? 
                  <ComplianceReport findings={analysisResults.complianceFindings} /> : 
                  <Navigate to="/" />
                } 
              />
              {/* Add login route if needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;