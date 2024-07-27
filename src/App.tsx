// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginpage';
import AppLayout from './components/layout';
import { AddUserForm } from './components/adduserform';
import { AddExperienceForm } from './components/experience';
import { AddAcademicsForm } from './components/academics';
import { PersonalDetailsPage } from './components/personaldetails';
import { PreviewResume } from './components/previewresume';
import DownloadPage from './components/downloadresume';
import DeclarationPage from './components/declaration';
import AddSkillsForm from './components/skills';



const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="/user-form" element={<AddUserForm />} />
        <Route path="/experience" element={<AddExperienceForm />} />
        <Route path="/academics" element={<AddAcademicsForm />} />
        <Route path="/skills" element={<AddSkillsForm />} />
        <Route path="/personal-details" element={<PersonalDetailsPage />} />
        <Route path="/declaration" element={<DeclarationPage />} />
        <Route path="/preview-resume" element={<PreviewResume />} />
        <Route path="/download-page" element={<DownloadPage />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
