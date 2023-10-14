// 세탁 신청서 작성 컴포넌트
import styled from "styled-components";
import Check from "../common/Check";
import truck from "../../assets/images/truck.png";
import bill from "../../assets/images/bill.png";
import change from "../../assets/images/change.png";
import Button from "../common/Button";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import WarningMessage from "../common/WarningMessage";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Order() {
  // Request에서 보낸 데이터를 state 초기값으로 저장
  const location = useLocation();
  const [normalLaundry, setNormalLaundry] = useState(
    location.state.normalLaundry
  );
  const [specialLaundry, setSpecialLaundry] = useState(
    location.state.specialLaundry
  );
  const [date, setDate] = useState(location.state.date);
  const [password, setPassword] = useState("");
  const [firstTerms, setFirstTerms] = useState(false);
  const [secondTerms, setSecondTerms] = useState(false);
  const [firstTermsWarningMessage, setFirstTermsWarningMessage] =
    useState(false);
  const [secondTermsWarningMessage, setSecondTermsWarningMessage] =
    useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("문 앞");
  // 요일을 반환하는 함수 선언식으로 정의
  function getDayOfWeek(date) {
    const daysOfWeek = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    return daysOfWeek[date.getDay()];
  }

  function formattedDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = getDayOfWeek(date);

    return `${year}년 ${month < 10 ? `0${month}` : month}월 ${
      day < 10 ? `0${day}` : day
    }일 ${dayOfWeek}`;
  }

  function deliveryLocationChangeHandler() {
    if (deliveryLocation === "문 앞") {
      setDeliveryLocation("경비실");
    } else if (deliveryLocation === "경비실") {
      setDeliveryLocation("로비");
    } else if (deliveryLocation === "로비") {
      setDeliveryLocation("문 앞");
    }
  }

  const [clothesDummy, setClothesDummy] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState("");
  const [selectedClothesPrice, setSelectedClothesPrice] = useState("");
  const [count, setCount] = useState(1);
  const [selectCount, setSelectCount] = useState(1);
  useEffect(() => {
    axios
      .get("http://localhost:8088/clothes/list")
      .then(function (response) {
        setClothesDummy(response.data);
      })
      .catch(function (error) {
        console.error("의류 정보를 불러오는 데에 실패하였습니다", error);
      });
  }, []);

  const handleClothesSelect = (e) => {
    const selectedClothesName = e.target.value;
    const selectedClothesItem = clothesDummy.find(
      (clothes) => clothes.clothesName == selectedClothesName
    );

    if (selectedClothesItem) {
      setSelectedClothes(selectedClothesName);
      setSelectedClothesPrice(selectedClothesItem.clothesPrice);
    }
  };

  function countPlusHandler() {
    if (!(count === 9)) {
      setCount(count + 1);
    }
  }

  function countMinusHandler() {
    if (!(count === 1)) {
      setCount(count - 1);
    }
  }

  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [addressName, setAddressName] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [addressZipcode, setAddressZipcode] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8088/users/address/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAddresses(response.data); // 주소 목록 데이터 설정
          setAddressId(response.data[0].addressId); // 첫 번째 주소를 선택 (선택된 주소의 ID를 설정)
          const selectedAddress = response.data.find(
            (address) => address.addressId == response.data[0].addressId
          );

          if (selectedAddress) {
            // 선택한 주소 정보를 설정
            setAddressName(selectedAddress.addressName);
            setAddressDetail(selectedAddress.addressDetail);
            setAddressZipcode(selectedAddress.addressZipcode);
          }
        })
        .catch((error) => {
          console.error("주소 목록을 가져오는 중 에러 발생:", error);
        });
    }
  }, []);

  function orderHandler() {
    if (!firstTerms) setFirstTermsWarningMessage(true);
    else setFirstTermsWarningMessage(false);
    if (!secondTerms) setSecondTermsWarningMessage(true);
    else setSecondTermsWarningMessage(false);

    if (firstTerms && secondTerms) {
      axios
        .post("http://localhost:8088/orders/request", {
          address: {
            addressId: addressId,
            addressName: addressName,
            addressDetail: addressDetail,
            addressZipcode: addressZipcode,
          },
          clothesCount: [
            {
              clothes: {
                clothesId: 1,
                clothesName: "흰색바지",
                categoryId: 1,
              },
              count: 5,
            },
          ],
          totalPrice: 10000,
          washingMethod: "DELICATE",
          pickupDate: "2023-10-10",
          deliveryDate: "2023-10-15",
          deliveryLocation: "123 Main St",
        })
        .then(function (response) {
          alert(response);
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }

  function addressChangeHandler(e) {
    const selectedAddressId = e.target.value;
    setAddressId(selectedAddressId);

    const selectedAddress = addresses.find(
      (address) => address.addressId == selectedAddressId
    );
    if (selectedAddress) {
      setAddressName(selectedAddress.addressName);
      setAddressDetail(selectedAddress.addressDetail);
      setAddressZipcode(selectedAddress.addressZipcode);
    }
  }

  return (
    <OrderLayout>
      <Title>주문내용</Title>
      {Array(selectCount)
        .fill()
        .map((_, index) => (
          <Row key={index}>
            <RowRight>
              <Select name="" id="" onChange={handleClothesSelect}>
                <option value="">세탁할 의류를 선택하세요</option>
                {clothesDummy.map((clothes) => (
                  <option key={clothes.clothesId} value={clothes.clothesName}>
                    {clothes.clothesName}
                  </option>
                ))}
              </Select>
              {selectedClothesPrice === "" ? null : (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Count>
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={countMinusHandler}
                      style={{
                        backgroundColor: "rgb(232,234,237)",
                        padding: "4px",
                      }}
                    />
                    <CountText>{count}</CountText>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={countPlusHandler}
                      style={{
                        backgroundColor: "rgb(232,234,237)",
                        padding: "4px",
                      }}
                    />
                  </Count>

                  <ClothesPrice>
                    {(parseInt(selectedClothesPrice) * count).toLocaleString()}
                    원
                  </ClothesPrice>
                </div>
              )}
            </RowRight>
            {selectedClothesPrice === "" ? null : (
              <FontAwesomeIcon
                icon={faTrash}
                style={{ fontSize: "25px" }}
                onClick={() => {
                  if (!(selectCount === 1)) setSelectCount(selectCount - 1);
                }}
              />
            )}
          </Row>
        ))}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0",
        }}
      >
        <FontAwesomeIcon
          icon={faPlus}
          style={{
            backgroundColor: "rgb(232,234,237)",
            padding: "8px",
            fontSize: "18px",
          }}
          onClick={() => {
            setSelectCount(selectCount + 1);
          }}
        />
      </div>
      <div style={{ margin: "5px 0" }}></div>
      <Row>
        <p>세탁서비스</p>
        {normalLaundry && specialLaundry ? (
          <p>일반세탁, 특수세탁</p>
        ) : normalLaundry ? (
          <p>일반세탁</p>
        ) : specialLaundry ? (
          <p>특수세탁</p>
        ) : null}
      </Row>
      <RequestMessage type="text" placeholder="요청사항 입력하기" />
      <Title>수거/배송정보</Title>
      <Row>
        <p>수거시간</p>
        <RowRight>
          <p>
            <p>{formattedDate(date)}</p>
          </p>
          <Change src={change} />
        </RowRight>
      </Row>

      <Row>
        <p>배송주소</p>
        <select
          name=""
          id=""
          style={{ fontSize: "16px" }}
          onChange={addressChangeHandler}
        >
          {addresses.map((address) => (
            <option key={address.addressId} value={address.addressId}>
              ({address.addressZipcode}) {address.addressDetail}
            </option>
          ))}
        </select>
      </Row>

      <Row style={{ borderBottom: "1px solid #111111", paddingBottom: "20px" }}>
        <p>수거/배송위치</p>
        <RowRight>
          <p>{deliveryLocation}</p>
          <Change src={change} onClick={deliveryLocationChangeHandler} />
        </RowRight>
      </Row>
      <Title>이용안내</Title>
      <Guide>
        <GuideImg src={truck} alt="" />
        <p>9/11(월) 오후 11시까지 세탁물을 문 앞에 위치시켜주세요</p>
        <Check
          onClick={() => {
            setFirstTerms(!firstTerms);
          }}
        />
        {firstTermsWarningMessage ? (
          <WarningMessage text="이용안내 사항을 확인하고 동의하세요" />
        ) : null}
      </Guide>
      <Guide style={{ marginBottom: "20px" }}>
        <GuideImg src={bill} alt="" />
        <p>
          세탁비는 수거 후 인수증에서 요금을 확인하신 후 7일 이내 결제해주세요
        </p>
        <Check
          onClick={() => {
            setSecondTerms(!secondTerms);
          }}
        />
        {secondTermsWarningMessage ? (
          <WarningMessage text="이용안내 사항을 확인하고 동의하세요" />
        ) : null}
      </Guide>
      <Button text="세탁 신청하기" onClick={orderHandler} />
    </OrderLayout>
  );
}

const OrderLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 48px;
  gap: 8px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RowRight = styled.div`
  display: flex;
  gap: 10px;
`;

const Change = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const RequestMessage = styled.input`
  padding: 12px 0;
  font-size: 14px;
  border-bottom: 1px solid #d9d9d9;
  outline: none;
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GuideImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Select = styled.select`
  font-size: 16px;
`;

const ClothesPrice = styled.p`
  text-align: right;
`;

const Count = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CountText = styled.p`
  margin: 0 4px;
`;
export default Order;
