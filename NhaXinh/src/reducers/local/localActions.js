import { API_URL_VN } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FETCH_LOCALS = "FETCH_LOCALS";
export const LOCAL_LOADING = "LOCAL_LOADING";
export const LOCAL_FAILURE = "LOCAL_FAILURE";

export const fetchLocals = (depth) => {
  return async (dispatch) => {
    dispatch({
      type: LOCAL_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL_VN}/?depth=${depth}`, {
          method: "GET",
        })
      );

      if (!response.ok) {
        dispatch({
          type: LOCAL_FAILURE,
        });
        throw new Error("Something went wrong!, can't get the local");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_LOCALS,
        locals: resData,
      });
      return resData;
    } catch (err) {
      throw err;
    }
  };
};
