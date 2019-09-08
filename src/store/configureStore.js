import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user';
import alertsReducer from '../reducers/alerts'
import collectionsReducer from '../reducers/collections';
import typesReducer from '../reducers/types';
import ItemsReducer from '../reducers/items.reducer';

const composeEnhancers = window.__REDUX_DEV_TOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      alerts: alertsReducer,
      types: typesReducer,
      collections: collectionsReducer,
      items: ItemsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
