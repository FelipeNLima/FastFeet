import { produce } from 'immer';

const INITIAL_STATE = {
  order: null,
  loading: false,
};

export default function order(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@order/SHOW_SUCCESS': {
        draft.loading = false;
        draft.order = action.payload.order;
        break;
      }
      case '@order/SHOW_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/REGISTER_SUCCESS': {
        draft.loading = false;
        draft.order = null;
        break;
      }
      case '@order/REGISTER_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@order/UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@order/UPDATE_SUCCESS': {
        draft.loading = false;
        draft.order = null;
        break;
      }
      case '@order/FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
