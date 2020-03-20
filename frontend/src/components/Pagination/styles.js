import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 5px;
  border-radius: 20px;
  border: 0;
  margin: 10px;
  background: #7d40e7;
  color: #fff;
  :hover {
    opacity: 0.9;
  }
  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Page = styled.text`
  margin-top: 15px;
  font-size: 20px;
`;
