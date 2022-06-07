export function setPosts(searchdata) {
    return {
    type: "SET_POST",
    payload: searchdata
    }
};

export function setID(uid) {
    return {
    type: "SET_ID",
    payload: uid
    }
};