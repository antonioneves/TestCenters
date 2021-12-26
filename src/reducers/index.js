import searchReducer from './search';
import filterReducer from './filter';
import setTestCentersReducer from './setTestCenters';
import setFilteredTestCentersReducer from './setFilteredTestCenters';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  searchResults: searchReducer,
  filterValues: filterReducer,
  testCenters: setTestCentersReducer,
  filteredTestCenters: setFilteredTestCentersReducer,
});

export default rootReducer;