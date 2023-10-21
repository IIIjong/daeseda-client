// 사용자에게 경고 메시지를 나타내는 컴포넌트
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function WarningMessage({ text }) {
  return (
    <Row>
      <FontAwesomeIcon icon={faTriangleExclamation} />
      <p>{text}</p>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: red;
`;
export default WarningMessage;
