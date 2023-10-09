import styled from "styled-components";
function SmallButton({ text, onClick }) {
  return <SmallButtonStyle onClick={onClick}>{text}</SmallButtonStyle>;
}
const SmallButtonStyle = styled.p`
  background-color: rgb(93, 141, 242);
  color: white;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
`;
export default SmallButton;
