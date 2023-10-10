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
import SignupInfoPage from "./pages/signupPage/SignupInfoPage";
import SignupSuccessPage from "./pages/signupPage/SignupSuccessPage";
import AddDeliveryAddressPage from "./pages/myPage/AddDeliveryAddressPage";
import EditDeliveryAddressPage from "./pages/myPage/EditDeliveryAddressPage";
import OrderPage from "./pages/laundryPage/OrderPage";
import CscenterPage from "./pages/cscenterPage";
import QuestionWritePage from "./pages/cscenterPage/QuestionWritePage";
import QuestionWriteSuccessPage from "./pages/cscenterPage/QuestionWriteSuccessPage";
import QuestionUpdatePage from "./pages/cscenterPage/QuestionUpdatePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/laundry" element={<LaundryPage />} />
        <Route path="/laundry/order" element={<OrderPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route
          path="/mypage/add-delivery-address"
          element={<AddDeliveryAddressPage />}
        />
        <Route
          path="/mypage/edit-delivery-address/:addressId"
          element={<EditDeliveryAddressPage />}
        />
        <Route path="/orderlist" element={<OrderListPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/info" element={<SignupInfoPage />} />
        <Route path="/signup/success" element={<SignupSuccessPage />} />
        <Route path="/cscenter" element={<CscenterPage />} />
        <Route
          path="/cscenter/question-write"
          element={<QuestionWritePage />}
        />
        <Route
          path="/cscenter/question-write/success"
          element={<QuestionWriteSuccessPage />}
        />
        <Route path="/cscenter/:id" element={<QuestionUpdatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
