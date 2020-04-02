import styled from 'styled-components/native';

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

export const Title = styled.Text`
  text-align: center;
  align-self: center;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingVertical: 13,
  },
})``;

export const Problem = styled.Text`
  font-size: 18px;
  color: #999;
  flex: 1;
  margin-right: 10px;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #c1c1c1;
`;

export const Card = styled.View`
  padding: 20px 15px;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 15px;
`;
