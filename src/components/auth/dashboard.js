import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Tab, Nav, Row, Col} from "react-bootstrap";
import Profile from "./profile";
const Dashboard = () => {
  const {authInfo } = useContext(AuthContext);
  // const logoutHandler = () => {
  //   signOutHandler();
  //   navigate("/auth/login");
  // };
  console.log("authInfo in dashboard", authInfo.user);
  return (
    <div className="dashboard-content">
      <Tab.Container defaultActiveKey="first" defaultActiveKey="profile">
        <Row>
          <Col sm="12" md="4">
            <div className="greeting-txt-container">
              <div className="greeting-txt1">Welcome back</div>{" "}
              <div className="greeting-txt2">{authInfo.user.displayName}</div>
            </div>
            <Nav variant="pills" className="tab-left-nav" >
              <Nav.Item className="tab-left-nav-item">
                <Nav.Link className="tab-left-nav-itemlink" eventKey="profile">
                  My Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="tab-left-nav-item">
                <Nav.Link className="tab-left-nav-itemlink" eventKey="files">
                  Saved Files
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm="12" md="8">
            <Tab.Content>
              <Tab.Pane eventKey="profile">
                <Profile />
              </Tab.Pane>
              <Tab.Pane eventKey="files">Saved file</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      
      {/* <Button onClick={logoutHandler}>Log out</Button> */}
    </div>
  );
};

export default Dashboard;

