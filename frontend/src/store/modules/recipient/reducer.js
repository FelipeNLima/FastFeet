import { produce } from 'immer';

const INITIAL_STATE = {
  recipient: null,
  loading: false,
};

export default function recipient(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@recipient/SHOW_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@recipient/SHOW_SUCCESS': {
        draft.loading = false;
        draft.recipient = action.payload.recipient;
        break;
      }
      case '@recipient/SHOW_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@recipient/REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@recipient/REGISTER_SUCCESS': {
        draft.loading = false;
        draft.recipient = null;
        break;
      }

      case '@recipient/REGISTER_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@recipient/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@recipient/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.recipient = null;
        break;
      }
      case '@recipient/UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
