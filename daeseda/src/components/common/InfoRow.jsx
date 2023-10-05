// 내 정보에 사용되는 행 컴포넌트
import styled from "styled-components";
function InfoRow({ label, type, id, value, onChange, onClick, placeholder }) {
  return (
    <Row onClick={onClick}>
      <Label htmlFor={id}>{label}</Label>
      <Value
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  width: 90px;
`;

const Value = styled.input`
  width: 200px;
  border-bottom: 1px solid rgb(232, 234, 237);
  outline: none;
`;

export default InfoRow;
