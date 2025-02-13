import {
  FETCH_LOCALS,
  LOCAL_LOADING,
  LOCAL_FAILURE,
} from "./localActions";
import { FIRST_OPEN } from "./checkFirstTimeActions";

const initialState = {
  locals: [],
  isFirstOpen: false,
  isLoading: false,
};
export const localtReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCAL_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOCAL_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_LOCALS:
      return {
        ...state,
        locals: [...action.locals],
        isLoading: false,
      };
    case FIRST_OPEN: {
      return {
        ...state,
        isFirstOpen: true,
      };
    }
    default:
      return state;
  }
};
