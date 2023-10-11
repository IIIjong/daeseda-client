import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

function PriceTag() {
  const [clothesDummy, setClothesDummy] = useState([]);
  const [categoryDummy, setCategoryDummy] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8088/clothes/list")
      .then(function (response) {
        setClothesDummy(response.data);
      })
      .catch(function (error) {
        console.error("의류 정보를 불러오는 데에 실패하였습니다", error);
      });

    axios
      .get("http://localhost:8088/category/list")
      .then(function (response) {
        setCategoryDummy(response.data);
      })
      .catch(function (error) {
        console.error("카테고리 정보를 불러오는 데에 실패하였습니다", error);
      });
  }, []);

  return (
    <PriceTagLayout>
      <Title>인기 품목 가격표</Title>
      {categoryDummy.map((category) => (
        <div key={category.categoryId}>
          <CategoryTitle>{category.categoryName}</CategoryTitle>
          {clothesDummy
            .filter((clothes) => clothes.categoryId === category.categoryId)
            .map((clothes) => (
              <PriceRow key={clothes.clothesId}>
                <p>{clothes.clothesName}</p>
                <p>{parseInt(clothes.clothesPrice).toLocaleString()}</p>
              </PriceRow>
            ))}
        </div>
      ))}
      <Message>정확한 가격은 수거 후 책정됩니다</Message>
    </PriceTagLayout>
  );
}

const PriceTagLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 330px;
  padding: 12px;
  box-sizing: border-box;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const CategoryTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 12px 0;
  color: #333;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 4px;
`;

const Message = styled.p`
  color: rgb(93, 141, 242);
  font-weight: 500;
  margin: 4px 0;
`;

export default PriceTag;
