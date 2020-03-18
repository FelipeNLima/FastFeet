import { produce } from 'immer';

const INITIAL_STATE = {
  deliveryman: null,
  loading: false,
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryman/SHOW_SUCCESS': {
        draft.loading = false;
        draft.deliveryman = action.payload.deliveryman;
        break;
      }
      case '@deliveryman/SHOW_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@deliveryman/REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@deliveryman/REGISTER_SUCCESS': {
        draft.loading = false;
        draft.deliveryman = null;
        break;
      }

      case '@deliveryman/REGISTER_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@deliveryman/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@deliveryman/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.deliveryman = null;
        break;
      }
      case '@deliveryman/UPDATE_FAILURE': {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
