import React, { useEffect, useState } from 'react';
import { Button, Input, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { generatePdf } from './html2pdf';
import './css/previewresume.css';

export const PreviewResume: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    }
  }, []);

  const fetchUserData = (id: string) => {
    setLoading(true);
    setError(null); // Reset error state

    const storedData = localStorage.getItem(`user_${id}`);
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setUserData(data);
        setError(null); // Reset error state
      } catch (error) {
        console.error('Error parsing user data:', error);
        setError('Error loading resume data.');
      }
    } else {
      setError('No user found for the provided ID.');
    }
    
    setLoading(false);
  };

  const handleFetchData = () => {
    if (userId) {
      fetchUserData(userId);
    } else {
      setError('Please enter a valid User ID.');
    }
  };

  const handleEdit = () => {
    navigate('/user-form');
  };

  const handleDownload = () => {
    const element = document.querySelector('.resume-content') as HTMLElement;
    if (element) {
      generatePdf(element);
      navigate('/download-page');
    }
  };

  const handlePrevious = () => {
    navigate('/personal-details'); 
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="resume-preview">
      <h1>Preview Resume</h1>

      <div className="user-id-input">
        <Input
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handleFetchData}>
          Fetch Resume
        </Button>
      </div>

      {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}

      {userData && (
        <div className="resume-content">
          <h2>Name: {userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Mobile: {userData.mobile}</p>
          <p>Address: {userData.address.street}, {userData.address.city}, {userData.address.state}, {userData.address.country} - {userData.address.zipcode}</p>

          <h3>Experience</h3>
          {userData.experience ? (
            <>
              <p>Objective: {userData.experience.objective}</p>
              <p>Company Name: {userData.experience.companyName}</p>
              <p>Role: {userData.experience.role}</p>
              <p>From Year - To Year: {userData.experience.fromYear} - {userData.experience.toYear}</p>
              <p>Description: {userData.experience.description}</p>
            </>
          ) : (
            <p>No experience data available.</p>
          )}

          <h3>Academics</h3>
          {userData.academic ? (
            <>
              <p>Institution Name: {userData.academic.institutionName}</p>
              <p>Qualification: {userData.academic.qualification}</p>
              <p>Passing Year: {userData.academic.passingYear}</p>
              <p>University: {userData.academic.university}</p>
              <p>Percentage: {userData.academic.percentage}%</p>
            </>
          ) : (
            <p>No academic data available.</p>
          )}

          <h3>Skills</h3>
          {userData.skill ? (
            <>
              <p>Skills: {userData.skill.skillName} - {userData.skill.department}</p>
            </>
          ) : (
            <p>No skills data available.</p>
          )}

          <h3>Personal Details</h3>
          {userData.personalDetails ? (
            <>
              <p>Father's Name: {userData.personalDetails.fatherName}</p>
              <p>Mother's Name: {userData.personalDetails.motherName}</p>
              <p>Date of Birth: {userData.personalDetails.dateOfBirth}</p>
              <p>Marital Status: {userData.personalDetails.maritalStatus}</p>
              <p>Languages Known: {userData.personalDetails.languagesKnown ? userData.personalDetails.languagesKnown.join(', ') : 'N/A'}</p>
            </>
          ) : (
            <p>No personal details available.</p>
          )}

          <h3>Declaration</h3>
          {userData.declaration ? (
            <>
              <p>Date: {userData.declaration.date}</p>
              <p>Place: {userData.declaration.place}</p>
            </>
          ) : (
            <p>No declaration data available.</p>
          )}
        </div>
      )}

      <div className="resume-actions">
        <Button type="default" onClick={handlePrevious} style={{ marginRight: '10px' }}>
          Previous Section
        </Button>
        <Button type="primary" onClick={handleEdit} style={{ marginRight: '10px' }}>
          Edit
        </Button>
        <Button type="default" onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};
