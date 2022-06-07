

export default function idreducer(currentState, action) {
    if (currentState === undefined) {
      return {
        uID: '2'
      };
    }
    const newState = { ...currentState };
    if (action.type === 'LOGOUT') {
      newState.uID = 'none';
    }
    return newState;
  }
