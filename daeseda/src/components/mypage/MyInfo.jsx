import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfoRow from "../common/InfoRow";
import axios from "axios";

function MyInfo() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [passward, setPassward] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      axios
        .get(`${serverUrl}/users/myInfo`, {
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

  const handleUpdate = () => {
    if (token) {
      if (name && nickname && phone) {
        axios
        .put(`${serverUrl}/users/update`, {
          userName: name,
          userNickname: nickname,
          userPhone: phone,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            alert("사용자 정보가 업데이트되었습니다.");
            setIsEditing(false);
          } else {
            alert("사용자 정보 업데이트에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("사용자 정보 업데이트 중 에러 발생:", error);
          alert("사용자 정보 업데이트에 실패했습니다.");
        });
      }
    }
  };

  return (
    <MyInfoLayout>
      {isEditing ? (
        <>
        <input type="hidden" name="password" value={user.userPassword} />
          <InfoRow
            label="이름"
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InfoRow
            label="닉네임"
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
          <InfoRow
            label="휴대폰 번호"
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <InfoRow label="이메일 주소" value={user.userEmail} />
          <button onClick={handleUpdate}>저장</button>
        </>
      ) : (
        <>
          <InfoRow label="이름" value={user.userName} />
          <InfoRow label="닉네임" value={user.userNickname} />
          <InfoRow label="휴대폰 번호" value={user.userPhone} />
          <InfoRow label="이메일 주소" value={user.userEmail} />
          <button onClick={() => setIsEditing(true)}>수정</button>
        </>
      )}
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