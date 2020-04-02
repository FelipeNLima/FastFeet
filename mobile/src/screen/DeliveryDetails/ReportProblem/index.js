import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';

import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { Container, Color, Content, TextInput, SubmitButton } from './styles';

import api from '~/services/api';

export default function ReportProblem({ route }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const { delivery_id: id } = route.params;

  async function handleReportProblem() {
    try {
      await api.post(`/deliveries/${id}/problems`, {
        description,
      });
      Alert.alert('Problema cadastrado com sucesso!');
      navigation.navigate('Entregas');
    } catch (err) {
      Alert.alert(err.response.data.error);
    }
    setLoading(false);
  }

  return (
    <Container>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Color />
      <Content>
        <TextInput
          name="description"
          placeholder="Inclua aqui o problema que ocorreu na entrega."
          multiline
          style={{
            textAlignVertical: 'top',
          }}
          placeholderTextColor="#ccc"
          autoCorrect={false}
          value={description}
          onChangeText={setDescription}
        />

        <SubmitButton loading={loading} onPress={handleReportProblem}>
          Enviar
        </SubmitButton>
      </Content>
    </Container>
  );
}

ReportProblem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery_id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
