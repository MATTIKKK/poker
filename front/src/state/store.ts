import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { mainReducer } from './main-reducer';

const rootReducer = combineReducers({
  mainInfo: mainReducer
});

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk)
);

export type RootStateType = ReturnType<typeof rootReducer>