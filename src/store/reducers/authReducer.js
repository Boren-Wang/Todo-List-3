import * as actionCreators from '../actions/actionCreators'

// REDUCERS ARE CALLED WHEN AN ACTION IS DISPATCHED,
// THEIR JOB IS TO ADVANCE THE STATE. THEY WILL UPDATE
// AND RETURN THE NEW, UPDATED STATE

const initState = {
  authError: null 
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionCreators.LOGIN_ERROR:
      return {
        ...state,
        authError: action.error.message,
      };
    case actionCreators.LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case actionCreators.LOGOUT_SUCCESS:
      return state;
    case actionCreators.REGISTER_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case actionCreators.REGISTER_ERROR:
      return {
        ...state,
        authError: action.error.message,
      };
    default:
      return state;
  }
};

export default authReducer;