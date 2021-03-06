import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import "./authStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import defaultProfileImg from "../../images/profile_default_img.png"
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/reactToastify.css"
const Profile = () => {
  const { authInfo, updateEmail, updatePassword, updateUsername, updateProfileImage } =
    useContext(AuthContext);
  const [showPassWord, setShowPassword] = useState({
    type1: "password",
    type2: "password",
  });
  const [userData, setUserData] = useState({
    errorMsg: null,
    successMsg: null,
    userAuthInfo: null,
  });
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const usernameRef = useRef();
  const userLocalPhoto = useRef()
  const changeHandler = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const editSubmitHandler = async (event) => {  
    event.preventDefault();
    const promise = [];
    if (
      emailRef.current.value) {
        emailRef.current.value !== authInfo.user.email?
          promise.push(updateEmail(emailRef.current.value)):
          // setUserData({
          //   ...userData,
          //   errorMsg: "this email has been used, please enter new email address",
          // })
          toast.error("this email has been used, please enter new email address")
    }

    if (passwordRef.current.value && confirmPasswordRef.current.value) {
      passwordRef.current.value === confirmPasswordRef.current.value
        ? promise.push(updatePassword(passwordRef.current.value))
        // : setUserData({
        //     ...userData,
        //     errorMsg: "the password didn't match",
        //   });
        :toast.error("the password didn't match")
    }
    if (usernameRef.current.value) {
      usernameRef.current.value!==authInfo.user.displayName?
      promise.push(updateUsername(usernameRef.current.value)):
      // setUserData({
      //   ...userData,
      //   errorMsg: "this username has been used, please enter different username",
      // });
      toast.error("this username has been used, please enter different username")
    }
  
    if(promise.length!==0){
      Promise.all(promise)
      .then((result) => {
        // setUserData({
        //   ...userData,
        //   successMsg: "successfully edited profile",
        // });
        toast.success("successfully edited profile information")
      })
      .catch((error) =>
        // setUserData({
        //   ...userData,
        //   errorMsg: error.message,
        // })
        toast.error(error.message)
      )
    }
    
  };
  const userPhotoUploadHandler =()=>{
    const photoFile = userLocalPhoto.current.files[0] 
    const photoTypeArray = ["image/jpeg", "image/png"]
    if (photoFile){
      if (!photoTypeArray.includes(photoFile.type)){
        toast.error("please upload image in jpeg or png format")
      } else if (photoFile.size>2097152){
        toast.error("please upload image no bigger than 2MB")
      } else {
        updateProfileImage(photoFile)
        toast.success("profile image updated")
      }
    }  
  }

  let eyeIcon = (
    <FontAwesomeIcon
      className="eye-icon"
      onClick={(event) => {
        event.preventDefault();
        setShowPassword({
          ...showPassWord,
          type1: showPassWord.type1 === "text" ? "password" : "text",
        });
      }}
      icon={showPassWord.type1 === "text" ? faEyeSlash : faEye}
    />
  );

  let eyeIcon2 = (
    <FontAwesomeIcon
      className="eye-icon"
      onClick={(event) => {
        event.preventDefault();
        setShowPassword({
          ...showPassWord,
          type2: showPassWord.type2 === "text" ? "password" : "text",
        });
      }}
      icon={showPassWord.type2 === "text" ? faEyeSlash : faEye}
    />
  );

  return (
    <div className="regForm-container">
      <Form className="profile-form">
        <Container>
          <h3 className="sub-title">Account Settings</h3>
          <Row className="Profile-img-container">
          <img className="profile-img" src={authInfo.photo?authInfo.photo:defaultProfileImg} alt="default user profile avatar"/>
          <Form.Group className="profile-Image-control-container">
            <Form.Label className="profile-image-control-label profile-Image-control">Edit Your Profile Image (Max 2MB)</Form.Label>
            <Form.Control  className="profile-image-control-input profile-Image-control" name="photo" type="file" ref={userLocalPhoto}></Form.Control>
            <Button className="profile-image-control-btn profile-Image-control" onClick={userPhotoUploadHandler}>Upload</Button>
            <ToastContainer position="top-center" autoClose={5000} />
          </Form.Group>
          </Row>
          <Row>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="username-container profile-item"
                controlId="formGroupUsername"
              >
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  onChange={changeHandler}
                  type="text"
                  ref={usernameRef}
                  placeholder={authInfo.user.displayName}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="email-container profile-item"
                controlId="formGroupEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  onChange={changeHandler}
                  type="email"
                  ref={emailRef}
                  placeholder={authInfo.user.email}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="profile-item"
                controlId="formGroupPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  onChange={changeHandler}
                  type={showPassWord.type1}
                  ref={passwordRef}
                  placeholder="Enter New Password"
                ></Form.Control>
                {eyeIcon}
              </Form.Group>
            </Col>
            <Col className="profile-container" sm="12" md="6">
              <Form.Group
                className="profile-item"
                controlId="formGroupConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  onChange={changeHandler}
                  type={showPassWord.type2}
                  ref={confirmPasswordRef}
                  placeholder="Confirm New Password"
                ></Form.Control>
                {eyeIcon2}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="6">
              <div className="profile-btn-container1">
                <Button
                  className="auth-submit-btn profile-submit-btn"
                  onClick={editSubmitHandler}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        {/* <div className="profile-errorMsg">
          {userData.errorMsg ? (
            <Alert variant="danger">{userData.errorMsg}</Alert>
          ) : null}
        </div>
        <div className="profile-successMsg">
          {userData.successMsg ? (
            <Alert variant="success">{userData.successMsg}</Alert>
          ) : null}
        </div> */}
        <ToastContainer position="top-center" autoClose={5000} />
      </Form>
    </div>
  );
};
export default Profile;
