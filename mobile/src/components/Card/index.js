import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from 'react-native-step-indicator';
import api from '~/services/api';

import {
  Header,
  Title,
  Middle,
  Footer,
  InfoView,
  Label,
  TextName,
  LinkButton,
  LinkText,
  customStyles,
} from './styles';

export default function Cards({ order }) {
  const navigation = useNavigation();

  return (
    <Card
      style={{
        borderColor: '#F5F5F5',
        borderWidth: 2,
        borderRadius: 4,
        marginTop: 20,
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
            onPress={() => navigation.navigate('Detalhes', { delivery: order })}
          >
            <LinkText>Ver detalhes</LinkText>
          </LinkButton>
        </InfoView>
      </Footer>
    </Card>
  );
}

Cards.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
    currentPosition: PropTypes.number,
  }).isRequired,
};
