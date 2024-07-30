// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginpage';
import AppLayout from './components/layout';
import { AddAcademicsForm } from './components/academics';
import AddSkillsForm from './components/skills';
import AddExperienceForm from './components/experience';
import { ResumePreview } from './components/downloadresume';
import { PreviewResume } from './components/previewresume';
import AddUserForm from './components/adduserform';
import { DeclarationPage } from './components/declrationpage';
import { PersonalDetailsForm } from './components/personaldetailspage';



const App: React.FC = () => (
  <Router>  
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="/user-form" element={<AddUserForm />} />
        <Route path="/experience" element={<AddExperienceForm />} />
        <Route path="/academics" element={<AddAcademicsForm />} />
        <Route path="/skills" element={<AddSkillsForm />} />
        <Route path="/personal-details" element={ <PersonalDetailsForm/>} />
        <Route path="/declaration" element={<DeclarationPage />} />
        <Route path="/preview-resume" element={<PreviewResume />} />
        <Route path="/download-page" element={<ResumePreview />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
