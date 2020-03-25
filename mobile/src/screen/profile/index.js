import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Avatar, Title, TextName, LogoutButton } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  console.log(profile.avatar.url);
  const dispatch = useDispatch();
  return (
    <Container>
      <Avatar
        source={{
          uri: profile.avatar
            ? profile.avatar.url
            : `https://api.adorable.io/avatars/50/${profile.name}.png`
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