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
  // 날짜 관련 함수, 요일을 반환하는 함수 선언식으로 정의
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

  //수거 위치 관련 함수
  function deliveryLocationChangeHandler() {
    if (deliveryLocation === "문 앞") {
      setDeliveryLocation("경비실");
    } else if (deliveryLocation === "경비실") {
      setDeliveryLocation("로비");
    } else if (deliveryLocation === "로비") {
      setDeliveryLocation("문 앞");
    }
  }

  //주소 관련 함수
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

  //의류 선택 관련 함수
  const [clothesDummy, setClothesDummy] = useState([]);
  const [firstSelectedCategoryId, setFirstSelectedCategoryId] = useState("");
  const [firstSelectedClothesId, setFirstSelectedClothesId] = useState("");
  const [firstSelectedClothesName, setFirstSelectedClothesName] = useState("");
  const [firstSelectedClothesPrice, setFirstSelectedClothesPrice] =
    useState("");
  const [firstSelectedClothesCount, setFirstSelectedClothesCount] = useState(1);

  const [secondSelectedCategoryId, setSecondSelectedCategoryId] = useState("");
  const [secondSelectedClothesId, setSecondSelectedClothesId] = useState("");
  const [secondSelectedClothesName, setSecondSelectedClothesName] =
    useState("");
  const [secondSelectedClothesPrice, setSecondSelectedClothesPrice] =
    useState("");
  const [secondSelectedClothesCount, setSecondSelectedClothesCount] =
    useState(1);

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

  const firstClothesChangeHandler = (e) => {
    const selectedClothesItem = clothesDummy.find(
      (clothes) => clothes.clothesId == e.target.value
    );

    if (selectedClothesItem) {
      setFirstSelectedCategoryId(selectedClothesItem.categoryId);
      setFirstSelectedClothesId(selectedClothesItem.clothesId);
      setFirstSelectedClothesName(selectedClothesItem.clothesName);
      setFirstSelectedClothesPrice(selectedClothesItem.clothesPrice);
    }
  };

  function firstCountPlusHandler() {
    if (!(firstSelectedClothesCount == 9))
      setFirstSelectedClothesCount(firstSelectedClothesCount + 1);
  }

  function firstCountMinusHandler() {
    if (!(firstSelectedClothesCount == 1))
      setFirstSelectedClothesCount(firstSelectedClothesCount - 1);
  }

  //
  const secondClothesChangeHandler = (e) => {
    const selectedClothesItem = clothesDummy.find(
      (clothes) => clothes.clothesId == e.target.value
    );

    if (selectedClothesItem) {
      setSecondSelectedCategoryId(selectedClothesItem.categoryId);
      setSecondSelectedClothesId(selectedClothesItem.clothesId);
      setSecondSelectedClothesName(selectedClothesItem.clothesName);
      setSecondSelectedClothesPrice(selectedClothesItem.clothesPrice);
    }
  };

  function secondCountPlusHandler() {
    if (!(secondSelectedClothesCount == 9))
      setSecondSelectedClothesCount(secondSelectedClothesCount + 1);
  }

  function secondCountMinusHandler() {
    if (!(secondSelectedClothesCount == 1))
      setSecondSelectedClothesCount(secondSelectedClothesCount - 1);
  }

  //몇일 후의 날짜를 리턴하는 함수, 아무 값도 넣지 않으면 오늘 날짜를 리턴
  function addDaysToDate(inputDate, days) {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  function orderHandler() {
    if (!firstTerms) setFirstTermsWarningMessage(true);
    else setFirstTermsWarningMessage(false);
    if (!secondTerms) setSecondTermsWarningMessage(true);
    else setSecondTermsWarningMessage(false);

    if (firstTerms && secondTerms) {
      axios
        .post(
          "http://localhost:8088/orders/request",
          {
            address: {
              addressId: addressId,
              addressName: addressName,
              addressDetail: addressDetail,
              addressZipcode: addressZipcode,
            },
            clothesCount: [
              {
                clothes: {
                  clothesId: firstSelectedClothesId,
                  clothesName: firstSelectedClothesName,
                  categoryId: firstSelectedCategoryId,
                },
                count: firstSelectedClothesCount,
              },
              {
                clothes: {
                  clothesId: secondSelectedClothesId,
                  clothesName: secondSelectedClothesName,
                  categoryId: secondSelectedCategoryId,
                },
                count: secondSelectedClothesCount,
              },
            ],
            totalPrice:
              firstSelectedClothesPrice * firstSelectedClothesCount +
              secondSelectedClothesPrice * secondSelectedClothesCount,
            washingMethod:
              normalLaundry && specialLaundry
                ? "일반세탁, 특수세탁"
                : normalLaundry
                ? "일반세탁"
                : specialLaundry
                ? "특수세탁"
                : null,
            pickupDate: addDaysToDate(new Date(date), 0),
            deliveryDate: addDaysToDate(new Date(date), 3),
            deliveryLocation: deliveryLocation,
          },
          { headers }
        )
        .then(function (response) {
          alert("주문 성공");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <OrderLayout>
      <Title>주문내용</Title>
      <Row>
        <RowRight>
          <Select name="" id="" onChange={firstClothesChangeHandler}>
            <option value="">세탁할 의류를 선택하세요</option>
            {clothesDummy.map((clothes) => (
              <option key={clothes.clothesId} value={clothes.clothesId}>
                {clothes.clothesName}
              </option>
            ))}
          </Select>
          {firstSelectedClothesPrice === "" ? null : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Count>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={firstCountMinusHandler}
                  style={{
                    backgroundColor: "rgb(232,234,237)",
                    padding: "4px",
                  }}
                />
                <CountText>{firstSelectedClothesCount}</CountText>
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={firstCountPlusHandler}
                  style={{
                    backgroundColor: "rgb(232,234,237)",
                    padding: "4px",
                  }}
                />
              </Count>

              <ClothesPrice>
                {(
                  parseInt(firstSelectedClothesPrice) *
                  firstSelectedClothesCount
                ).toLocaleString()}
                원
              </ClothesPrice>
            </div>
          )}
        </RowRight>
        {firstSelectedClothesPrice === "" ? null : (
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: "25px" }} />
        )}
      </Row>

      <Row>
        <RowRight>
          <Select name="" id="" onChange={secondClothesChangeHandler}>
            <option value="">세탁할 의류를 선택하세요</option>
            {clothesDummy.map((clothes) => (
              <option key={clothes.clothesId} value={clothes.clothesId}>
                {clothes.clothesName}
              </option>
            ))}
          </Select>
          {secondSelectedClothesPrice === "" ? null : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Count>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={secondCountMinusHandler}
                  style={{
                    backgroundColor: "rgb(232,234,237)",
                    padding: "4px",
                  }}
                />
                <CountText>{secondSelectedClothesCount}</CountText>
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={secondCountPlusHandler}
                  style={{
                    backgroundColor: "rgb(232,234,237)",
                    padding: "4px",
                  }}
                />
              </Count>

              <ClothesPrice>
                {(
                  parseInt(secondSelectedClothesPrice) *
                  secondSelectedClothesCount
                ).toLocaleString()}
                원
              </ClothesPrice>
            </div>
          )}
        </RowRight>
        {secondSelectedClothesPrice === "" ? null : (
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: "25px" }} />
        )}
      </Row>
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
