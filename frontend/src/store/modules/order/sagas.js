import { all, takeLatest, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  showOrderSuccess,
  updateOrderSuccess,
  orderFailure,
  registerOrderSuccess,
  registerOrderFailure,
} from './actions';

export function* showOrder({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.get, `/orders/${id}`);

    const data = {
      id: response.data.id,
      recipient: {
        value: response.data.recipient_id,
        label: response.data.recipient.name,
      },
      deliveryman: {
        value: response.data.deliveryman_id,
        label: response.data.deliveryman.name,
      },
      product: response.data.product,
    };

    yield put(showOrderSuccess(data));

    history.push('/orders/edit');
  } catch ({ response }) {
    yield put(orderFailure());

    toast.error(response.data.error);
  }
}

export function* updateOrder({ payload }) {
  const { id, recipient_id, deliveryman_id, product } = payload.data;

  try {
    yield call(api.put, `/orders/${id}`, {
      id,
      recipient_id,
      deliveryman_id,
      product,
    });

    yield put(updateOrderSuccess());
    toast.success('Update order successful');
    history.push('/orders');
  } catch ({ response }) {
    yield put(orderFailure());
    toast.error(response.data.error);
  }
}

export function* registerOrder({ payload }) {
  const { recipient_id, deliveryman_id, product } = payload.data;

  try {
    yield call(api.post, '/orders', {
      recipient_id,
      deliveryman_id,
      product,
    });

    yield put(registerOrderSuccess());

    toast.success('Order created successful!');
    history.push('/orders');
  } catch ({ response }) {
    toast.error(response.data.error);
    yield put(registerOrderFailure());
  }
}

export default all([
  takeLatest('@order/SHOW_REQUEST', showOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
  takeLatest('@order/REGISTER_REQUEST', registerOrder),
]);
