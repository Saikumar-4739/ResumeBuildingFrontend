import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./css/previewresume.css";
import "./css/resume.css";

export const ResumePreview: React.FC = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const resumeContent = document.querySelector(".resume-content") as HTMLElement;
    if (resumeContent) {
      html2canvas(resumeContent, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("resume.pdf");
      });
    }
  };

  const handlePrevious = () => {
    navigate("/preview-resume");
  };

  const getItem = (key: string) => localStorage.getItem(key) || "";

  return (
    <div className="resume-preview">
      <div className="resume-content">
        <h2>{getItem("fullName")}</h2>
        <p>Email: {getItem("email")}</p>
        <p>Mobile Number: {getItem("mobile")}</p>
        <p>Address: {getItem("street")}, {getItem("city")}, {getItem("state")}, {getItem("country")} - {getItem("zipcode")}</p>
        <h3>Objective</h3>
        <p>{getItem("objective")}</p>
        <h3>Experience</h3>
        <p>Company Name: {getItem("companyName")} - {getItem("role")} ({getItem("fromYear")} to {getItem("toYear")})</p>
        <p>{getItem("description")}</p>
        <h3>Education</h3>
        <p>Institution Name: {getItem("institutionName")} ({getItem("passingYear")})</p>
        <p>Qualification: {getItem("qualification")} from {getItem("university")} with {getItem("percentage")}%</p>
        <h3>Skills</h3>
        <p>Skills: {getItem("skillName")} - {getItem("department")}</p>
        <h3>Personal Details</h3>
        <p>Father's Name: {getItem("fatherName")}</p>
        <p>Mother's Name: {getItem("motherName")}</p>
        <p>Date of Birth: {getItem("dateOfBirth")}</p>
        <p>Marital Status: {getItem("maritalStatus")}</p>
        <p>Languages Known: {getItem("languagesKnown")}</p>
        <h3>Declaration</h3>
        <p>Declaration: {getItem("declaration")}</p>
        <p>Place: {getItem("place")}</p>
      </div>

      <div className="button-container">
        <Button type="default" icon={<ArrowLeftOutlined />} onClick={handlePrevious} style={{ marginRight: '10px' }}>
          Previous Section
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload}>
          Download
        </Button>
      </div>
    </div>
  );
};
