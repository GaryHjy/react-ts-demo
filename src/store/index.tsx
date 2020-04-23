import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import history from './history';
import { routerMiddleware } from 'connected-react-router';

let store = createStore(reducers, applyMiddleware(routerMiddleware(history), promise, thunk, logger));
export default store;