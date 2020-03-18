export function showDeliverymanRequest(id) {
  return {
    type: '@deliveryman/SHOW_REQUEST',
    payload: { id },
  };
}

export function showDeliverymanSuccess(deliveryman) {
  return {
    type: '@deliveryman/SHOW_SUCCESS',
    payload: { deliveryman },
  };
}

export function showDeliverymanFailure() {
  return {
    type: '@deliveryman/SHOW_FAILURE',
  };
}

export function registerDeliverymanRequest(data) {
  return {
    type: '@deliveryman/REGISTER_REQUEST',
    payload: { data },
  };
}

export function registerDeliverymanSuccess() {
  return {
    type: '@deliveryman/REGISTER_SUCCESS',
  };
}

export function registerDeliverymanFailure() {
  return {
    type: '@deliveryman/REGISTER_FAILURE',
  };
}

export function updateDeliverymanRequest(data) {
  return {
    type: '@deliveryman/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateDeliverymanSuccess() {
  return {
    type: '@deliveryman/UPDATE_SUCCESS',
  };
}

export function updateDeliverymanFailure() {
  return {
    type: '@deliveryman/UPDATE_FAILURE',
  };
}
