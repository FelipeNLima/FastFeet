import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

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

export const Empty = styled.View`
  margin-top: 100px; 
  align-items: center;
  justify-content: center;
`;

export const ImageEmpty = styled.Image`
  height: 100px;
  width: 100px;
`;

export const EmptyText = styled.Text`
  font-size: 24px;
  text-align: center;
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