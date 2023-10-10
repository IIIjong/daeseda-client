//내 정보에서 조회 및 수정이 가능하도록 구현한 컴포넌트
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InfoRow from "../common/InfoRow";
import axios from "axios";
function MyInfo() {
  const [user, setUser] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8088/users/myInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("회원 정보를 불러오는데 실패했습니다.", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <MyInfoLayout>
      <InfoRow label="이름" type="text" id="name" value={user.userName} />
      <InfoRow label="닉네임" type="text" id="nickname" value={user.userNickname} />
      <InfoRow label="휴대폰 번호" type="tel" id="phone" value={user.userPhone} />
      <InfoRow label="이메일 주소" type="email" id="email" value={user.userEmail} />
    </MyInfoLayout>
  );
}

const MyInfoLayout = styled.div`
  padding: 12px;
  border: 1px solid rgb(232, 234, 237);
  border-radius: 4px;
  display: inline-block;
  font-size: 16px;
`;

export default MyInfo;
