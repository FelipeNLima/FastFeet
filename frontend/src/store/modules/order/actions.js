export function showOrderRequest(id) {
  return {
    type: '@order/SHOW_REQUEST',
    payload: { id },
  };
}

export function showOrderSuccess(data) {
  return {
    type: '@order/SHOW_SUCCESS',
    payload: { data },
  };
}

export function registerOrderRequest(data) {
  return {
    type: '@order/REGISTER_REQUEST',
    payload: { data },
  };
}

export function registerOrderSuccess() {
  return {
    type: '@order/REGISTER_SUCCESS',
  };
}

export function registerOrderFailure() {
  return {
    type: '@order/REGISTER_FAILURE',
  };
}

export function updateOrderRequest(data) {
  return {
    type: '@order/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateOrderSuccess() {
  return {
    type: '@order/UPDATE_SUCCESS',
  };
}

export function orderFailure() {
  return {
    type: '@order/FAILURE',
  };
}
