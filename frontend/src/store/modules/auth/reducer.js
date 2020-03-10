import produce from 'immer';

const INITIAL_STATE = {
  signed: false,
  token: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.loading = false;
        draft.signed = true;
        draft.token = action.payload.token;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
