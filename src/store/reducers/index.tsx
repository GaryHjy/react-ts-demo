import { combineReducers, ReducersMapObject, Reducer, AnyAction } from 'redux';
import { connectRouter } from 'connected-react-router';
import home from './home';
import mine from './mine';
import profile from './profile';
import history from '../history';

let reducers: ReducersMapObject = {
  home,
  mine,
  profile,
  router: connectRouter(history)
}

export type TypeRootState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>
}

let reducer: Reducer<TypeRootState, AnyAction> = combineReducers<TypeRootState>(reducers);

export default reducer;