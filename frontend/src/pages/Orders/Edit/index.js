import React from 'react';

import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/web';

import history from '~/services/history';
import RecipientInput from '~/pages/Orders/InputRecipient';
import DeliverymanInput from '~/pages/Orders/InputDeliveryman';
import { MdChevronLeft, MdCheck } from 'react-icons/md';

import { Container, BackButton, Content, Button, View, ViewProdut } from './styles';
import { updateOrderRequest } from '~/store/modules/order/actions';
import Input from '~/components/Input';

export default function Edit() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.order);
  const loading = useSelector(state => state.order.loading);

  const schema = Yup.object().shape({
    recipient_id: Yup.number().required('Informe o detinatário'),
    deliveryman_id: Yup.number().required('Informe o entregador'),
    product: Yup.string().required('O produto é obrigatório'),
  });

  function handleSubmit({
    id,
    recipient_id,
    deliveryman_id,
    product, }) {
    const data = {
      id: orders.id,
      recipient_id,
      deliveryman_id,
      product
    };
    console.log(data);
    dispatch(updateOrderRequest(data));
  }

  return (
    <Container>
      <Form initialData={orders} schema={schema} onSubmit={handleSubmit}>
        <header>
          <h2>Editar Encomenda</h2>

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
