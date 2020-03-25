import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StepIndicator from 'react-native-step-indicator';

import { useIsFocused } from '@react-navigation/native';
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

const TabHandeOut = () => {
  const id = useSelector(state => state.auth.id);
  const [delivered, setDelivered] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadDeliveries() {
      try {
        setLoading(true);
        const response = await api.get(`'/deliveryman/${id}/deliveries'`);

        const data = response.data.map(delivered => ({
          ...delivered,
          date: format(parseISO(delivered.end_date), 'dd/MM/yyyy', { locale: ptBR }),
          currentPosition: 3,
        }));
        setLoading(false);
        setDelivered(data);
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
      {delivered.length <= 0 ? (
        <Empty>
          <ImageEmpty source={image} />
          <EmptyText>Não há encomendas para listar</EmptyText>
        </Empty>
      ) : (
          <Container>
            {delivered.map(delivered => (
              <Card
                style={{
                  width: '100%',
                  height: '38%',
                  borderColor: '#F5F5F5',
                  borderWidth: 2,
                  borderRadius: 4,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Header>
                  <Icon name="truck" size={24} color="#7d40e7" />
                  <Title>Encomenda: {delivered.product}</Title>
                </Header>
                <Middle>
                  <StepIndicator
                    stepCount={3}
                    customStyles={customStyles}
                    currentPosition={delivered.currentPosition}
                    labels={['Aguardando Retirada', 'Retirada', 'Entregue']}
                  />
                </Middle>
                <Footer>
                  <InfoView>
                    <Label>Data</Label>
                    <TextName>{delivered.date}</TextName>
                  </InfoView>

                  <InfoView>
                    <Label>Cidade</Label>
                    <TextName>{delivered.recipient.city}</TextName>
                  </InfoView>

                  <InfoView>
                    <LinkButton onPress={() => handleShowOrder()}>
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

export default TabHandeOut;
