import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { Alert, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card } from 'react-native-paper';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import api from '~/services/api';

import {
  Container,
  Color,
  Header,
  Title,
  Titleheader,
  Content,
  InfoView,
  Middle,
  Footer,
  Text,
  InfoViewData,
  InfoData,
  TextButton,
} from './styles';

export default function DeliveryDetails({ route }) {
  const navigation = useNavigation();
  const { order_id: IdOrder } = route.params;
  const id = useSelector((state) => state.auth.id);
  const isFocused = useIsFocused();
  const [order, setOrder] = useState({});

  useEffect(() => {
    async function showOrder() {
      const response = await api.get(`/deliveryman/${id}/withdraw/${IdOrder}`);

      const data = {
        ...response.data,
        delivered: !!response.data.end_date,
        startDate: response.data.start_date
          ? format(parseISO(response.data.start_date), 'dd/MM/yyyy', {
            locale: ptBR,
          })
          : '--/--/----',
        endDate: response.data.end_date
          ? format(parseISO(response.data.end_date), 'dd/MM/yyyy', {
            locale: ptBR,
          })
          : '--/--/----',
      };
      setOrder(data);
    }
    if (isFocused) {
      showOrder();
    }
  }, []);

  async function handleDeliveryWithdraw() {
    async function delievryWithdraw() {
      try {
        await api.put(`/deliveryman/${id}/withdraw/${IdOrder}`, {
          start_date: new Date(),
        });

        navigation.navigate('Entregas');
      } catch (err) {
        Alert.alert('Horário de retirda inválida.');
      }
    }

    Alert.alert(
      'Confirmação de retirada',
      'Confirma que deseja realizar a retirada desta encomenda?',
      [
        {
          text: 'Cancelar',
          style: 'destructive',
        },
        {
          text: 'Confirmar',
          onPress: delievryWithdraw,
        },
      ],
      {
        canceled_at: false,
      }
    );
  }
  console.log(order);
  return (
    <Container>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Color />
      <Content>
        <Card style={{ marginLeft: 10, marginRight: 10, elevation: 1 }}>
          <Header>
            <Icon name="truck" size={24} color="#7d40e7" />
            <Title>Informações da entrega</Title>
          </Header>
          <InfoView>
            <Titleheader>DESTINATÁRIO</Titleheader>
            <Text>{order.recipient.name}</Text>
          </InfoView>
          <InfoView>
            <Titleheader>ENDEREÇO DE ENTREGA</Titleheader>
            <Text>
              {order.recipient.street}, {order.recipient.number}
            </Text>
          </InfoView>
          <InfoView>
            <Titleheader>PRODUTO</Titleheader>
            <Text>{order.product}</Text>
          </InfoView>
        </Card>

        <Card
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            elevation: 1,
          }}
        >
          <Middle>
            <Header>
              <Icon name="calendar" size={24} color="#7d40e7" />
              <Title>Situação da entrega</Title>
            </Header>
            <InfoView>
              <Titleheader>STATUS</Titleheader>
              <Text>{order.status}</Text>
            </InfoView>
            <InfoViewData>
              <InfoData>
                <Titleheader>DATA DE RETIRADA</Titleheader>
                <Text>{order.startDate}</Text>
              </InfoData>

              <InfoData>
                <Titleheader>DATA DE ENTREGA</Titleheader>
                <Text>{order.endDate}</Text>
              </InfoData>
            </InfoViewData>
          </Middle>
        </Card>

        <Card
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            elevation: 1,
          }}
        >
          <Footer>
            <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="close-circle-outline" color="#E74040" size={28} />
              <TextButton>Informar problema</TextButton>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="alert-circle-outline" color="#E7BA40" size={28} />
              <TextButton>Visualizar problemas</TextButton>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeliveryWithdraw}
              style={{ alignItems: 'center', flex: 1 }}
            >
              <Icon name="update" color="#32CD32" size={28} />
              <TextButton>Realizar Retirada</TextButton>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
              <Icon name="check-circle-outline" color="#7D40E7" size={28} />
              <TextButton>Confirmar entrega</TextButton>
            </TouchableOpacity>
          </Footer>
        </Card>
      </Content>
    </Container>
  );
}

DeliveryDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      order_id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
