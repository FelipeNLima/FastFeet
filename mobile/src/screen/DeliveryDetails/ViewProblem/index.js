import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  Color,
  Content,
  Title,
  List,
  Problem,
  DateText,
  Card,
} from './styles';

export default function ViewProblem({ route }) {
  const [problems, setProblems] = useState([]);

  const { delivery_id: id, product } = route.params;

  async function loadingProblems() {
    const response = await api.get(`/problems/${id}`);

    const data = response.data.map((problem) => ({
      ...problem,
      date: format(parseISO(problem.created_at), 'dd/MM/yyyy', {
        locale: ptBR,
      }),
    }));

    setProblems(data);
  }

  useEffect(() => {
    loadingProblems();
  }, [id]);

  console.log(problems);

  return (
    <Container>
      <StatusBar backgroundColor="#7d40e7" barStyle="light-content" />
      <Color />
      <Content>
        <Title>{product}</Title>
        <List
          data={problems}
          keyExtractor={(problem) => problem.id}
          renderItem={({ item }) => (
            <Card>
              <Problem>{item.description}</Problem>
              <DateText>{item.date}</DateText>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
}

ViewProblem.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      delivery_id: PropTypes.number.isRequired,
      product: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
