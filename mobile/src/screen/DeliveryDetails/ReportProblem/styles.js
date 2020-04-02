import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;

export const Color = styled.View`
  background: #7d40e7;
  height: 155px;
`;

export const Content = styled.View`
  margin-top: -60px;
  padding: 0 20px;
`;

export const TextInput = styled.TextInput`
  height: 70%;
  font-size: 16px;
  border: 1px solid #0000001a;
  background: #FFF;
  border-radius: 4px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  background: #7d40e7;
  margin-top: 20px;
`;
