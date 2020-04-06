import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Avatar, Title, TextName, LogoutButton } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  return (
    <Container>
      <Avatar
        source={{
          uri:
            `http://192.168.0.110:3333/files/${profile.avatar.path}` ||
            `https://api.adorable.io/avatars/50/${profile.name}.png`,
        }}
      />
      <Title>Nome completo</Title>
      <TextName>{profile.name}</TextName>

      <Title>Email</Title>
      <TextName>{profile.email}</TextName>

      <Title>Data de cadastro</Title>
      <TextName>{profile.registeredDate}</TextName>

      <LogoutButton onPress={() => dispatch(signOut())}>Logout</LogoutButton>
    </Container>
  );
}
