import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from 'react-native-step-indicator';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import image from '~/assets/vazio.png';

import api from '~/services/api';

import {
  Container,
  Header,
  Title,
  Middle,
  Footer,
  InfoView,
  Label,
  TextName,
  LinkButton,
  LinkText,
  Empty,
  ImageEmpty,
  EmptyText,
  customStyles,
} from './styles';

const TabPending = () => {
  const id = useSelector((state) => state.auth.id);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadDeliveries() {
      try {
        setLoading(true);
        const response = await api.get(`/deliveryman/${id}/withdraw`);

        const data = response.data.map((order) => ({
          ...order,
          date: format(parseISO(order.created_at), 'dd/MM/yyyy', {
            locale: ptBR,
          }),
          currentPosition: order.status === 'PENDENTE' ? 1 : 2,
        }));
        setLoading(false);
        setPendingOrders(data);
      } catch ({ response }) {
        setLoading(false);
      }
    }
    if (isFocused) {
      loadDeliveries();
    }
  }, [id, isFocused]);

  return (
    <ScrollView style={{ flex: 1 }}>
      {pendingOrders.length <= 0 ? (
        <Empty>
          <ImageEmpty source={image} />
          <EmptyText>Não há encomendas pendentes para listar</EmptyText>
        </Empty>
      ) : (
          <Container>
            {pendingOrders.map((order) => (
              <Card
                style={{
                  width: '100%',
                  height: '42%',
                  borderColor: '#F5F5F5',
                  borderWidth: 2,
                  borderRadius: 4,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Header>
                  <Icon name="truck" size={24} color="#7d40e7" />
                  <Title>Encomenda: {order.product}</Title>
                </Header>
                <Middle>
                  <StepIndicator
                    stepCount={3}
                    customStyles={customStyles}
                    currentPosition={order.currentPosition}
                    labels={['Aguardando Retirada', 'Retirada', 'Entregue']}
                  />
                </Middle>
                <Footer>
                  <InfoView>
                    <Label>Data</Label>
                    <TextName>{order.date}</TextName>
                  </InfoView>

                  <InfoView>
                    <Label>Cidade</Label>
                    <TextName>{order.recipient.city}</TextName>
                  </InfoView>

                  <InfoView>
                    <LinkButton
                      onPress={() =>
                        navigation.navigate('Detalhes', { order_id: order.id })
                      }
                    >
                      <LinkText>Ver detalhes</LinkText>
                    </LinkButton>
                  </InfoView>
                </Footer>
              </Card>
            ))}
          </Container>
        )}
    </ScrollView>
  );
};

export default TabPending;
