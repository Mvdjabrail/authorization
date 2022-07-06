import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./papes/HomePage/HomePage";
import SigninPage from "./papes/SigninPage/SigninPage";
import SignupPage from "./papes/SignupPage/SignupPage";

const App = () => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/Signin" element={<SigninPage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/" element={<Navigate to="/Signin" replace />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  } else {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Signin" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </>
  );
  }
};

export default App;
