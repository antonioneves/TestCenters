const setTestCentersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEST_CENTERS':
      return action.payload;
    default:
      return state;
  }
};

export default setTestCentersReducer;
