import "./styles/fonts.css";
import "./styles/reset.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import IndexPage from "./pages/indexPage/index";
import LaundryPage from "./pages/laundryPage";
import OrderListPage from "./pages/orderListPage";
import MyPage from "./pages/myPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/laundry" element={<LaundryPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/orderlist" element={<OrderListPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
