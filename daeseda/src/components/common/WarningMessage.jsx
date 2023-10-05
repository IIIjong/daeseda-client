// 사용자에게 경고 메시지를 나타내는 컴포넌트
import styled from "styled-components";
function WarningMessage({ text }) {
  return <Text>{text}</Text>;
}
const Text = styled.p`
  color: rgb(253, 71, 85);
  font-weight: 500;
`;
export default WarningMessage;
