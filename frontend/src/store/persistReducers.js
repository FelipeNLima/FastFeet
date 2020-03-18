import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducer => {
  const persistedReducer = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth', 'deliveryman', 'order', 'recipient'],
    },
    reducer
  );
  return persistedReducer;
};
