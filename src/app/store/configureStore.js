import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { verifyAuth } from '../../features/auth/authActions';

const configureStore = () => {
  const _store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  _store.dispatch(verifyAuth());

  return _store;
};

export const store = configureStore();
