import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import { Form } from '@unform/mobile';

import { Container, Logo, SButton } from './styles';

import Input from '~/components/Input';

import logo from '~/assets/mobile-logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

export default function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ id }) {
    dispatch(signInRequest(id));
  }

  return (
    <>
      <Container>
        <Logo source={logo} />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="id" keyboardType="number-pad" type="email" />

          <SButton
            loading={loading}
            onPress={() => formRef.current.submitForm()}
          >
            Entrar no sistema
          </SButton>
        </Form>
      </Container>

    </>
  );
}