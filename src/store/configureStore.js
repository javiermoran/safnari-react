import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user';
import alertsReducer from '../reducers/alerts'

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      alerts: alertsReducer
    })
  );

  return store;
}
