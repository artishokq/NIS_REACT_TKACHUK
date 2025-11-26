import styled from "styled-components";

export const ActionButton = styled.button`
  padding: 8px 16px;
  margin: 4px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #5568d3;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ResetButton = styled(ActionButton)`
  background: #dc2626;

  &:hover:not(:disabled) {
    background: #b91c1c;
  }
`;
