import { ADD_USER_VIEW, GET_VIEWS } from "./types";

const initialState = {
  lastViews: [],
};

export const rootReducer = (state = initialState.lastViews, action) => {
  switch (action.type) {
    case ADD_USER_VIEW:
      // console.log(action.payload);
      // console.log(state);
      if (state == null) {
        return [...state, action.payload];
      }
      let addedItem = state.find((c) => c.id === action.payload.id);
      // console.log(addedItem);
      if (addedItem) {
        return state;
      } else {
        const newState = [action.payload, ...state].slice(0, 5);

        localStorage.setItem("lastView", JSON.stringify(newState));
        console.log(newState);
        return newState;
      }
    case GET_VIEWS:
      return action.payload;

    default: {
      return state;
    }
  }
};
