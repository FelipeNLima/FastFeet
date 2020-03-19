import React from 'react';

import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import history from '~/services/history';
import RecipientInput from '~/pages/Orders/InputRecipient';
import DeliverymanInput from '~/pages/Orders/InputDeliveryman';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Container, BackButton, Content, Button, View, ViewProdut } from './styles';
import { registerOrderRequest } from '~/store/modules/order/actions';

export default function Edit() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.order.loading);

  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Informe o detinatário'),
    deliveryman_id: Yup.number().required('Informe o entregador'),
    product: Yup.string().required('O produto é obrigatório'),
  });

  function handleSubmit(data) {
    console.log(data);
    console.log(dispatch(registerOrderRequest(data)));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
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

          <ViewProdut>
            <strong>Produto</strong>
            <Input name="product" />
          </ViewProdut>
        </Content>
      </Form>
    </Container>
  );
}
