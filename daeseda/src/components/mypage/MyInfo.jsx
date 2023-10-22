import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfoRow from "../common/InfoRow";
import axios from "axios";

function MyInfo() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState("");
  const [initialName, setInitialName] = useState("");
  const [initialNickname, setInitialNickname] = useState("");
  const [initialPhone, setInitialPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
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
          setInitialName(userData.userName);
          setInitialNickname(userData.userNickname);
          setInitialPhone(userData.userPhone);
        })
        .catch((error) => {
          console.error("회원 정보를 불러오는데 실패했습니다.", error);
        });
    }
  }, [token]);

  const handleUpdate = () => {
    if (token) {
      if (name && nickname && phone) {
        axios
          .put(
            `${serverUrl}/users/users/update`,
            {
              userName: name,
              userNickname: nickname,
              userPhone: phone,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
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

  const handleCancel = () => {
    // 취소 버튼을 누를 때 초기 상태로 되돌림
    setName(initialName);
    setNickname(initialNickname);
    setPhone(initialPhone);
    setIsEditing(false);
  };

  return (
    <Main>
      <Title>
        <h3>내 정보</h3>
      </Title>
      <MyInfoLayout>
        {isEditing ? (
          <>
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
            <EditDeleteButton>
              <button onClick={handleUpdate}>저장</button>
            </EditDeleteButton>
            <EditDeleteButton>
              <button onClick={handleCancel}>취소</button>
            </EditDeleteButton>
          </>
        ) : (
          <>
            <InfoRow label="이름" value={user.userName} />
            <InfoRow label="닉네임" value={user.userNickname} />
            <InfoRow label="휴대폰 번호" value={user.userPhone} />
            <InfoRow label="이메일 주소" value={user.userEmail} />
            <EditDeleteButton>
              <button onClick={() => setIsEditing(true)}>수정</button>
            </EditDeleteButton>
          </>
        )}
      </MyInfoLayout>
    </Main>
  );
}
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;
const MyInfoLayout = styled.div`
  padding: 12px;
  border: 1px solid rgb(232, 234, 237);
  border-radius: 4px;
  display: inline-block;
  font-size: 16px;
`;

const EditDeleteButton = styled.button`
  border: 1px solid rgb(232, 234, 237);
  padding: 4px 8px;
  border-radius: 4px;
  margin: 5px;
`;

export default MyInfo;
