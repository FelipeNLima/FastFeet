import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: #7d40e7;
  font-weight: bold;
  font-size: 16px;
  margin-left: 10px;
`;

export const Middle = styled.View`
  padding: 15px 0;
`;

export const Footer = styled.View`
  flex-direction: row;
  background: #f8f9fd;
  padding: 20px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const InfoView = styled.View`
  flex-direction: column;
`;

export const Label = styled.Text`
  font-weight: bold;
  font-size: 10px;
  color: #999;
`;

export const TextName = styled.Text`
  font-weight: bold;
`;

export const LinkButton = styled.TouchableOpacity``;

export const LinkText = styled.Text`
  font-size: 14px;
  color: #7d40e7;
  font-weight: bold;
`;

export const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#7d40e7',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#7d40e7',
  stepStrokeUnFinishedColor: '#7d40e7',
  separatorFinishedColor: '#7d40e7',
  separatorUnFinishedColor: '#7d40e7',
  stepIndicatorFinishedColor: '#7d40e7',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999',
  labelSize: 14,
  currentStepLabelColor: '#999',
};
