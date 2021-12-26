const searchReducer = (state = {search: '', location: undefined}, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
}

export default searchReducer;