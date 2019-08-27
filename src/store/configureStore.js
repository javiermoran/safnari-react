import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';
import alertsReducer from '../reducers/alerts'
import collectionsReducer from '../reducers/collections';

const composeEnhancers = window.__REDUX_DEV_TOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      alerts: alertsReducer,
      collections: collectionsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
