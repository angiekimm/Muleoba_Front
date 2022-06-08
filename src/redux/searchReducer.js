const initState = {
  searchData: [],
};

export default function searchReducer(state = initState, action){

  switch (action.type) {
    case "SET_POST":
      return { ...state, searchData: action.payload };
    default:
      return initState;
  }
};
