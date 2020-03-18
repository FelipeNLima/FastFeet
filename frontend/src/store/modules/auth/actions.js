export function SignInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function SignInSuccess(user, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user, token },
  };
}

export function singOut() {
  return {
    type: '@auth/SING_OUT',
  };
}

export function SignInFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
