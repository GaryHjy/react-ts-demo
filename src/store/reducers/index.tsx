import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home';
import history from '../history';

let reducers = {
  home,
  router: connectRouter(history)
}

let reducer = combineReducers(reducers);

export type TypeRootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

export default reducer;