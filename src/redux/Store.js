import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import favReducer from './Reducer';

const rootReducer = combineReducers({ favReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));