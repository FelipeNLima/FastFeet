import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Cards from '~/components/Card';

import image from '~/assets/vazio.png';

import api from '~/services/api';

import { Container, Empty, ImageEmpty, EmptyText } from './styles';

const TabPending = () => {
  const id = useSelector((state) => state.auth.id);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  async function loadDeliveries() {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await api.get(`/deliveryman/${id}/withdraw`, {
      params: { page },
    });

    const data = response.data.map((order) => ({
      ...order,
      date: format(parseISO(order.created_at), 'dd/MM/yyyy', {
        locale: ptBR,
      }),
      currentPosition: order.status === 'PENDENTE' ? 1 : 2,
    }));

    setPendingOrders([...pendingOrders, ...data]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadDeliveries();
    }
  }, [id, isFocused]);

  return (
    <Container>
      {pendingOrders.length <= 0 ? (
        <Empty>
          <ImageEmpty source={image} />
          <EmptyText>Não há encomendas pendentes para listar</EmptyText>
        </Empty>
      ) : (
        <FlatList
          data={pendingOrders}
          style={{ marginTop: 10 }}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadDeliveries}
          onEndReachedThreshold={0.2}
          renderItem={({ item }) => <Cards order={item} />}
        />
      )}
    </Container>
  );
};

export default TabPending;
