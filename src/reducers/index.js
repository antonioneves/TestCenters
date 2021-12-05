import searchReducer from './search';
import filterReducer from './filter';

import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  searchResults: searchReducer,
  filterValues: filterReducer,
});

export default rootReducer;