import * as Types from "../constant/aTypes";

export const showLoading = (loadingText) => {
  return (dispatch) =>
    dispatch({
      type: Types.SHOW_LOADING,
      payload: loadingText,
    });
};

export const hideLoading = () => {
  return (dispatch) => {
    dispatch({
      type: Types.HIDE_LOADING,
    });
  };
};
