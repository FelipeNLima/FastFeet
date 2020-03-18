import React from 'react';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import history from '~/services/history';
import { Form, Input } from '@rocketseat/unform';

import { Container, BackButton, Content, Button } from './styles';

import { updateDeliverymanRequest } from '~/store/modules/deliveryman/actions';

import { MdChevronLeft, MdCheck } from 'react-icons/md';
import Avatar from '../Avatar';

export default function Edit() {
  const dispatch = useDispatch();

  const deliveryman = useSelector(state => state.deliveryman.deliveryman);
  const loading = useSelector(state => state.deliveryman.loading);

  const schema = Yup.object().shape({
    avatar_id: Yup.number(),
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
  });

  console.log(deliveryman);

  function handleSubmit({ name, email, avatar_id }) {
    const data = {
      id: deliveryman.id,
      name,
      email,
      avatar_id,
    };

    console.log(data);
    dispatch(updateDeliverymanRequest(data));
  }

  return (
    <Container>
      <Form initialData={deliveryman} schema={schema} onSubmit={handleSubmit}>
        <header>
          <h2>Editar Entregador</h2>

          <div>
            <BackButton
              onClick={() => history.push('/deliveryman')}
              type="button"
            >
              <MdChevronLeft size={28} color="#fff" /> <strong>VOLTAR</strong>
            </BackButton>
            <Button type="submit">
              {loading ? (
                'Salvar'
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
          <Avatar name="avatar_id" />

          <strong>Nome</strong>
          <Input name="name" placeholder="Exemplo Entregador" />

          <strong>E-mail</strong>
          <Input name="email" placeholder="entregador@fastfeet.com.br" />
        </Content>
      </Form>
    </Container>
  );
}
