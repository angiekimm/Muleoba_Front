const initState = {
  uID: '',
};


export default function idreducer(currentState = initState, action) {

  switch (action.type) {
    case "SET_ID":
      return { ...currentState ,uID: action.payload };
    default:
      return currentState;
  }

/*     if (currentState === undefined) {
      return {
        uID: '2'
      };
    }
    const newState = { ...currentState };
    if (action.type === 'LOGOUT') {
      newState.uID = 'none';
    }
    return newState; */
  }
