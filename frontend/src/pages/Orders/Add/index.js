import React from 'react';

import * as Yup from 'yup';
import { useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';

import history from '~/services/history';
import RecipientInput from '~/pages/Orders/RecipientInput';
import DeliverymanInput from '~/pages/Orders/DeliverymanInput';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Container, BackButton, Content, Button, View } from './styles';

export default function Add() {
  const loading = useSelector(state => state.order.loading);

  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Informe o detinatário'),
    deliveryman_id: Yup.number().required('Informe o entregador'),
    product: Yup.number().required('O produto é obrigatório'),
  });

  function handleSubmit({ recipient_id, deliveryman_id, product }) {

  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <header>
          <h2>Cadastrar Encomenda</h2>

          <div>
            <BackButton type="button" onClick={() => history.push('/orders')}>
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
          <main>
            <View style={{ marginRight: 10 }}>
              <strong>Destinatário</strong>
              <RecipientInput name="recipient_id" />
            </View>

            <View style={{ marginLeft: 10 }}>
              <strong>Entrgador</strong>
              <DeliverymanInput name="deliveryman_id" />
            </View>
          </main>

          <View>
            <strong>Produto</strong>
            <Input name="product" />
          </View>
        </Content>
      </Form>
    </Container>
  );
}
