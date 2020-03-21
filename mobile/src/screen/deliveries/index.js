import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container, Avatar, WelcomeText, TextName, Viewheader, Header } from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

export default function deliveries() {
  const dispatch = useDispatch();

  const deliveryman = useSelector(state => state.user.profile);
  // const id = useSelector(state => state.auth.id);

  return (
    <Container>
      <Header>
        <Avatar
          source={{ uri: deliveryman.avatar.url || 'https://api.adorable.io/avatars/40/abott@adorable.png' }}
        />
        <Viewheader>
          <WelcomeText>Bem vindo de volta,</WelcomeText>
          <TextName>{deliveryman.name}</TextName>
        </Viewheader>

        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <Icon name="login-variant" color="#E74040" size={30} />
        </TouchableOpacity>
      </Header>
    </Container>
  );
}
