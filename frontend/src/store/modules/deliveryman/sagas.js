import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  showDeliverymanSuccess,
  showDeliverymanFailure,
  updateDeliverymanSuccess,
  updateDeliverymanFailure,
  registerDeliverymanSuccess,
  registerDeliverymanFailure,
} from './actions';

import history from '../../../services/history';

export function* showDeliveryman({ payload }) {
  const { id } = payload;
  try {
    const response = yield call(api.get, `/deliveryman/${id}`);

    yield put(showDeliverymanSuccess(response.data));

    history.push('/deliveryman/edit');
  } catch ({ response }) {
    yield put(showDeliverymanFailure());
    toast.error(response.data.error);
  }
}

export function* updateDeliveryman({ payload }) {
  const { id, name, email, avatar_id } = payload.data;

  try {
    yield call(api.put, `/deliveryman/${id}`, {
      name,
      email,
      avatar_id,
    });

    yield put(updateDeliverymanSuccess());

    toast.success('Delivery man updated successfully!');
    history.push('/deliveryman');
  } catch ({ response }) {
    yield put(updateDeliverymanFailure());
    toast.error(response.data.error);
  }
}

export function* registerDeliveryman({ payload }) {
  const { name, email, avatar_id } = payload.data;

  try {
    yield call(api.post, '/deliveryman', {
      name,
      email,
      avatar_id,
    });

    yield put(registerDeliverymanSuccess());

    toast.success('Delivery man registered successfully!');
    history.push('/deliveryman');
  } catch ({ response }) {
    toast.error(response.data.error);
    yield put(registerDeliverymanFailure());
  }
}

export default all([
  takeLatest('@deliveryman/SHOW_REQUEST', showDeliveryman),
  takeLatest('@deliveryman/UPDATE_REQUEST', updateDeliveryman),
  takeLatest('@deliveryman/REGISTER_REQUEST', registerDeliveryman),
]);
