import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import history from '~/services/history';
import { Container, BackButton, Content, Button, View } from './styles';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { registerRecipientRequest } from '~/store/modules/recipient/actions';
import InputMask from 'react-input-mask';

export default function Add() {
  const loading = useSelector(state => state.recipient.loading);

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    street: Yup.string().required('A rua é obrigatória'),
    number: Yup.number().required('O número é obrigatório'),
    complement: Yup.string(),
    state: Yup.string().required('O estado é obrigatório'),
    city: Yup.string().required('A cidade é obrigatória'),
    postalcode: Yup.string().required('O CEP é obrigatório'),
  });

  function handleSubmit(data) {
    dispatch(registerRecipientRequest(data));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h2>Cadastrar destinatários</h2>

          <div>
            <BackButton
              onClick={() => history.push('/recipients')}
              type="button"
            >
              <MdChevronLeft size={28} color="#fff" /> <strong>VOLTAR</strong>
            </BackButton>
            <Button type="submit">
              {loading ? (
                'Salvando...'
              ) : (
                  <>
                    <MdCheck size={24} color="#fff" />
                    <strong>SALVAR</strong>
                  </>
                )}
            </Button>
          </div>
        </header>

        <Content>
          <View>
            <strong>Nome</strong>
            <Input name="name" placeholder="Nome desinatário" />
          </View>

          <main>
            <View>
              <strong>Rua</strong>
              <Input name="street" placeholder="Rua" />
            </View>
            <View>
              <strong>Número</strong>
              <Input name="number" placeholder="numero" />
            </View>
            <View>
              <strong>Complemento</strong>
              <Input name="complement" />
            </View>
          </main>

          <main>
            <View>
              <strong>Cidade</strong>
              <Input name="city" placeholder="Cidade" />
            </View>
            <View>
              <strong>Estado</strong>
              <Input name="state" placeholder="Estado" />
            </View>
            <View>
              <strong>CEP</strong>
              <InputMask mask="99999-999" >
                <Input name="postalcode" placeholder="00000-00" />
              </InputMask>
            </View>
          </main>
        </Content>
      </Form>
    </Container>
  );
}

