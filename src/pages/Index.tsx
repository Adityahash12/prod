
import React from "react";
import { Navigate } from "react-router-dom";

// Redirect to Dashboard
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
