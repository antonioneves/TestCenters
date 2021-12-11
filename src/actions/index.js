const setSearchResults = search => {
  return {
    type: 'SET_SEARCH_RESULTS',
    payload: search,
  };
};

const setFilterValues = details => {
  return {
    type: 'SET_FILTER_DETAILS',
    payload: details,
  };
};

const setTestCenters = details => {
  return {
    type: 'SET_TEST_CENTERS',
    payload: details,
  };
};

export {setSearchResults, setFilterValues, setTestCenters};
