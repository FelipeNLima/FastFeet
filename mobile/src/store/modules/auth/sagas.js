import { Alert } from 'react-native';

import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* singIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliveryman/${id}`);

    const data = {
      ...response.data,
      registeredDate: format(parseISO(response.data.created_at), 'dd/MM/yyyy', {
        locale: ptBR,
      }),
    };

    yield put(signInSuccess(data.id, data));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);