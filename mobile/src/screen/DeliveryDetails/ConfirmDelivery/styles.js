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

export const Card = styled.View`
  flex-direction: column;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  height: 80%;
`;

export const Picture = styled.TouchableOpacity`
  background: rgba(0, 0, 0, 0.3);
  align-self: center;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  background: #7d40e7;
  margin-top: 20px;
`;
