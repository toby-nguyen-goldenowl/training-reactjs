import * as types from '../constants/ActionTypes';
const initialState = {
  userId: undefined,
  loading: true,
};

const userReducer = (state = initialState, action) => {
  const { user } = action;
  switch (action.type) {
    case types.AUTH_USERID:
      return {
        userId: user,
        loading: false,
      };
    default:
      return state;
  }
};
export default userReducer;
