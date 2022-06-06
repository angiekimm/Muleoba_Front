export function setPosts(searchdata) {
    return {
    type: "SET_POST",
    payload: searchdata
    }
};

export function setID(data) {
    return {
    type: "SET_ID",
    payload: data
    }
};