import { createStore, combineReducers } from "redux";
import serviceListReducer from '../reducers/serviceList';
import serviceFormReducer from '../reducers/serviceForm';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceForm: serviceFormReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
