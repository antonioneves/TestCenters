const setFilteredTestCentersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILTERED_TEST_CENTERS':
      return action.payload;
    default:
      return state;
  }
};

export default setFilteredTestCentersReducer;
