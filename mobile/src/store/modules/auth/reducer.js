import { produce } from 'immer';

const INITIAL_STATE = {
  id: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SING_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SING_IN_SUCCESS': {
        draft.signed = true;
        draft.id = action.payload.id;
        draft.loading = false;
        break;
      }
      case '@auth/SING_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SING_OUT': {
        draft.signed = false;
        draft.id = null;
        break;
      }
      default:
    }
  });
}
