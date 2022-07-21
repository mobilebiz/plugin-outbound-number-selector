import { combineReducers } from 'redux';

import { reduce as DefaultNumberReducer } from './DefaultNumberState';

export const namespace = 'outbound-number-selector';

export default combineReducers({
  DefaultNumber: DefaultNumberReducer,
});
