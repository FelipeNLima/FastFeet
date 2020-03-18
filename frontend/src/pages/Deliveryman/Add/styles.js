import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 34px auto;
  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }
  header {
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: space-between;
    h2 {
      font-size: 24px;
      color: #444444;
    }
    div {
      display: flex;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  background: #fff;
  border-radius: 4px;
  flex-direction: column;
  padding: 30px;
  margin-top: 20px;
  strong {
    margin-top: 15px;
    font-size: 14px;
    color: #444444;
  }
  input {
    border: 1px solid #dddddd;
    padding: 0 15px;
    height: 45px;
    border-radius: 4px;
    color: #666;
    margin: 7px 0;
    &::placeholder {
      color: #999;
    }
  }
`;

export const BackButton = styled.button`
  background: #cccccc;
  margin-right: 10px;
  display: flex;
  padding: 0 15px;
  width: 112px;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 0;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
  strong {
    font-size: 14px;
  }
  svg {
    margin-right: 5px;
  }
`;

export const Input = styled.input`
  border: 1px solid #dddddd;
  padding: 0 15px;
  height: 45px;
  border-radius: 4px;
  color: #666;
  margin: 7px 0;
  &::placeholder {
    color: #999;
  }
`;

export const Button = styled.button`
  display: flex;
  padding: 0 15px;
  background: #7d40e7;
  width: 112px;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 0;
  font-weight: bold;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
  strong {
    font-size: 14px;
  }
  svg {
    margin-right: 5px;
  }
`;
