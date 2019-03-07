import { createStore, combineReducers, applyMiddleware } from 'redux';

import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from './reducers';
import history from './history';

// Redux middlewares
const routingMiddleware = routerMiddleware(history);

const middlewares = [
  routingMiddleware,
  thunkMiddleware,
];

// Loging middleware used only in DEV mode
if (_TARGET_ === 'DEV') {
  const loggerMiddleware = createLogger({ level: 'info' });
  middlewares.push(loggerMiddleware);
}

// Apply middlewares
let appliedMiddlewares = applyMiddleware(...middlewares);

if (_TARGET_ === 'DEV') {
  appliedMiddlewares = composeWithDevTools(appliedMiddlewares);
}

// Create redux store
const store = createStore(
  combineReducers(reducers),
  appliedMiddlewares
);

// Sync history  navigation events with redux store
syncHistoryWithStore(history, store, { selectLocationState: state => state.routing });

export default store;
