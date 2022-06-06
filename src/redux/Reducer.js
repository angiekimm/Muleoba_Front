function reducer(currentState, action) {
    if (currentState === undefined) {
      return {
        uID: '1'
      };
    }
    const newState = { ...currentState };
    if (action.type === 'LOGOUT') {
      newState.uID = 'none';
    }
    return newState;
  }

  export default reducer;