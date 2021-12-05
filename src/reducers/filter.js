const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FILTER_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

export default filterReducer;
