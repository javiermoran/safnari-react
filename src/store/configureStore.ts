import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/user.reducer';
import alertsReducer from '../reducers/alerts.reducer'
import collectionsReducer from '../reducers/collections.reducer';
import typesReducer from '../reducers/types.reducer';
import ItemsReducer from '../reducers/items.reducer';
import LoadingReducer from '../reducers/loading.reducer';

//@ts-ignore no definition for window
const composeEnhancers = window.__REDUX_DEV_TOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      alerts: alertsReducer,
      collections: collectionsReducer,
      items: ItemsReducer,
      types: typesReducer,
      user: userReducer,
      loading: LoadingReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
