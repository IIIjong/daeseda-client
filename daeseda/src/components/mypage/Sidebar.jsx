import styled from "styled-components";
import { useState } from "react";

const sidebarItems = [
  { id: "info", label: "정보확인/수정" },
  { id: "delivery", label: "배송지 관리" },
  { id: "review", label: "나의 리뷰" },
  { id: "withdrawal", label: "회원탈퇴" }
  
];

function Sidebar({ selectedItemId, setSelectedItemId }) {
  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  return (
    <SidebarWrapper>
      {sidebarItems.map((item) => (
        <List
          key={item.id}
          isSelected={selectedItemId === item.id}
          onClick={() => handleItemClick(item.id)}
        >
          {item.label}
        </List>
      ))}
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const List = styled.li`
  width: 200px;
  padding: 8px 0;
  border-radius: 5px;
  text-align: center;
  background-color: ${(props) =>
    props.isSelected ? "rgb(93,141,242)" : "rgb(232, 234, 237)"};
  color: ${(props) => (props.isSelected ? "white" : "#111111")};
  cursor: pointer;
`;

export default Sidebar;
