import { ADD_USER_VIEW, GET_VIEWS } from "./types";

export const addUserView = (payload) => {
  return {
    type: ADD_USER_VIEW,
    payload,
  };
};

export const getView = (payload) => {
  return {
    type: GET_VIEWS,
    payload,
  };
};

export const addUserViews = (payload) => {
  return (dispatch) => {
    dispatch(addUserView(payload));
  };
};

export const getViews = () => {
  return (dispatch) => {
    const data = JSON.parse(localStorage.getItem("lastView"));
    console.log(data);
    dispatch(getView(data));
  };
};
