import searchReducer from './search';
import filterReducer from './filter';
import setTestCentersReducer from './setTestCenters';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  searchResults: searchReducer,
  filterValues: filterReducer,
  testCenters: setTestCentersReducer
});

export default rootReducer;