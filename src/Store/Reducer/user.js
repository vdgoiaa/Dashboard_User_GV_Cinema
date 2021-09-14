import actionType from "../Actions/type";

const initialState = {
  userList: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USER_LIST:
      state.userList = action.payload;
      return { ...state };
    default:
      return state;
  }
};
export default reducer;
