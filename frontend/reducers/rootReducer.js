import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import sessionReducer from './sessionReducer';
import errorsReducer from './errorsReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  data: dataReducer,
  session: sessionReducer,
  errors: errorsReducer,
  ui: loadingReducer
});
