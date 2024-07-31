import React, { useState, useEffect } from "react";
import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BankOutlined,
  IdcardOutlined,
  ProfileOutlined,
  CalendarOutlined,
  TrophyOutlined,
  FlagOutlined,
  ReadOutlined,
  GlobalOutlined,
  SolutionOutlined,
  ArrowRightOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import "./css/previewresume.css";
import axios from "axios";

const { Item } = Form;

const tailLayout = {
  wrapperCol: { offset: 30, span: 50 },
};

export const PreviewResume: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [objective, setObjective] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [description, setDescription] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [qualification, setQualification] = useState("");
  const [university, setUniversity] = useState("");
  const [percentage, setPercentage] = useState("");
  const [skillName, setSkillName] = useState("");
  const [department, setDepartment] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [languagesKnown, setLanguagesKnown] = useState("");
  const [declaration, setDeclaration] = useState("");
  const [place, setPlace] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setFullName(localStorage.getItem("fullName") || "");
    setEmail(localStorage.getItem("email") || "");
    setMobile(localStorage.getItem("mobile") || "");
    setStreet(localStorage.getItem("street") || "");
    setCity(localStorage.getItem("city") || "");
    setState(localStorage.getItem("state") || "");
    setCountry(localStorage.getItem("country") || "");
    setZipcode(localStorage.getItem("zipcode") || "");
    setObjective(localStorage.getItem("objective") || "");
    setCompanyName(localStorage.getItem("companyName") || "");
    setRole(localStorage.getItem("role") || "");
    setFromYear(localStorage.getItem("fromYear") || "");
    setToYear(localStorage.getItem("toYear") || "");
    setDescription(localStorage.getItem("description") || "");
    setInstitutionName(localStorage.getItem("institutionName") || "");
    setPassingYear(localStorage.getItem("passingYear") || "");
    setQualification(localStorage.getItem("qualification") || "");
    setUniversity(localStorage.getItem("university") || "");
    setPercentage(localStorage.getItem("percentage") || "");
    setSkillName(localStorage.getItem("skillName") || "");
    setDepartment(localStorage.getItem("department") || "");
    setFatherName(localStorage.getItem("fatherName") || "");
    setMotherName(localStorage.getItem("motherName") || "");
    setDateOfBirth(localStorage.getItem("dateOfBirth") || "");
    setMaritalStatus(localStorage.getItem("maritalStatus") || "");
    setLanguagesKnown(localStorage.getItem("languagesKnown") || "");
    setDeclaration(localStorage.getItem("declaration") || "");
    setPlace(localStorage.getItem("place") || "");
  }, []);

  const handlePrevious = () => {
    navigate("/declaration");
  };

  const handleNextSection = () => {
    navigate("/download-page");
  };

  const handleSave = async () => {
    try {
      // Save user data
      const userData = {
        uname: fullName,
        email,
        mobile,
        address: [{ street, city, state, country, zipcode }],
      };

      const userResponse = await axios.post(
        "http://localhost:3023/users/createUser",
        userData
      );

      const userId = userResponse.data.userId; // Assuming the response contains userId

      // Save experience data
      const experienceData = {
        userId,
        objective,
        companyName,
        role,
        fromYear,
        toYear,
        description,
      };
      await axios.post("http://localhost:3023/experiences/createExp", experienceData);

      // Save academic data
      const academicData = {
        userId,
        institutionName,
        passingYear,
        qualification,
        university,
        percentage,
      };
      await axios.post("http://localhost:3023/academics/create", academicData);

      // Save skill data
      const skillData = {
        userId,
        skillName,
        department,
      };
      await axios.post("http://localhost:3023/skills/createSkill", skillData);

      // Save personal details
      const personalDetailsData = {
        userId,
        fatherName,
        motherName,
        dateOfBirth,
        maritalStatus,
        languagesKnown,
      };
      await axios.post("http://localhost:3023/personal-details/create", personalDetailsData);

      // Save declaration data
      const declarationData = {
        userId,
        declaration,
        place,
      };
      await axios.post("http://localhost:3023/declarations/create", declarationData);

      message.success("Resume saved successfully");
    } catch (error) {
      message.error("Failed to save resume");
      console.error("There was an error saving the resume!", error);
    }
  };

  return (
    <div className="resume-preview">
      <h1>Preview Resume Details</h1>
      <Form layout="vertical" className="user-id-input">
        <Item label="Full Name">
          <Input
            prefix={<UserOutlined />}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </Item>
        <Item label="Email">
          <Input
            prefix={<MailOutlined />}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Item>
        <Item label="Phone">
          <Input
            prefix={<PhoneOutlined />}
            type="number"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
        </Item>
        <Item label="Street">
          <Input
            prefix={<HomeOutlined />}
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          />
        </Item>
        <Item label="City">
          <Input
            prefix={<GlobalOutlined />}
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </Item>
        <Item label="State">
          <Input
            prefix={<GlobalOutlined />}
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </Item>
        <Item label="Country">
          <Input
            prefix={<FlagOutlined />}
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </Item>
        <Item label="Zipcode">
          <Input
            prefix={<GlobalOutlined />}
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
          />
        </Item>
        <Item label="Objective">
          <Input
            prefix={<ProfileOutlined />}
            value={objective}
            onChange={(event) => setObjective(event.target.value)}
          />
        </Item>
        <Item label="Company Name">
          <Input
            prefix={<BankOutlined />}
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
          />
        </Item>
        <Item label="Role">
          <Input
            prefix={<IdcardOutlined />}
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </Item>
        <Item label="From Year">
          <Input
            prefix={<CalendarOutlined />}
            value={fromYear}
            onChange={(event) => setFromYear(event.target.value)}
          />
        </Item>
        <Item label="To Year">
          <Input
            prefix={<CalendarOutlined />}
            value={toYear}
            onChange={(event) => setToYear(event.target.value)}
          />
        </Item>
        <Item label="Description">
          <Input
            prefix={<SolutionOutlined />}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Item>
        <Item label="Institution Name">
          <Input
            prefix={<ReadOutlined />}
            value={institutionName}
            onChange={(event) => setInstitutionName(event.target.value)}
          />
        </Item>
        <Item label="Passing Year">
          <Input
            prefix={<CalendarOutlined />}
            value={passingYear}
            onChange={(event) => setPassingYear(event.target.value)}
          />
        </Item>
        <Item label="Qualification">
          <Input
            prefix={<TrophyOutlined />}
            value={qualification}
            onChange={(event) => setQualification(event.target.value)}
          />
        </Item>
        <Item label="University">
          <Input
            prefix={<BankOutlined />}
            value={university}
            onChange={(event) => setUniversity(event.target.value)}
          />
        </Item>
        <Item label="Percentage">
          <Input
            prefix={<PercentageOutlined />}
            value={percentage}
            onChange={(event) => setPercentage(event.target.value)}
          />
        </Item>
        <Item label="Skill Name">
          <Input
            prefix={<ProfileOutlined />}
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
          />
        </Item>
        <Item label="Department">
          <Input
            prefix={<IdcardOutlined />}
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          />
        </Item>
        <Item label="Father's Name">
          <Input
            prefix={<UserOutlined />}
            value={fatherName}
            onChange={(event) => setFatherName(event.target.value)}
          />
        </Item>
        <Item label="Mother's Name">
          <Input
            prefix={<UserOutlined />}
            value={motherName}
            onChange={(event) => setMotherName(event.target.value)}
          />
        </Item>
        <Item label="Date of Birth">
          <Input
            prefix={<CalendarOutlined />}
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </Item>
        <Item label="Marital Status">
          <Input
            prefix={<IdcardOutlined />}
            value={maritalStatus}
            onChange={(event) => setMaritalStatus(event.target.value)}
          />
        </Item>
        <Item label="Languages Known">
          <Input
            prefix={<GlobalOutlined />}
            value={languagesKnown}
            onChange={(event) => setLanguagesKnown(event.target.value)}
          />
        </Item>
        <Item label="Declaration">
          <Input
            prefix={<SolutionOutlined />}
            value={declaration}
            onChange={(event) => setDeclaration(event.target.value)}
          />
        </Item>
        <Item label="Place">
          <Input
            prefix={<GlobalOutlined />}
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          />
        </Item>
        <Form.Item {...tailLayout}>
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={handlePrevious}
          >
            Previous Section
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            style={{ margin: "0 8px" }}
          >
            Save
          </Button>
          <Button
            type="default"
            icon={<ArrowRightOutlined />}
            onClick={handleNextSection}
          >
            Next Section
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};