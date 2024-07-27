import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import "./css/Downloadpage.css"
const DownloadPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/preview-resume'); // Change this to your desired route
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Resume Downloaded</h1>
      <p>Your resume has been successfully downloaded.</p>
      <Button type="primary" onClick={handleGoBack}>
        Go Back to Resume Preview
      </Button>
    </div>
  );
};

export default DownloadPage;
