import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { AuthProvider } from "./utils/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import BlogSinglePage from "./Pages/BlogSinglePage";
import BlogCRUD from "./Pages/BlogCRUD";
import BlogEdit from "./Pages/BlogEdit";
import BlogCreate from "./Pages/BlogCreate";
import EnterOtp from "./Pages/EnterOtp";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/single-view/:blogId/" element={<PrivateRoute><BlogSinglePage/></PrivateRoute>} />
            <Route path="/my-blogs" element={<PrivateRoute><BlogCRUD/></PrivateRoute>} />
            <Route path="/edit-blog/:blogId/" element={<PrivateRoute><BlogEdit/></PrivateRoute>} />
            <Route path="/create-blog" element={<PrivateRoute><BlogCreate/></PrivateRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/otp" element={<EnterOtp />} />
            <Route path='/*' element={<PageNotFound/>} />

          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
