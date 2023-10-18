import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InfoRow from "../common/InfoRow";
import Button from "../common/Button";
import SmallButton from "../common/SmallButton";
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
  margin-top: 10px;
  padding: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;
const Wrap = styled.div`
  display: flex;
  gap: 4px;
`;

const EditDeliveryAddress = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [addressName, setAddressName] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const { addressId } = useParams(); // URL에서 주소 ID를 가져옴
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // 토큰

 
  useEffect(() => {
    if (addressId) {
      axios
        .get(`${serverUrl}/users/address/${addressId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const addressData = response.data;
          setAddressName(addressData.addressName);
          setAddressZipcode(addressData.addressZipcode);
          setAddressDetail(addressData.addressDetail);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("주소 정보를 가져오는 중 에러 발생:", error);
        });
    }
  }, [addressId, token]);

  const searchAddress = () => {
    new window.daum.Postcode({
        oncomplete: function (data) {
          setAddressZipcode(data.zonecode); // 우편번호 설정
          setAddressName(data.address); // 주소 설정
        },
      }).open();
  };

  const editAddressHandler = () => {
    const updatedAddressInfo = {
      addressName,
      addressZipcode,
      addressDetail,
    };

    const headers = {
      Authorization: `Bearer ${token}`, 
    };

    axios
      .put(`${serverUrl}/users/address/update/${addressId}`, updatedAddressInfo, {
        headers,
      })
      .then((response) => {
        // 성공적으로 주소를 수정한 경우
        console.log("주소 수정 성공:", response.data);
        navigate("/mypage/");
      })
      .catch((error) => {
        // 주소 수정 중 에러 발생한 경우
        console.error("주소 수정 실패:", error);
      });
  };

  return (
    <Main>
      <Title>
        <h3>주소 수정</h3>
      </Title>
      <Content>
        <InfoRow
          label="주소 이름"
          type="text"
          id="addressName"
          value={addressName}
          onChange={(e) => setAddressName(e.target.value)}
        />
        <Wrap>
          <InfoRow
            label="우편번호"
            type="text"
            id="addressZipcode"
            value={addressZipcode}
            onChange={(e) => setAddressZipcode(e.target.value)}
          />
          <SmallButton text="주소 찾기" onClick={searchAddress}/>
        </Wrap>
        <InfoRow
          label="상세 주소"
          type="text"
          id="addressDetail"
          value={addressDetail}
          onChange={(e) => setAddressDetail(e.target.value)}
        />
      </Content>
      <ButtonWrap>
        <Button text="수정완료" onClick={editAddressHandler} />
      </ButtonWrap>
    </Main>
  );
};

export default EditDeliveryAddress;
