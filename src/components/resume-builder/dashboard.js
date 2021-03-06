import React, { useState, useContext, useEffect } from "react";
import BuilderProvider, { BuilderContext } from "../../context/BuilderProvider";
import { AuthContext } from "../../context/AuthProvider";
import { Link, Redirect } from "@reach/router";
import {
  Modal,
  Button,
  Tabs,
  Tab,
  Containerer,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import "./builderStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faPlus } from "@fortawesome/free-solid-svg-icons";
import ResumePreview from "./resumePreview";
const Dashboard = () => {
  const [isModalShow, setModalShow] = useState(true);
  const [tabKey, setTabKey] = useState("resume");
  const { authInfo } = useContext(AuthContext);
  const { createNewResume, getResumeData, resumeData } =
    useContext(BuilderContext);
  useEffect(async () => {
    getResumeData();
  }, []);

  const previewHandler = () => {
    <Link to="/builder/edit"></Link>;
  };
  const resumePreviewList = (
    <div className="resume-list-container">
      <Container>
        <Row>
          {resumeData.resumeData.map((element) => {
            return (
              <Col
                key={element.resumeId}
                className="resume-item-col"
                sm="12"
                md="4"
                lg="3"
              >
                <Link
                  className="resume-link"
                  to="/builder/edit"
                  state={{resumeId:element.resumeId}}
                >
                  <ResumePreview singleResumeData={element}/>
                </Link>
              </Col>
            );
          })}
          <Col className="resume-item-col" sm="12" md="4" lg="3">
            <div className="resume-item">
              <FontAwesomeIcon onClick={createNewResume} icon={faPlus} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );

  return (
    <div className="display-dashboard-container">
      <div className="resume-container">
        <h1 className="resume-tab-heading">Documents</h1>
        <Tabs
          activeKey={tabKey}
          onSelect={(key) => setTabKey(key)}
          className="tab-container"
        >
          <Tab eventKey="resume" title="Resumes" className="tab-item">
            {resumePreviewList}
          </Tab>
          <Tab
            eventKey="coverLetter"
            title="Cover Letters"
            className="tab-item"
          >
            Cover Letter Content
          </Tab>
        </Tabs>
      </div>
      <div className="expert-container promo-container">find a expert</div>
      <div className="jobPost-container promo-container">
        post to job searching site
      </div>
      {/* <Link to="/builder/edit" onClick={createNewResume}>create resume</Link>
            
            <div>upload my resume</div> */}
      {/* <Modal
        show={isModalShow}
        onHide={modalHandler}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>Welcome! {authInfo.user.displayName}</h4>
          <p>Customize your own resume</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="display-dashboard-modal-btn" onClick={modalHandler}>
            <Link to="/builder/edit">Create Resume</Link>
          </Button>
          <Button onClick={resumeSnapshotHandler}>resume snapshot</Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default Dashboard;
