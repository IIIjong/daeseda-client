import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Check from "../common/Check";
import { useNavigate } from "react-router-dom";
import WarningMessage from "../common/WarningMessage";
import axios from "axios";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Title = styled.div`
  border-bottom: solid 1px rgb(232, 234, 237);
  padding: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;
const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

const Agree = styled.div`
  border: 1px solid gray;
  margin-bottom: 10px;
  padding: 10px;
`;
const CheckWrap = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;



const Withdraw = () => {
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

  //이용약관을 동의했는지 state값으로 유지
  const [firstTerms, setFirstTerms] = useState(false);
  const [firstTermsValidation, setFirstTermsValidation] = useState(true);

  const navigate = useNavigate();
  function nextButton() {
    if (firstTerms) {
      setFirstTermsValidation(true);
      deleteUser(); // firstTerms가 true일 때 deleteUser 함수 호출
    } else {
      setFirstTermsValidation(false);
    }
  }
  

  const deleteUser = () => {
    if (!window.confirm("탈퇴하시겠습니까?")) {
      return;
    }

    axios
      .delete("http://localhost:8088/users/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // 회원탈퇴 성공
        alert("회원탈퇴가 완료되었습니다.");
        localStorage.removeItem("token");
        navigate("/"); // 홈페이지로 리디렉션
      })
      .catch((error) => {
        console.error("회원탈퇴 중 에러 발생:", error);
        alert("회원탈퇴에 실패했습니다.");
      });
  };

  return (
    <Main>
      <Title>
        <h3>회원탈퇴</h3>
      </Title>
      <Content>
        <CheckWrap>
          <Check
            onClick={() => {
              setFirstTerms(!firstTerms);
            }}
          />
          <p>탈퇴 약관 동의</p>
          {firstTermsValidation ? null : (
            <WarningMessage text="회원탈퇴 약관에 동의하세요" />
          )}
        </CheckWrap>
        <Agree>
          <p> 사용하고 계신 아이디({user.userEmail})는탈퇴할 경우 재사용 및 복구가 불가능합니다.
탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</p>
          <p>
          탈퇴 후 회원정보 및 이용기록은 모두 삭제됩니다.
          </p>
        </Agree>
      </Content>

     

      <ButtonWrap>
        <Button text={"탈퇴하기"} onClick={nextButton} />
      </ButtonWrap>
    </Main>
  );
};

export default Withdraw;
