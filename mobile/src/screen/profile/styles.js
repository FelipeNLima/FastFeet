import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 20px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  height: 135px;
  width: 135px;
  border-radius: 68px;
  background: #eee;
  align-self: center;
  margin-bottom: 40px;
  border: 2px solid #eee;
`;

export const Title = styled.Text`
  color: #999;
  font-size: 14px;
  margin-bottom: 3px;
`;

export const TextName = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  background: #e74040;
  margin-top: 20px;
`;