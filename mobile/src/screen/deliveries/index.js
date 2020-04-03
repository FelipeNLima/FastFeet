import React, { useState } from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TabPending from '~/screen/deliveries/TabPending';
import TabHandeOut from '~/screen/deliveries/TabHandeOut';

import {
  Container,
  Avatar,
  WelcomeText,
  TextName,
  Viewheader,
  Header,
  CardContainer,
  Title,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

const initialLayout = { width: Dimensions.get('window').width };

export default function deliveries() {
  const dispatch = useDispatch();

  const deliveryman = useSelector((state) => state.user.profile);
  // const id = useSelector(state => state.auth.id);
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'Pending', title: 'Pendentes' },
    { key: 'Handedout', title: 'Entregues' },
  ]);

  const renderScene = SceneMap({
    Pending: () => <TabPending />,
    Handedout: () => <TabHandeOut />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#7d40e7' }}
      style={{
        backgroundColor: 'transparent',
        color: '#7d40e7',
        width: '55%',
        height: '6%',
        marginLeft: '47%',
        marginTop: -20,
      }}
      labelStyle={{ color: '#7d40e7', fontWeight: 'bold', fontSize: 12 }}
    />
  );

  return (
    <Container>
      <Header>
      <Avatar
        source={{
          uri:
            `http://192.168.0.110:3333/files/${deliveryman.avatar.path}` ||
            `https://api.adorable.io/avatars/50/${deliveryman.name}.png`,
        }}
      />
        <Viewheader>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <TextName>{deliveryman.name}</TextName>
        </Viewheader>

        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <Icon name="login-variant" color="#E74040" size={30} />
        </TouchableOpacity>
      </Header>

      <CardContainer>
        <Title>Entregas</Title>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </CardContainer>
    </Container>
  );
}
