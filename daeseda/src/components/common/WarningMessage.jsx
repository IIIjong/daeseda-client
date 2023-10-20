// 사용자에게 경고 메시지를 나타내는 컴포넌트
import styled from "styled-components";
function WarningMessage({ text }) {
  return <Text>{text}</Text>;
}
const Text = styled.p`
  /* background-color: rgb(253, 71, 85); */
  background-color: white;
color:rgb(253, 71, 85);
padding:4px 8px;
  font-weight: 500;
`;
export default WarningMessage;
