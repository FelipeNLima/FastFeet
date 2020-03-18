export function showRecipientRequest(id) {
  return {
    type: '@recipient/SHOW_REQUEST',
    payload: { id },
  };
}

export function showRecipientSuccess(recipient) {
  return {
    type: '@recipient/SHOW_SUCCESS',
    payload: { recipient },
  };
}

export function showRecipientFailure() {
  return {
    type: '@recipient/SHOW_FAILURE',
  };
}

export function registerRecipientRequest(data) {
  return {
    type: '@recipient/REGISTER_REQUEST',
    payload: { data },
  };
}

export function registerRecipientSuccess() {
  return {
    type: '@recipient/REGISTER_SUCCESS',
  };
}

export function registerRecipientFailure() {
  return {
    type: '@recipient/REGISTER_FAILURE',
  };
}

export function updateRecipientRequest(data) {
  return {
    type: '@recipient/UPDATE_REQUEST',
    payload: { data },
  };
}

export function updateRecipientSuccess() {
  return {
    type: '@recipient/UPDATE_SUCCESS',
  };
}

export function updateRecipientFailure() {
  return {
    type: '@recipient/UPDATE_FAILURE',
  };
}

