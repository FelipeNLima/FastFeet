import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import {
  showRecipientSuccess,
  showRecipientFailure,
  updateRecipientSuccess,
  updateRecipientFailure,
  registerRecipientSuccess,
  registerRecipientFailure,
} from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* showRecipient({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/recipients/${id}`);

    yield put(showRecipientSuccess(response.data));
    history.push('/recipients/edit');
  } catch ({ response }) {
    toast.error(response.data.error);
    yield put(showRecipientFailure());
  }
}

export function* updateRecipient({ payload }) {
  const {
    id,
    name,
    street,
    number,
    complement,
    city,
    state,
    postalcode,
  } = payload.data;

  try {
    yield call(api.put, `/recipients/${id}`, {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      postalcode,
    });

    yield put(updateRecipientSuccess());
    toast.success('Update recipient successful');
    history.push('/recipients');
  } catch ({ response }) {
    yield put(updateRecipientFailure());
    toast.error(response.data.error);
  }
}

export function* registerRecipient({ payload }) {
  const {
    name,
    street,
    number,
    complement,
    state,
    city,
    postalcode,
  } = payload.data;

  try {
    yield call(api.post, '/recipients', {
      name,
      street,
      number,
      complement,
      state,
      city,
      postalcode,
    });

    yield put(registerRecipientSuccess());

    toast.success('Recipient registered successfully!');
    history.push('/recipients');
  } catch ({ response }) {
    toast.error(response.data.error);
    yield put(registerRecipientFailure());
  }
}

export default all([
  takeLatest('@recipient/SHOW_REQUEST', showRecipient),
  takeLatest('@recipient/UPDATE_REQUEST', updateRecipient),
  takeLatest('@recipient/REGISTER_REQUEST', registerRecipient),
]);
